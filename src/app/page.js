export const dynamic = 'force-dynamic';

import ClientWrapper from './components/ClientWrapper';
import Header from './components/Header'
import Pages from './components/Pages'
import { getAllShowPlayers } from './db/statements';
import Link from 'next/link'
import { Metadata } from 'next';
import styles from './styles/home.module.css';

export const metadata = {
  title: "Stub Lovers",
  description: "Make stubs MLB The Show 25"
};

export default async function Home() {
  const initialData = await getAllShowPlayers();
  const cur_page = "players";
  return <div>
    <Header cur_page={cur_page}/>
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