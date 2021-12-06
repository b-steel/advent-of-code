// import { fetchInput } from './utils.js';
import lodash from "lodash";
import fs from "fs";
const day = 5;
// fetchInput(day);
const input = fs.readFileSync(`day${day}.txt`, { encoding: "utf-8" });
// const input = fs.readFileSync(`day${day}_test.txt`, { encoding: "utf-8" });

const lines = input.split("\n").filter((l) => l);

const data = lines.map((l) => {
  const [start, end] = l.split(" -> ");
  const [x1, y1] = start.split(",").map(Number);
  const [x2, y2] = end.split(",").map(Number);
  return { x1, y1, x2, y2 };
});
// Part 1
// const verticalData = data.filter(({ x1, x2 }) => x1 == x2);
// const horizontalData = data.filter(({ y1, y2 }) => y1 == y2);
// // console.log(horizontalLines);
// // console.log(verticalLines);

// const makeVerticalLine = (l) => {
//   const { x1, y1, y2 } = l;
//   const min = y1 > y2 ? y2 : y1;
//   const max = y1 >= y2 ? y1 : y2;
//   return lodash.range(min, max + 1).map((y) => [x1, y]);
// };
// const makeHorizontalLine = (l) => {
//   const { x1, x2, y1 } = l;
//   const min = x1 > x2 ? x2 : x1;
//   const max = x1 >= x2 ? x1 : x2;
//   return lodash.range(min, max + 1).map((x) => [x, y1]);
// };
// const horizontal = horizontalData.map(makeHorizontalLine);
// const vertical = verticalData.map(makeVerticalLine);

// const map = {};
// vertical.concat(horizontal).forEach((line) => {
//   line.forEach((point) => {
//     const key = point.join(",");
//     if (!map[key]) {
//       map[key] = 1;
//     } else {
//       map[key]++;
//     }
//   });
// });
// console.log(Object.values(map).filter((v) => v >= 2).length);

// part 2
const makeLine = (line) => {
  const { x1, y1, x2, y2 } = line;
  // const vertical = x1 == x2;
  // const horizontal = y1 == y2;
  // const diagonal = Math.abs(x1 - x2) == Math.abs(y1 - y2);
  let yRange = lodash.range(y1, y2 >= y1 ? y2 + 1 : y2 - 1);
  let xRange = lodash.range(x1, x2 >= x1 ? x2 + 1 : x2 - 1);
  const l = Math.max(yRange.length, xRange.length);
  if (yRange.length === 1 && l > 1) {
    yRange = xRange.map((_) => yRange[0]);
  }
  if (xRange.length === 1 && l > 1) {
    xRange = yRange.map((_) => xRange[0]);
  }

  return lodash.zip(xRange, yRange);
};
const map = {};
data.map(makeLine).forEach((line) => {
  line.forEach((point) => {
    const key = point.join(",");
    if (!map[key]) {
      map[key] = 1;
    } else {
      map[key]++;
    }
  });
});
console.log(Object.values(map).filter((v) => v >= 2).length);
