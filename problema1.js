"use strict";
// PROBLEMA 1
// If we list all the natural numbers below 10 that are multiples of 3 
// or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
// Find the sum of all the multiples of 3 or 5 below 1000.
console.time('problema1');
console.log(sumaTotalP(1000));
function sumaTotalP(numero) {
    var sumb = 0;
    for (var i = 1; i < numero; i++) {
        i % 3 == 0 ? sumb = sumb + i : i % 5 == 0 ? sumb = sumb + i : sumb = sumb;
    }
    return sumb;
}
console.timeEnd('problema1');
