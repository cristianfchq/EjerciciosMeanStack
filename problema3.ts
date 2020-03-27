// PROBLEMA 3

// The prime factors of 13195 are 5, 7, 13 and 29.

// What is the largest prime factor of the number 600851475143 ?


console.time('problema3');

let numeroParaFactore = 600851475143; // <=== aqui colocar el valor del numero
let FactoresPrimos: Array<number> = [];
let num = 2;
let m = 0;
while(numeroParaFactore!=1)
{
    while(numeroParaFactore%num==0)
    {
        // console.log(num);
        FactoresPrimos[m] = num;
        m++;
        numeroParaFactore /= num;
    }
    num++;
}

console.log(FactoresPrimos[FactoresPrimos.length-1]);

console.timeEnd('problema3');