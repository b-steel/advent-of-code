// import { fetchInput } from './utils.js';
import lodash from "lodash";
import fs from "fs";
const day = 3;
// fetchInput(day);
const input = fs.readFileSync(`day${day}.txt`, { encoding: "utf-8" });

const lines = input.split("\n").filter((l) => l);
const l = lines[0].length;
// const mid = lines.length / 2;

// const added = lines.reduce((acc, s) => {
//   const numbers = s.split("").map(Number);
//   return acc.map((n, i) => n + numbers[i]);
// }, new Array(l).fill(0));

// let gamma = added
//   .map((n) => (n > mid ? 1 : 0))
//   .map(String)
//   .join("");

// console.log(gamma);
// const epsilon = added
//   .map((n) => (n > mid ? 0 : 1))
//   .map(String)
//   .join("");
// console.log(epsilon);
// console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));

// Part 2
// let oxygen = [...lines];
// for (let i = 0; i < l; i++) {
//   const n = lodash.sum(oxygen.map((l) => Number(l[i])));
//   if (n >= oxygen.length / 2) {
//     oxygen = oxygen.filter((l) => l[i] === "1");
//   } else {
//     oxygen = oxygen.filter((l) => l[i] === "0");
//   }
// }

// let co2 = [...lines];
// for (let i = 0; i < l; i++) {
//   const n = lodash.sum(co2.map((l) => Number(l[i])));
//   console.log(
//     `at position ${i} sum is ${n} and length is ${co2.length} and mid is ${
//       co2.length / 2
//     } so keeping ${n <= co2.length / 2 ? 1 : 0}`
//   );
//   if (n < co2.length / 2) {
//     co2 = co2.filter((l) => l[i] === "1");
//   } else {
//     co2 = co2.filter((l) => l[i] === "0");
//   }
//   console.log(co2);
//   if (co2.length === 1) {
//     i = 100;
//   }
// }
// console.log(oxygen);
// console.log(parseInt(oxygen[0], 2) * parseInt(co2[0], 2));

let oxygen = [...lines].map((l) => parseInt(l, 2));
let offset = 2 ** (l - 1);
for (let i = l - 1; i >= 0; i--) {
  const above = oxygen.filter((n) => n >= offset);
  const below = oxygen.filter((n) => n < offset);
  oxygen = above.length >= below.length ? above : below;
  offset += (above.length >= below.length ? 1 : -1) * 2 ** (i - 1);
  if (oxygen.length === 1) {
    i = -1;
  }
}
console.log(oxygen[0], oxygen[0].toString(2));

let co2 = [...lines].map((l) => parseInt(l, 2));
offset = 2 ** (l - 1);
for (let i = l - 1; i >= 0; i--) {
  const above = co2.filter((n) => n >= offset);
  const below = co2.filter((n) => n < offset);

  co2 = above.length < below.length ? above : below;
  offset += (above.length < below.length ? 1 : -1) * 2 ** (i - 1);
  if (co2.length === 1) {
    i = -1;
  }
}
console.log(co2[0], co2[0].toString(2));

console.log(co2[0] * oxygen[0]);
