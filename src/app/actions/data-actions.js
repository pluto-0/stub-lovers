'use server';

import { getPlayersFiltered } from '../db/statements';

export async function updateData(formData) {
    try {
        const result = await getPlayersFiltered(formData);
        return {success: true, data: result};
    } catch (error) {
        console.error('database query unsuccesful');
        console.log(error.message);
        return {success: false, error: error.message};
    }
}