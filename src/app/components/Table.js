import styles from '../styles/table.module.css'

export default function Table({player_data}) {
    const rows = [];
    for (const [index, entry] of player_data.entries()) {
        rows.push(<Row key={index} player_obj={entry}/>);
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

