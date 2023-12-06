// Advent of Code 2023: Day 01

import { createReadStream } from 'fs';
import { createInterface } from 'readline';

function reverseStr(str: string): string {
    return str.split('').reduce((acc, char) => char + acc);
}

/**
 * Solution for first part of day one task
 */
async function buildNumbersFromTextDigits(
    inputFilepath: string,
): Promise<number> {
    // Read file via a stream to save memory
    let sum = 0;
    const lineReader = createInterface({
        input: createReadStream(inputFilepath),
        crlfDelay: Infinity,
    });

    const singleDigitsRegexExpr = /[0-9]/g;
    for await (const line of lineReader) {
        const matches = line.match(singleDigitsRegexExpr);
        if (matches !== null) {
            // Concat the first and last string found (can be the same if len == 1), then parse to int and append
            const builtTextNumber =
                '' +
                matches[0].toString() +
                matches[matches.length - 1].toString();
            sum += parseInt(builtTextNumber);
        }
    }

    return sum;
}

/**
 * Solution for second part of day one task
 */
async function buildNumbersFromTextDigitsAndWords(
    inputFilepath: string,
): Promise<number> {
    // Read file via a stream to save memory
    let sum = 0;
    const lineReader = createInterface({
        input: createReadStream(inputFilepath),
        crlfDelay: Infinity,
    });

    const wordsToDigitsMap: Record<string, number> = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
    };

    // Regex expression for word and non-word digits
    const re = new RegExp(
        '([0-9]|' + Object.keys(wordsToDigitsMap).join('|') + ')',
        'g',
    );

    // ...and this one with which we can look backwards (e.g. for `eno` instead of `one`)
    const reReverse = new RegExp(
        '([0-9]|' +
            Object.keys(wordsToDigitsMap)
                .map((word) => reverseStr(word))
                .join('|') +
            ')',
        'g',
    );

    console.log(reReverse);
    for await (const line of lineReader) {
        // We look for those from the beginning (index 0 of line)
        const matchesForward: string[] = (line.match(re) ?? []).map((match) =>
            match.toString(),
        );

        // We look for those from the end (last index of line)
        const matchesBackwards: string[] = (
            reverseStr(line).match(reReverse) ?? []
        ).map((match) => reverseStr(match.toString()));

        const winners = [matchesForward[0], matchesBackwards[0]];
        const mappedWinners: (string | number)[] = winners.map((winner) =>
            isNaN(+winner) ? wordsToDigitsMap[winner] : winner,
        );

        const builtTextNumber = mappedWinners.join('');
        sum += parseInt(builtTextNumber);
    }

    return sum;
}

(async () => {
    try {
        const inputPath = 'src/day-01-input.txt';
        // const result = await buildNumbersFromTextDigits(inputPath)
        const result = await buildNumbersFromTextDigitsAndWords(inputPath);
        console.log(result);
    } catch (e) {
        console.log(e);
    }
})();
