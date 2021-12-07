// import { fetchInput } from './utils.js';
import lodash from "lodash";
import fs from "fs";
const day = 7;
// fetchInput(day);
let input = fs.readFileSync(`day${day}.txt`, { encoding: "utf-8" });
// Test input override
// input = fs.readFileSync(`day${day}_test.txt`, { encoding: "utf-8" });

const data = input
  .split(",")
  .filter((l) => l)
  .map(Number);

// part 1
// const min = lodash.min(data);
// const max = lodash.max(data);
// const stacked = lodash.countBy(data, (n) => n);
// console.log(stacked);
// const cost = (x) => {
//   return lodash.sum(data.map((n) => Math.abs(n - x)));
// };
// let fuel = cost(0);
// let i = 1;
// let done = false;
// while (!done) {
//   const newFuel = cost(i);
//   if (newFuel > fuel) {
//     done = true;
//     console.log(fuel);
//   }
//   fuel = newFuel;
//   i++;
// }
//   return lodash.sum(data.map((n) => Math.abs(n - x)));
// };

// part 2 ?
const sumSeq = (n) => (n * (n + 1)) / 2;
const cost = (x) => {
  return lodash.sum(data.map((n) => sumSeq(Math.abs(n - x))));
};
let fuel = cost(0);
for (let i = 0; i <= lodash.max(data); i++) {
  const newFuel = cost(i);
  if (newFuel < fuel) {
    fuel = newFuel;
  }
}
console.log(fuel);
