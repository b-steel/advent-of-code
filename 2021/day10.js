
// import { fetchInput } from './utils.js';
import lodash from 'lodash';
import fs from 'fs';
const day = 10;
// fetchInput(day);
let input = fs.readFileSync(`day${day}.txt`, { encoding: 'utf-8' });
// Test input override
input = fs.readFileSync(`day${day}_test.txt`, { encoding: 'utf-8' });

const lines = input.split('\n').filter((l) => l);

