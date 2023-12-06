// Advent of Code 2023: Day 01

import { createReadStream } from "fs";
import { createInterface } from 'readline';

async function buildNumbersFromTextLines(inputFilepath: string): Promise<number> {

    // Read file via a stream to save memory
    let sum = 0;
    const lineReader = createInterface({
        input: createReadStream(inputFilepath),
        crlfDelay: Infinity,
    })

    const singleDigitsRegexExpr = /[0-9]/g;
    for await (const line of lineReader) {
        const matches = line.match(singleDigitsRegexExpr);
        if (matches !== null) {
            // Concat the first and last string found (can be the same if len == 1), then parse to int and append 
            const builtTextNumber = "" + matches[0].toString() + matches[matches.length - 1].toString();
            sum += parseInt(builtTextNumber);
        };
    }

    return sum;

};


(async () => {
    try {
        const inputPath = 'src/day-01-input.txt'
        const result = await buildNumbersFromTextLines(inputPath);
        console.log(result);
    } catch (e) {
        console.log(e);
    }
})();
