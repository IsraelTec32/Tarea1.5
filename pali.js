function palindromo(A) {
    const primera = A.toLowerCase().replace(/[^A-Za-z0-9]/g, '');
    const segunda = primera.split('').reverse().join('');
    return primera === segunda ? 'Es palindromo' : 'No es palindromo';
}

console.log(palindromo('Ojo')); 
console.log(palindromo('32123')); 
console.log(palindromo('Reconocer')); 
console.log(palindromo('Alma'));



