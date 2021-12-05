import fetch from "node-fetch";
import fs from "fs";

export function fetchInput(day) {
  console.log("fetching");
  const cookie =
    "session=53616c7465645f5f59121cb1d0bd7cb70e839c53b44648563a1a4c4c1cd71bbb08b0cbaa7eff4f823d4abc7709651791";
  return fetch(`https://adventofcode.com/2021/day/${day}/input`, {
    method: "GET",
    headers: { cookie },
  })
    .then((response) => response.text())
    .then((text) => {
      fs.writeFile(`day${day}.txt`, text, (err) => {});
      return;
    })
    .catch((error) => {
      console.log("request rejected", error);
    });
}
