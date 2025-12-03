export function gridSort(/** @type number[] */ list) {
	// Create a sorted list of identical sets of numbers
	/** @type Map<number, number> */ let occurrences = new Map();
	for (let num of list) {
		occurrences.set(num, 1 + (occurrences.get(num) ?? 0));
	}
	/** @type [number, number][] */ let sortedOccurrences = [...occurrences.entries()];
	sortedOccurrences.sort( ([a], [b]) => a - b );

	// Create the stripe representation of the grid
	/** Number of diagonal stripes on either side of grid's diagonal, equal to grid size - 1 */
	let hemisphereSize = 5;
	/** @type number[][] */ let stripes = Array(hemisphereSize * 2 + 1);
	/** @type number[] */ let stripeCapacities = Array(stripes.length);
	for (let i = 0; i < stripes.length; i++) {
		stripes[i] = [];
		stripeCapacities[i] = Math.min(i + 1, stripes.length - i);
	}

	// Fill stripes from bottom-right to top-left
	let success = true;
	let currentStripe = 0;
	for (let [num, quantity] of sortedOccurrences) {
		let capacity = stripeCapacities[currentStripe];
		for (let i = 0; i < quantity; i++) {
			stripes[currentStripe].push(num);
			if (stripes[currentStripe].length == stripeCapacities[currentStripe]) {
				++currentStripe;
				// If we're about to borrow space from a smaller stripe, use its capacity
				if (i + 1 < quantity) {
					capacity = Math.min(capacity, stripeCapacities[currentStripe]);
				}
			}
		}
		if (quantity > capacity) {
			success = false;
		}
	}

	// Convert the stripe representation of the grid to the grid proper
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
	return {grid, success};
}