import fs from "fs/promises";
import { gridSort } from "./gridSort.mjs";

let challengeLists = (await fs.readFile("socc_13_test_vectors.txt", {encoding: "utf-8"}))
	.split("\n").map( (json) => JSON.parse(json) );
let challengeSets = [];
for (let i = 0; i < challengeLists.length; i += 4) {
	challengeSets.push( challengeLists.slice(i, i + 4) );
}
for (let set of challengeSets) {
	let successes = 0;
	for (let [i, list] of set.entries()) {
		let result = gridSort(list);
		if (result.success) { ++successes; }
		console.log( i + 1, "of 4:",
			result.success ? "✔️ Sorted" : "❌ Impossible, closest sort shown")
		console.log( result.grid );
	}
	console.log( "Successfully sorted", successes, "of 4 lists.");
	console.log();
}