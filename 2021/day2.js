import { fetchInput } from "./utils.js";
import lodash from "lodash";
import fs from "fs";
const day = 2;
// fetchInput(day);
const input = fs.readFileSync(`day${day}.txt`, { encoding: "utf-8" });

const lines = input.split("\n").filter((l) => l);

const directions = lines.map((l) => {
  const parts = l.split(" ");
  return { direction: parts[0], n: Number(parts[1]) };
});
// Part 1
// const pos = directions.reduce(
//   (p, d) => {
//     switch (d.direction) {
//       case "up":
//         p.depth -= d.n;
//         break;
//       case "down":
//         p.depth += d.n;
//         break;
//       case "forward":
//         p.horizontal += d.n;
//         break;
//     }
//     return p;
//   },
//   { depth: 0, horizontal: 0 }
// );
// console.log(pos.depth * pos.horizontal);

// Part 2

const pos = directions.reduce(
  (p, d) => {
    switch (d.direction) {
      case "up":
        p.aim -= d.n;
        break;
      case "down":
        p.aim += d.n;
        break;
      case "forward":
        p.horizontal += d.n;
        p.depth += d.n * p.aim;
        break;
    }
    return p;
  },
  { depth: 0, horizontal: 0, aim: 0 }
);
console.log(pos.depth * pos.horizontal);
