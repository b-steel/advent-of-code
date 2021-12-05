#!/bin/bash

echo "Creating file day$1.js..."
echo "
import { fetchInput } from './utils.js';
fetchInput($1);
" > "day$1.js"

echo "File Created"
echo "Running day$1.js..."

node "day$1.js"

echo "First run Finished. Overwriting with fs.readFileSync"

echo "
// import { fetchInput } from './utils.js';
import lodash from 'lodash';
import fs from 'fs';
const day = $1;
// fetchInput(day);
const input = fs.readFileSync(\`day\${day}.txt\`, { encoding: 'utf-8' });

const lines = input.split('\n').filter((l) => l);
" > "day$1.js"

echo "Setup complete"