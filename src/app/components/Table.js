import styles from '../styles/table.module.css'
import icon from '../icon.ico'
import Pages from './Pages';

const ROWS_PER_PAGE = 10;

export default function Table({player_data, page, setPage}) {
    const rows = [];
    let index;
    for (let i = 0; i < ROWS_PER_PAGE && i < player_data.length; ++i) {
        index = i + (ROWS_PER_PAGE * (page - 1));
        rows.push(<Row key={index} player_obj={player_data[index]}/>)
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

