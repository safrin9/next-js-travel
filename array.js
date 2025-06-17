const arr = [1, 2, 3, 4, 5, 6, 7, 9];
const arr2 = arr.map((el) => el * el);

console.log(arr2);
const arr3 = arr.filter((el) => el % 2 === 0);
console.log(arr3);

total = arr.reduce((sum, el) => sum + el, 0);
console.log(total);
