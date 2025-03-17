const db = require('better-sqlite3')('./src/app/db/MLB.db');

export async function getAllShowPlayers() {
    const sql = 'SELECT name, buy_now, sell_now, ovr, rarity, profit FROM ShowPlayers ORDER BY profit DESC';
    const rows = db.prepare(sql).all();
    return rows;
}

// base query has 1=1 to avoid logic of adding where if and only if a filter is active
// This way all the filters can simply add an AND ____ if they are active
export async function getPlayersFiltered(formData) {
    const base = 'SELECT name, buy_now, sell_now, ovr, rarity, profit FROM ShowPlayers WHERE 1=1';
    const rarityQuery = applyRarityFilters(base, formData);
    const sellQuery = applySellPriceFilter(rarityQuery, formData)
    const buyQuery = applyBuyPriceFilter(sellQuery, formData);
    const profitQuery = applyProfitFilter(buyQuery, formData);
    const liveQuery = applyLiveSeriesFilter(profitQuery, formData);
    const finalQuery = applySortingFilter(liveQuery, formData);
    const rows = db.prepare(finalQuery).all();
    return rows;
}

function applyRarityFilters(query, formData) {
    let statement = query + ' AND (rarity='
    const rarities = ['Diamond', 'Gold', 'Silver', 'Bronze', 'Common'];
    for (let rarity of rarities) {
        if (formData.has(rarity)) {
            statement += "'" + rarity + "' OR rarity=";
        }
    }

    if (statement === ' rarity=') {
        return '';
    }
    return statement.slice(0, -11) + ')';
}

function applySellPriceFilter(query, formData) {
    let statement = query;
    if (formData.get('SellMin') !== '') {
        statement += ' sell_now >= ' + formData.get('SellMin');
    }
    if (formData.get('SellMax') !== '') {
        statement += ' AND sell_now <= ' + formData.get('SellMax');
    }
    return statement;
}

function applyBuyPriceFilter(query, formData) {
    let statement = query;
    if (formData.get('BuyMin') !== '') {
        statement += ' AND buy_now >= ' + formData.get('BuyMin');
    }
    if (formData.get('BuyMax') !== '') {
        statement += ' AND buy_now <= ' + formData.get('BuyMax');
    }
    return statement;
}

function applyProfitFilter(query, formData) {
    let statement = query;
    if (formData.get('ProfitMin') !== '') {
        statement += ' AND profit >= ' + formData.get('ProfitMin');
    }
    if (formData.get('ProfitMax') !== '') {
        statement += ' AND profit <= ' + formData.get('ProfitMax');
    }
    return statement;
}

function applyLiveSeriesFilter(query, formData) {
    let statement = query;
    if (formData.get('LiveSeriesOnly')) {
        statement += ' AND is_live_set = 1';
    }
    return statement;
}

function applySortingFilter(query, formData) {
    let statement = query;
    if (formData.get('SortBy') != '') {
        statement += ' ORDER BY ' + formData.get('SortBy');
        if (formData.get('Order') != '') {
            statement += ' ' + formData.get('Order');
        }
    }
    return statement;
}