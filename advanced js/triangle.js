function* generateTriangularNumbers() {
    let sum = 0;
    let i = 1;
    while (true) {
        sum += i;
        yield sum;
        i++;
    }
}

const generator = generateTriangularNumbers();

console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);