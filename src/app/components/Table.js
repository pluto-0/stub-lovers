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
    return <table className={styles.table}>
        <tr className={styles.headerRow}>
            {cols.map(col => <th className={styles.headerCell} key={col}>{col}</th>)}
        </tr>
        {rows}
    </table>;
}

function Row({player_obj}) {
    const row_cols = [];
    let base_link_url = "mlb25.theshow.com/items/";
    for (const [keyValue, number] of Object.entries(player_obj)) {
        row_cols.push(<td className={styles.cell}key={player_obj['id'] + keyValue}>{number}</td>);
    }
    // Don't want uuid in table, but need it to generate link, so we just pop it off the array of data
    row_cols.pop();
    return <tr className={styles.row}>
        {row_cols}
        <td className={styles.cell} key={player_obj['id'] + 'link'}>
            <a href={`https://${base_link_url}${player_obj['uuid']}`} target='_blank'>link</a>
        </td>
    </tr>
}

