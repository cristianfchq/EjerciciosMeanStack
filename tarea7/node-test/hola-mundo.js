console.log('hola mundo');

const readline = require('readline');


// rl readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})


rl.question('dime tu nombre: ', (respuesta)=>{
    console.log(`hola ${respuesta}`);
    rl.close();
})