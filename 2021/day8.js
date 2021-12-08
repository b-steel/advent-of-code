// import { fetchInput } from './utils.js';
import lodash from "lodash";
import fs from "fs";
const day = 8;
// fetchInput(day);
let input = fs.readFileSync(`day${day}.txt`, { encoding: "utf-8" });
// Test input override
// input = fs.readFileSync(`day${day}_test.txt`, { encoding: "utf-8" });

const alphabetize = (a, b) => (a > b ? 1 : a < b ? -1 : 0);
const lines = input.split("\n").filter((l) => l);
const data = lines.map((l) => {
  const [input, numbers] = l.split(" | ");
  // console.log(input, numbers);
  return {
    input: input
      .split(" ")
      .filter((x) => x)
      .map((s) => s.split("").sort(alphabetize).join("")),
    digits: numbers
      .split(" ")
      .filter((x) => x)
      .map((s) => s.split("").sort(alphabetize).join("")),
  };
});
//Part 1
// console.log(data);
// console.log(
//   lodash.sum(
//     data.map(({ input, digits }) => {
//       const two = input.find((s) => s.length == 2);
//       const four = input.find((s) => s.length == 4);
//       const seven = input.find((s) => s.length == 3);
//       const eight = input.find((s) => s.length == 7);
//       return digits.filter((d) => [two, four, seven, eight].includes(d)).length;
//     })
//   )
// );

//Part 2
const deduced = data.map(({ input, digits }) => {
  const one = input.find((s) => s.length == 2).split("");
  const four = input.find((s) => s.length == 4).split("");
  const seven = input.find((s) => s.length == 3).split("");
  const eight = input.find((s) => s.length == 7).split("");
  const a = lodash.difference(seven, one);
  const zeroSixNineCommon = input
    .filter((s) => s.length === 6)
    .reduce((acc, s) => lodash.intersection(acc, s.split("")), eight);
  const cde = lodash.difference(eight, zeroSixNineCommon);
  const g = lodash.difference(zeroSixNineCommon, four, a);
  const nine = four.concat(a, g).sort(alphabetize);

  const e = lodash.difference(eight, nine);
  const cd = lodash.difference(cde, e);
  const d = lodash.difference(cd, one);
  const c = lodash.difference(cd, d);
  const f = lodash.difference(seven, a, c);
  const two = a.concat(c, d, e, g).sort(alphabetize);
  const three = a.concat(c, d, f, g).sort(alphabetize);
  const zero = lodash.difference(eight, d);
  const five = lodash.difference(eight, c, e);
  const six = lodash.difference(eight, c);
  const lookup = {
    [zero.join("")]: 0,
    [one.join("")]: 1,
    [two.join("")]: 2,
    [three.join("")]: 3,
    [four.join("")]: 4,
    [five.join("")]: 5,
    [six.join("")]: 6,
    [seven.join("")]: 7,
    [eight.join("")]: 8,
    [nine.join("")]: 9,
  };
  const numbers = digits.map((s) => lookup[s]);
  return numbers.join("");
});
console.log(lodash.sum(deduced.map(Number)));
