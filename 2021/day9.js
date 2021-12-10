// import { fetchInput } from './utils.js';
import lodash from "lodash";
import fs from "fs";
const day = 9;
// fetchInput(day);
let input = fs.readFileSync(`day${day}.txt`, { encoding: "utf-8" });
// Test input override
// input = fs.readFileSync(`day${day}_test.txt`, { encoding: "utf-8" });

const lines = input
  .split("\n")
  .filter((l) => l)
  .map((l) => l.split("").map(Number));

const nCols = lines[0].length;
const nRows = lines.length;

const f = (row, col) => {
  const center = lines[row][col];
  const up = row === 0 ? undefined : lines[row - 1][col];
  const down = row === nRows - 1 ? undefined : lines[row + 1][col];
  const left = col === 0 ? undefined : lines[row][col - 1];
  const right = col === nCols - 1 ? undefined : lines[row][col + 1];
  return { up, down, left, right, center };
};
const isLowPoint = (row, col) => {
  const { up, down, left, right, center } = f(row, col);
  let lowest = true;
  if (lowest && up !== undefined) {
    if (up <= center) {
      lowest = false;
    }
  }
  if (lowest && down !== undefined) {
    if (down <= center) {
      lowest = false;
    }
  }
  if (lowest && left !== undefined) {
    if (left <= center) {
      lowest = false;
    }
  }
  if (lowest && right !== undefined) {
    if (right <= center) {
      lowest = false;
    }
  }
  return lowest;
};
// Part 1

// const lowPoints = [];
// for (let r = 0; r < rows; r++) {
//   for (let c = 0; c < cols; c++) {
//     const isLowest = isLowPoint(r, c);
//     if (isLowest) {
//       lowPoints.push(lines[r][c] + 1);
//     }
//   }
// }
// console.log(lodash.sum(lowPoints));
// part 2
const lowPoints = [];
for (let r = 0; r < nRows; r++) {
  for (let c = 0; c < nCols; c++) {
    const isLowest = isLowPoint(r, c);
    if (isLowest) {
      lowPoints.push([r, c]);
    }
  }
}
const toN = (r, c) => {
  return r * nCols + c;
};
const toPoint = (n) => {
  return [Math.floor(n / nCols), n % nCols];
};
const union = (a, b) => new Set([...a, ...b]);
const intersection = (a, b) => new Set([...a].filter((x) => b.has(x)));
const diff = (a, b) => new Set([...a].filter((x) => !b.has(x)));

const nearby = (r, c) => {
  const { up, down, left, right, center } = f(r, c);

  const within = new Set();
  if (up !== undefined) {
    if (up >= center && up < 9) {
      within.add(toN(r - 1, c));
    }
  }
  if (down !== undefined) {
    if (down >= center && down < 9) {
      within.add(toN(r + 1, c));
    }
  }
  if (left !== undefined) {
    if (left >= center && left < 9) {
      within.add(toN(r, c - 1));
    }
  }
  if (right !== undefined) {
    if (right >= center && right < 9) {
      within.add(toN(r, c + 1));
    }
  }

  return within;
};
const makeBasin = (r, c, existing) => {
  if (!existing) {
    existing = new Set();
    existing.add(toN(r, c));
  }
  const newToCheck = diff(nearby(r, c), existing);
  const arr = [...newToCheck];
  if (arr.length > 0) {
    return arr.reduce((acc, spot) => {
      const [r, c] = toPoint(spot);
      const expand = makeBasin(r, c, new Set([...acc, toN(r, c)]));
      return union(acc, expand);
    }, existing);
  }
  return existing;
};

console.log(
  lowPoints
    .map(([r, c]) => makeBasin(r, c).size)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, n) => acc * n, 1)
);

// const checkSpot = (r, c) => {
//   const { up, down, left, right, center } = f(r, c);

//   const within = new Set();
//   within.add(`${r},${c}`);
//   if (up !== undefined) {
//     if (up >= center && up < 9) {
//       within.add(`${r - 1},${c}`);
//     }
//   }
//   if (down !== undefined) {
//     if (down >= center && down < 9) {
//       within.add(`${r + 1},${c}`);
//     }
//   }
//   if (left !== undefined) {
//     if (left >= center && left < 9) {
//       within.add(`${r},${c - 1}`);
//     }
//   }
//   if (right !== undefined) {
//     if (right >= center && right < 9) {
//       within.add(`${r},${c + 1}`);
//     }
//   }

//   return within;
// };

// let trigger = false;
// const makeBasin = (r, c, existing) => {
//   if (!existing) {
//     existing = new Set();
//     existing.add(`${r},${c}`);
//   }
//   console.log(existing);
//   const smallBasin = checkSpot(r, c);
//   const a = [...smallBasin];
//   console.log(a);
//   const filtered = a.filter((x) => !existing.has(x));
//   console.log(filtered);
//   const newSpots = diff(smallBasin, existing);
//   const arr = Array.from(newSpots);
//   if (arr.length > 0) {
//     return arr.reduce((acc, spot) => {
//       const [r, c] = spot.split(",").map(Number);
//       const expand = makeBasin(r, c, acc);
//       console.log(expand);
//       const combined = union(acc, expand);
//       // console.log(combined);
//       return combined;
//     }, existing);
//   }
//   return existing;
// };
// console.log(lowPoints.map(([r, c]) => makeBasin(r, c)));
