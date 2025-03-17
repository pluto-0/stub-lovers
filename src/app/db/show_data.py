import requests
import time
import sqlite3
import pandas as pd
from pprint import pprint

def calculate_profit(buy_now, sell_now):
    return int(((buy_now - 1) *.9) - (sell_now + 1))

def get_players():
    entries = []
    outer_fields = ['listing_name', 'best_sell_price', 'best_buy_price']
    desired_fields = ['ovr', 'is_live_set', 'uuid', 'trend', 'display_position', 'rarity']
    url = 'https://mlb24.theshow.com/apis/listings.json?type=mlb_card'
    response = requests.get(url)
    entry_count = 1
    for i in range(1, response.json()['total_pages'] + 1):
        print('parsing page ', i, ' out of ', response.json()['total_pages'])
        response = requests.get(url + '&page=' + str(i))
        if response.status_code != 200:
            print("Error fetching items data from MLB The Show API, exiting program")
            exit(-1)
        data = response.json()['listings']
        for item in data:
            entry = [entry_count]
            for field in outer_fields:
                entry.append(item[field])
            for field in desired_fields:
                entry.append(item['item'][field])
            entry.append(calculate_profit(item['best_buy_price'], item['best_sell_price']))
            entries.append(tuple(entry))
            entry_count += 1
    return entries

def make_players_table(conn, cur):
    desired_fields = ['name', 'buy_now', 'sell_now', 'ovr', 'is_live_set', 'uuid', 'trend', 'position', 'rarity']
    types = {'name': 'TEXT', 'ovr': 'INT', 'is_live_set': 'INT',
             'uuid': 'TEXT', 'trend': 'TEXT', 'position': 'TEXT', 'rarity': 'TEXT', 
             'buy_now': 'INT', 'sell_now': 'INT'
    }
    query = """CREATE TABLE IF NOT EXISTS ShowPlayers(id INT PRIMARY KEY, """
    for i, field in enumerate(desired_fields):
        if i != len(desired_fields) - 1:
            query += f'{field} {types[field]}, '
        else:
            query += f'{field} {types[field]});'
    cur.execute(query)
    conn.commit()

def fill_players_table(conn, cur, data):
    query = "INSERT OR REPLACE INTO ShowPlayers VALUES(" + "?, " * (len(data[0]) - 1) + "?);"
    cur.executemany(query, data)
    conn.commit()

if __name__ == '__main__':
    while (True):
        DELAY = 10
        time.sleep(DELAY)
        print('fetching data from database')
        conn = sqlite3.connect('./MLB.db')
        cur = conn.cursor()
        make_players_table(conn, cur)
        fill_players_table(conn, cur, get_players())
        print('database operation successful, waiting ',  DELAY,  ' seconds')
'''
example response:

'''