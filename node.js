import fs from "fs/promises";
import { gridSort } from "./gridSort.mjs";

let challengeLists = (await fs.readFile("RandomNumbers.txt", {encoding: "utf-8"}))
	.split("\n").map( (json) => JSON.parse(json) );
let failures = 0;
for (let list of challengeLists) {
	let result = gridSort(list);
	if (!result.success) { ++failures; }
	console.log( result.success ? "✔️ Sorted" : "❌ Impossible, closest sort shown")
	console.log( result.grid );
	console.log();
}
console.log( failures, "impossible cases.")