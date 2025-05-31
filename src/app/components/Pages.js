import styles from '../styles/pagination.module.css';

export default function Pages({ page, setPage, totalPages }) {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <button
        onClick={() => setPage(1)}
        disabled={page === 1}
        className={styles.button}
      >
        1
      </button>

      <button 
        onClick={() => setPage(p => Math.max(1, p - 1))} 
        disabled={page === 1}
        className={styles.button}
      >
        -
      </button>
      
      <button
        disabled={page === page}
        className={styles.button}
      >
        {page}
      </button>
      <button 
        onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
        disabled={page === totalPages}
        className={styles.button}
      >
        +
      </button>
      <button
        onClick={() => setPage(p => totalPages)}
        disabled={page === totalPages}
        className={styles.button}
      >
        {totalPages}
      </button>
    </div>
  );
}