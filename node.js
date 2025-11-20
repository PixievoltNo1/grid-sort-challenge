import fs from "fs/promises";
import { gridSort } from "./gridSort.mjs";

let challengeLists = (await fs.readFile("RandomNumbers.txt", {encoding: "utf-8"}))
	.split("\n").map( (json) => JSON.parse(json) );
console.log( gridSort(challengeLists[0]).grid );