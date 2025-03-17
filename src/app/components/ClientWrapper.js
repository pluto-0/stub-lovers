'use client';
import { useState } from 'react';

import Table from './Table';
import FiltersForm from './filters';
import styles from '../styles/home.module.css';

export default function ClientWrapper({ initialData }) {
  const [data, setData] = useState(initialData);
  return <div className={styles.page}>
    <FiltersForm updateFunction={setData} />
    <Table player_data={data} />
  </div>;
}