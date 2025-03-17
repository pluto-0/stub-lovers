'use client';
 
import { useState } from 'react';
import { useTransition } from 'react';
import { updateData } from '../actions/data-actions';
import styles from '../styles/filters.module.css';

export default function FiltersForm({ updateFunction }) {
    const [isPending, startTransition] = useTransition();
    const [collapsed, setCollapsed] = useState(true);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        startTransition(async () => {
            const result = await updateData(formData);
            if (result.success) {
                updateFunction(result.data);
            }
        });
    }
    return <div className={styles.formWrapperContainer}>
            <div className={styles.formWrapper}>
                <form onSubmit={ handleSubmit }>
                    <RarityFilter />
                    <BuyPriceFilter />
                    <SellPriceFilter />
                    <ProfitFilter />
                    <LiveSeriesFilter />
                    <SortingFilter />
                    <input type="submit" value="Apply"></input>
                </form>
            </div>
        </div>;
}

function RarityFilter() {
    return <div className={styles.filter}>
        <h2>Rarity</h2>
        <label className={styles.rarityLabel} htmlFor='Diamond'>Diamond </label>
        <input className={styles.rarityInput} type="checkbox" name='Diamond'></input><br></br>
        <label className={styles.rarityLabel} htmlFor='Gold'>Gold </label>
        <input className={styles.rarityInput} type="checkbox" name='Gold'></input><br></br>
        <label className={styles.rarityLabel} htmlFor='Silver'>Silver </label>
        <input className={styles.rarityInput} type="checkbox" name='Silver'></input><br></br>
        <label className={styles.rarityLabel} htmlFor='Bronze'>Bronze </label>
        <input className={styles.rarityInput} type="checkbox" name='Bronze'></input><br></br>
        <label className={styles.rarityLabel} htmlFor='Common'>Common </label>
        <input className={styles.rarityInput} type="checkbox" name='Common'></input><br></br>
    </div>
}

function SellPriceFilter() {
    return <div>
        <h3>Sell Now Price</h3>
        <label htmlFor='SellMin'>min</label>
        <input type='number' name='SellMin'></input><br></br>
        <label htmlFor='SellMax'>max</label>
        <input type='number' name='SellMax'></input>
    </div>;
}

function BuyPriceFilter() {
    return <div>
        <h3>Buy Now Price</h3>
        <label htmlFor='BuyMin'>min</label>
        <input type='number' name='BuyMin'></input><br></br>
        <label htmlFor='BuyMax'>max</label>
        <input type='number' name='BuyMax'></input>
    </div>
}

function ProfitFilter() {
    return <div>
        <h3>Profit</h3>
        <label htmlFor='ProfitMin'>min</label>
        <input type='number' name='ProfitMin'></input><br></br>
        <label htmlFor='ProfitMax'>max</label>
        <input type='number' name='ProfitMax'></input>
    </div>
}

function LiveSeriesFilter() {
    return <div>
        <h3>Live series only</h3>
        <input type='checkbox' name='LiveSeriesOnly'></input>
    </div>
}

function SortingFilter() {
    return <div>
        <h3>Sort by</h3>
        <select name='SortBy'>
            <option value=''></option>
            <option value='buy now'>buy now</option>
            <option value='sell now'>sell now</option>
            <option value='profit'>profit</option>
        </select>
        <select name='Order'>
            <option value=''></option>
            <option value='DESC'>descending</option>
            <option value='ASC'>ascending</option>
        </select>
    </div>
}