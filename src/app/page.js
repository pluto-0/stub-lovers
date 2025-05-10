export const dynamic = 'force-dynamic';

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

/*
on registered domain page route 53:

    ns-1817.awsdns-35.co.uk
    ns-1297.awsdns-34.org
    ns-115.awsdns-14.com
    ns-958.awsdns-55.net
*/