import requests
import sqlite3

def get_quicksell_price_live(ovr, rarity):
    if rarity == 'Common':
        return 5
    elif rarity == 'Bronze':
        return 25
    elif rarity == 'Silver':
        return 50 + (ovr - 75) * 25
    elif rarity == 'Gold':
        if ovr == 80:
            return 400
        return 600 + (ovr - 81) * 300
    elif rarity == 'Diamond':
        if ovr < 88:
            return 3000 + (ovr - 85) * 750
        if ovr < 90:
            return 5500 + (ovr - 88) * 1500
        if ovr == 90:
            return 80000
        if ovr < 92:
            return 9000
        return 10000

def get_quicksell_price_nonlive(ovr, rarity):
    if rarity == 'Common':
        return 2
    if rarity == 'Bronze':
        return 12
    if rarity == 'Silver':
        if ovr == 75:
            return 25
        if ovr == 76:
            return 37
        if ovr == 77:
            return 50 
        if ovr == 78:
            return 62
        if ovr == 79:
            return 75
    if rarity == 'Gold':
        if ovr == 80:
            return 200
        return 300 + (ovr - 81) * 150
    if rarity == 'Diamond':
        if ovr < 88:
            return 1500 + (ovr - 85) * 375
        elif ovr < 90:
            return 2750 + (ovr - 88) * 750
        elif ovr == 90:
            return 4000
        elif ovr < 92:
            return 4500
        return 5000

def calculate_profit(buy_now, sell_now, ovr, rarity, is_live_set):
    if sell_now == 0:
        quicksell = get_quicksell_price_live(ovr, rarity) if is_live_set else get_quicksell_price_nonlive(ovr, rarity) 
        return int(((buy_now - 1) *.9) - (quicksell + 1))
    return int(((buy_now - 1) *.9) - (sell_now + 1))


def get_players():

    entries = []

    outer_fields = ['listing_name', 'best_sell_price', 'best_buy_price']

    desired_fields = ['ovr', 'is_live_set', 'uuid', 'trend', 'display_position', 'rarity']

    url = 'https://mlb25.theshow.com/apis/listings.json?type=mlb_card'

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

            entry.append(calculate_profit(item['best_sell_price'], item['best_buy_price'], item['item']['ovr'], item['item']['rarity'], item['item']['is_live_set']))

            entries.append(tuple(entry))

            entry_count += 1

    return entries



def make_players_table(conn, cur):

    desired_fields = ['name', 'buy_now', 'sell_now', 'ovr', 'is_live_set', 'uuid', 'trend', 'position', 'rarity', 'profit']

    types = {'name': 'TEXT', 'ovr': 'INT', 'is_live_set': 'INT',

             'uuid': 'TEXT', 'trend': 'TEXT', 'position': 'TEXT', 'rarity': 'TEXT', 

             'buy_now': 'INT', 'sell_now': 'INT', 'profit': 'INT'

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
        print('fetching data from database')
        conn = sqlite3.connect('./MLB.db')
        cur = conn.cursor()
        make_players_table(conn, cur)
        fill_players_table(conn, cur, get_players())
        print('database operation successful, waiting ')

'''

example response:



'''
