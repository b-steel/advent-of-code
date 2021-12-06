// import { fetchInput } from './utils.js';
import lodash from "lodash";
import fs from "fs";
const day = 6;
// fetchInput(day);
let input = fs.readFileSync(`day${day}.txt`, { encoding: "utf-8" });
// Test input
// input = fs.readFileSync(`day${day}_test.txt`, { encoding: "utf-8" });

const lines = input.split("\n").filter((l) => l);

// Part 1
const simulate = (initial, days) => {
  // Setup map
  const map = {};
  initial.forEach((n) => {
    if (map[n] == undefined) {
      map[n] = 0;
    }
    map[n]++;
  });
  let input = Object.assign({}, map);
  for (let i = 0; i < days; i++) {
    const newFish = input[0] ?? 0;
    const output = {};
    Object.entries(input).forEach(([key, value]) => {
      const k = Number(key);
      if (k !== 0) {
        output[k - 1] = value;
      }
    });
    output[8] = (output[8] ?? 0) + newFish;
    output[6] = (output[6] ?? 0) + newFish;
    input = output;
  }

  return [input, lodash.sum(Object.values(input))];
};

const initial = lines[0]
  .split(",")
  .filter((x) => x)
  .map(Number);
// console.log(initial);
console.log(simulate(initial, 256));
