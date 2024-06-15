function Primo(numero) {
    if (numero <= 1) {
        return false; // 0 y 1 no juegan
    }
    for (let i = 2; i <= Math.sqrt(numero); i++) {
        if (numero % i === 0) {
            return false; // Se divide, no es.
        }
    }
    return true; // Si no se divide, si es.
}

const numero = 197    ;
const NumeroPrimo = Primo(numero);
if (NumeroPrimo) {
    console.log(`${numero} es un número primo.`);
} else {
    console.log(`${numero} no es un número primo.`);
}
