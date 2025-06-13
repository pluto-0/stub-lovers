import styles from '../styles/table.module.css'
import Link from 'next/link'
import icon from '../icon.ico'

const ROWS_PER_PAGE = 10;

export default function Table({player_data, data_index}) {
    const rows = [];
    const cols = ['name', 'buy_now', 'sell_now', 'ovr', 'rarity', 'profit']
    for (let i = data_index; i < player_data.length && rows.length < ROWS_PER_PAGE; ++i) {
        rows.push(<Row key={i} player_obj={player_data[i]}/>)
    }
    return <div className={styles.container}>
        <div className={styles.scrollableArea}>
            <table className={styles.table}>
                <tr className={styles.headerRow}>
                    {cols.map(col => <th className={styles.headerCell} key={col}>{col}</th>)}
                </tr>
                {rows}
            </table>
            </div>
        </div>;
}

function Row({player_obj}) {
    let base_link_url = "mlb25.theshow.com/items/";
    return <tr className={styles.row}>
        <td className={styles.cell} key={player_obj['id'] + 'Name'}>{player_obj['name']}</td>
        <td className={styles.cell} key={player_obj['id'] + 'BuyNow'}>{player_obj['buy_now']}</td>
        <SellNowValue price={player_obj['sell_now']} player_obj={player_obj} />
        <td className={styles.cell} key={player_obj['id'] + 'Ovr'}>{player_obj['ovr']}</td>
        <td className={styles.cell} key={player_obj['id'] + 'Rarity'}>{player_obj['rarity']}</td>
        <Profit player_obj={player_obj}>
            <span className={styles.tooltip}>
                profit = [(buy now - 1) * .9] - (sell now + 1)
                This is the exact number of stubs you will make if you submit a buy order and sell order 1 stub better than current prices.
                If there are no active buy orders (sell_now = 0), the profit is calculated using the quicksell price, and it will always be negative.
            </span>
        </Profit>
        <td className={styles.cell} key={player_obj['id'] + 'link'}>
            <a href={`https://${base_link_url}${player_obj['uuid']}`} target='_blank'>link</a>
        </td>
    </tr>
}

function SellNowValue({price, player_obj}) {
    if (price === 0) {
        if (player_obj['is_live_set'])
            return <td className={styles.cell} style={{color: 'red'}} key={player_obj['id'] + 'sellNow'}>0 ({get_quicksell_price_live(player_obj)} quicksell)</td>
        return <td className={styles.cell} style={{color: 'red'}} key={player_obj['id'] + 'sellNow'}>0 ({get_quicksell_price_nonlive(player_obj)} quicksell)</td>
    }
    return <td className={styles.cell} key={player_obj['id']  + 'sellNow'}>{price}</td>
}

function get_quicksell_price_live(player_obj) {
    switch(player_obj['rarity']) {
        case 'Common':
            return 5;
        case 'Bronze':
            return 25;
        case 'Silver':
            return 50 + ((player_obj['ovr'] - 75) * 25);
        case 'Gold':
            if (player_obj['ovr'] === 80) return 400;
            return 600 + ((player_obj['ovr'] - 81) * 300);
        case 'Diamond':
            if (player_obj['ovr'] < 88)
                return 3000 + ((player_obj['ovr'] - 85) * 750);
            if (player_obj['ovr'] < 90)
                return 5500 + ((player_obj['ovr'] - 88) * 1500);
            if (player_obj['ovr'] === 90)
                return 80000
            if (player_obj['ovr'] < 92)
                return 9000;
            return 10000;
    }
}

function get_quicksell_price_nonlive(player_obj) {
    switch(player_obj['rarity']) {
        case 'Common':
            return 2;
        case 'Bronze':
            return 12;
        case 'Silver':
            switch(player_obj['ovr']) {
                case 75:
                    return 25;
                case 76:
                    return 37;
                case 77:
                    return 50; 
                case 78:
                    return 62;
                case 79:
                    return 75;
            }
        case 'Gold':
            if (player_obj['ovr'] === 80) return 200;
            return 300 + ((player_obj['ovr'] - 81) * 150);
        case 'Diamond':
            if (player_obj['ovr'] < 88)
                return 1500 + ((player_obj['ovr'] - 85) * 375);
            if (player_obj['ovr'] < 90)
                return 2750 + ((player_obj['ovr'] - 88) * 750);
            if (player_obj['ovr'] === 90)
                return 4000;
            if (player_obj['ovr'] < 92)
                return 4500;
            return 5000;
    }
}

function Profit({player_obj}) {
    if (player_obj['sell_now'] > 0)
        return <td className={styles.cell} key={player_obj['id'] + 'Profit'}>{player_obj['profit']}</td>;
    if (player_obj['is_live_set']) 
        return <td className={styles.cell} key={player_obj['id'] + 'Profit'}>{Number.parseInt(((player_obj['buy_now'] - 1) * .9) - get_quicksell_price_live(player_obj))}</td>;
    return <td className={styles.cell} key={player_obj['id'] + 'Profit'}>{Number.parseInt(((player_obj['buy_now'] - 1) * .9) - get_quicksell_price_nonlive(player_obj))}</td>;
}