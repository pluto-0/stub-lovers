import { getPlayersFiltered } from "../../db/statements.js";

function generateCombinations(arr) {
    let result = [];
    
    function backtrack(start, current) {
        // Add the current combination to the result
        result.push([...current]);
        
        // Generate combinations by adding each subsequent element
        for (let i = start; i < arr.length; i++) {
            current.push(arr[i]);
            backtrack(i + 1, current);
            current.pop(); // backtrack
        }
    }
    
    backtrack(0, []);
    return result;
}

function makeForm() {
    const form = new FormData();
    const rarity_combos = generateCombinations(["Diamond", "Gold", "Silver", "Bronze", "Common"]);
    console.log(rarity_combos)
}

makeForm()