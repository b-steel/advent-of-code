// import { fetchInput } from './utils.js';
import lodash from "lodash";
import fs from "fs";
const day = 4;
// fetchInput(day);
const raw = fs.readFileSync(`day${day}.txt`, { encoding: "utf-8" });

const lines = raw.split("\n\n").filter((l) => l);
const input = lines[0].split(",").map(Number);
const boards = lines.slice(1).map((l) =>
  l
    .split("\n")
    .filter((x) => x)
    .map((l) =>
      l
        .split(" ")
        .filter((x) => x)
        .map(Number)
    )
);

const isFinished = (board, input) => {
  const data = board.map((r) => {
    return parseInt(r.map((n) => (input.includes(n) ? "1" : "0")).join(""), 2);
  });

  const rowFinished = data.some((r) => r === 2 ** 5 - 1);
  const colFinished = data.reduce((n, r) => r & n, 2 ** 5 - 1) !== 0;
  return rowFinished || colFinished;
};

const scoreBoard = (board, input) => {
  let numbers = board.reduce((arr, row) => arr.concat(row), []);

  return (
    lodash.sum(lodash.difference(numbers, input)) * input[input.length - 1]
  );
};

//   // Part 1
// for (let i = 5; i <= input.length; i++) {
//   const current_input = input.slice(0, i);
//   const winner = boards.find((b) => isFinished(b, current_input));
//   if (winner) {
//     console.log("winner", scoreBoard(winner, current_input));
//     i = input.length;
//   }
// }
// Part 1
let boardsToTry = [...boards];
for (let i = 5; i <= input.length; i++) {
  const current_input = input.slice(0, i);
  if (boardsToTry.length <= 1) {
    const done = isFinished(boardsToTry[0], current_input);
    if (done) {
      console.log(
        "found last winner",
        scoreBoard(boardsToTry[0], current_input)
      );
      i = input.length;
    }
  }

  boardsToTry = boardsToTry.filter((b) => !isFinished(b, current_input));
}
