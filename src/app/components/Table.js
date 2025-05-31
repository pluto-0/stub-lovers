import styles from '../styles/table.module.css'
import icon from '../icon.ico'
import Pages from './Pages';

const ROWS_PER_PAGE = 10;

export default function Table({player_data, data_index}) {
    const rows = [];
    for (let i = data_index; i < player_data.length && rows.length < ROWS_PER_PAGE; ++i) {
        rows.push(<Row key={i} player_obj={player_data[i]}/>)
    }
    return <table className={styles.table}>
        <tr className={styles.headerRow}>
            {Object.keys(player_data[0]).map(col => <th className={styles.headerCell} key={col}>{col}</th>)}
        </tr>
        {rows}
    </table>;
}

function Row({player_obj}) {
    const row_cols = [];
    for (const [keyValue, number] of Object.entries(player_obj)) {
        row_cols.push(<td className={styles.cell}key={player_obj['id'] + keyValue}>{number}</td>);
    }
    return <tr className={styles.row}>
        {row_cols}
    </tr>
}

