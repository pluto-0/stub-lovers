'use client';
import { useState } from 'react';

import Table from './Table';
import FiltersForm from './filters';
import Pages from './Pages'
import styles from '../styles/home.module.css';

export default function ClientWrapper({ initialData }) {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return <div className={styles.page}>
    <FiltersForm updateFunction={setData} setPage={setPage}/>
    <div className={styles.rightSection}>
      <Pages page={page} setPage={setPage} totalPages={totalPages - 1} className={styles.paginationButtons}/>
      <Table player_data={data} data_index={page * itemsPerPage}/>
    </div>
    </div>;
}