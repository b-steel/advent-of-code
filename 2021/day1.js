import { fetchInput } from "./utils.js";
import lodash from "lodash";
import fs from "fs";
fetchInput(1);
const input = fs.readFileSync("day1.txt", { encoding: "utf-8" });

const lines = input
  .split("\n")
  .filter((l) => l)
  .map(Number);

// Part 1
// const numberOfDepthIncreases = lines.reduce(
//   (acc, n) => {
//     if (acc.n !== 0 && acc.n < n) {
//       acc.count++;
//     }
//     acc.n = n;
//     return acc;
//   },
//   { n: 0, count: 0 }
// );
// console.log(numberOfDepthIncreases.count);

// Part 2
const n = lines
  .slice(0, lines.length - 2)
  .map((_, i) => lodash.sum(lines.slice(i, i + 3)));
const numberOfDepthIncreases = n.reduce(
  (acc, n) => {
    if (acc.n !== 0 && acc.n < n) {
      acc.count++;
    }
    acc.n = n;
    return acc;
  },
  { n: 0, count: 0 }
);
console.log(numberOfDepthIncreases.count);
