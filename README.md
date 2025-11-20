This is my solution to Stack Overflow's [Challenge #13: Integer sorting in a grid](https://stackoverflow.com/beta/challenges/79811869/challenge-13-integer-sorting-in-a-grid).

# The challenge

> In this challenge, we will sort some numbers onto a 6x6 square grid. Each cell will have one number.
>
> Your challenge is to place all the integers into the grid such that
>
> - Each row is descendingly sorted (ties are not allowed). For example: 6 5 4 3 2 1 is valid but 6 5 5 5 3 2 is not valid.
> - Each column is descendingly sorted (ties are not allowed)
> - or declare this impossible.
>
> Example on a 3x3 grid: Given these numbers to sort [95, 75, 75, 74, 74, 74, 54, 45, 40]
>
> A valid response would be [[95, 75, 74], [75, 74, 54], [74, 45, 40]]
>
> In the [attached file](RandomNumbers.txt), we have 100 sets of 36 random integers. The integers are between 0 and 99. For each set, return either a valid sorting on a 6x6 grid or declare it impossible.
>
> Please also return the total count of cases for which the sorting was impossible.

# My solution

I began by observing the top-left corner must contain the highest number, as no number can be above it or to its left. As there is only 1 top-left corner, sorting is impossible if there's a tie for highest.

|C1|C2|C3|C4|C5|C6|
|--|--|--|--|--|--|
|99||||||
|~~99~~||||||
|&nbsp;||||||
|&nbsp;||||||
|&nbsp;||||||
|&nbsp;||||||

If there's a 2-way tie for second-highest number, we can place them in the spaces around the highest number. With a 3-way-or-more tie, we run out of room.

|C1|C2|C3|C4|C5|C6|
|--|--|--|--|--|--|
|99|**98**|||||
|**98**||||||
|~~98~~||||||
|&nbsp;||||||
|&nbsp;||||||
|&nbsp;||||||

Doing the same for the lowest numbers in the bottom-right, and extrapolating until they meet in the middle, we find 11 stripes that can contain sets of identical numbers:

|C1|C2|C3|C4|C5|C6|
|--|--|--|--|--|--|
|11|10|9|8|7|6|
|10|9|8|7|6|5|
|9|8|7|6|5|4|
|8|7|6|5|4|3|
|7|6|5|4|3|2|
|6|5|4|3|2|1|

Except it's not quite that simple, as a set can span different stripes as long as no rows or columns are shared:

|C1|C2|C3|C4|C5|C6|
|--|--|--|--|--|--|
|99|98|**97**||||
|**97**||||||
|&nbsp;||||||
|&nbsp;||||||
|&nbsp;||||||
|&nbsp;||||||

Essentially what this means is that as long as X >= Y, an X-space stripe can always contain a set of Y identical numbers, even if the stripe has been partially filled such that it has less than Y spaces left. In that case, we can "borrow" spaces from a larger adjacent stripe. The exception is the middle corner-to-corner stripe, where we have nowhere to borrow from.

[This JavaScript module](gridSort.mjs) implements a stripe-by-stripe fill of the grid, borrowing spaces from larger stripes as necessary.

This repo includes a [Node.js program](node.mjs) that imports the module and runs every case from the challenge through it. With [Node.js](https://nodejs.org/) installed, it can be run with the command `node node.mjs`. The [output](Node%20Output.txt) is also included in the repo.