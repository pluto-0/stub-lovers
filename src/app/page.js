/*
TO DO

make profit a column in ShowPlayers, update database, and ordery by profit descending on initial load
add rest of filters and sorting options
*/

import ClientWrapper from './components/ClientWrapper';
import { getAllShowPlayers } from './db/statements';
import styles from './styles/home.module.css';

function Header() {
  return <h1>Market Flips</h1>;
}

export default async function Home() {
  const initialData = await getAllShowPlayers();
  return <div>
    <Header />
    <ClientWrapper initialData={initialData} />
  </div>;
}
