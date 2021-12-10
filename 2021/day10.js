// import { fetchInput } from './utils.js';
import lodash from "lodash";
import fs from "fs";
const day = 10;
// fetchInput(day);
let input = fs.readFileSync(`day${day}.txt`, { encoding: "utf-8" });
// Test input override
// input = fs.readFileSync(`day${day}_test.txt`, { encoding: "utf-8" });

const lines = input.split("\n").filter((l) => l);

const open = ["[", "{", "<", "("];
const close = ["]", "}", ">", ")"];
const isOpener = (c) => open.includes(c);
const isCloser = (c) => close.includes(c);
const matches = (a, b) => {
  switch (a) {
    case "[":
      return b === "]";
    case "{":
      return b === "}";
    case "(":
      return b === ")";
    case "<":
      return b === ">";
    case "]":
      return b === "[";
    case "}":
      return b === "{";
    case ")":
      return b === "(";
    case ">":
      return b === "<";
  }
};
const score = (c) => {
  switch (c) {
    case "]":
      return 57;
    case "}":
      return 1197;
    case ")":
      return 3;
    case ">":
      return 25137;
  }
};
const checkLine = (chars) => {
  const arr = chars.split("");
  const glob = [];
  for (let i = 0; i < arr.length; i++) {
    const char = arr[i];
    if (isOpener(char)) {
      glob.push(char);
    } else {
      const lastChar = glob[glob.length - 1];
      if (!lastChar) {
        // start with closer
        // console.log("closer", chars, score(char));
        return score(char);
      }
      if (matches(char, lastChar)) {
        glob.pop();
      } else {
        // console.log("invalid", chars, score(char));
        return score(char);
      }
    }
  }
  if (glob.length > 0) {
    // incomplete
    return 0;
  }
  console.log("valid");
  return 0; // valid line
};

// console.log(lodash.sum(lines.map((l) => checkLine(l))));
const incomplete = lines.filter((l) => checkLine(l) === 0);

const score2 = (c) => {
  switch (c) {
    case ")":
      return 1;
    case "]":
      return 2;
    case "}":
      return 3;
    case ">":
      return 4;
  }
};
const getCloser = (c) => {
  switch (c) {
    case "[":
      return "]";
    case "{":
      return "}";
    case "(":
      return ")";
    case "<":
      return ">";
  }
};
const getOpener = (c) => {
  switch (c) {
    case "]":
      return "[";
    case "}":
      return "{";
    case ")":
      return "(";
    case ">":
      return "<";
  }
};
const findIndex = (arr, char) => {
  let count = 1;
  for (let i = arr.length - 1; i > -1; i--) {
    const test = arr[i];
    if (test === char) {
      count++;
    }
    if (test === getOpener(char)) {
      count--;
    }
    if (count === 0) {
      return i;
    }
  }
  return -1;
};
const completeLine = (l) => {
  let arr = l.split("");
  const glob = [];
  while (arr.length > 0) {
    const char = arr.pop();
    if (isOpener(char)) {
      glob.push(getCloser(char));
    } else {
      const i = findIndex(arr, char);
      arr = arr.slice(0, i);
    }
    // console.log(char, glob);
  }
  return glob;
};

const scoreCompletion = (arr) => {
  return arr.reduce((score, char) => score * 5 + score2(char), 0);
};
const sorted = incomplete
  .map((l) => scoreCompletion(completeLine(l)))
  .sort((a, b) => a - b);
console.log(sorted[(sorted.length - 1) / 2]);
