export function gridSort(/** @type number[] */ list) {
	/** @type Map<number, number> */ let occurences = new Map();
	for (let num of list) {
		occurences.set(num, 1 + (occurences.get(num) ?? 0));
	}
	/** @type [number, number][] */ let sortedOccurences = [...occurences.entries()];
	sortedOccurences.sort( ([a], [b]) => a - b );

	/** Number of diagonal stripes on either side of grid's diagonal, equal to grid size - 1 */
	let hemisphereSize = 5;
	/** @type number[][] */ let stripes = Array(hemisphereSize * 2 + 1);
	/** @type number[] */ let stripeCapacities = Array(stripes.length);
	for (let i = 0; i < stripes.length; i++) {
		stripes[i] = [];
		stripeCapacities[i] = Math.min(i + 1, stripes.length - i);
	}

	// Placeholder algorithm for filling stripes
	let currentStripe = 0;
	while (sortedOccurences.length) {
		let [num, quantity] = sortedOccurences.shift();
		for (let i = 0; i < quantity; i++) {
			stripes[currentStripe].push(num);
			if (stripes[currentStripe].length == stripeCapacities[currentStripe]) {
				++currentStripe;
			}
		}
	}

	/** @type number[][] */ let grid = Array(6);
	for (let i = 0; i < grid.length; i++) {
		grid[i] = Array(6);
	}
	for (let [stripeNum, stripe] of stripes.entries()) {
		let startX = Math.max(0, hemisphereSize - stripeNum);
		let startY = Math.min(grid.length - 1, stripes.length - 1 - stripeNum);
		for (let [i, num] of stripe.entries()) {
			grid[startY - i][startX + i] = num;
		}
	}
	return {grid};
}