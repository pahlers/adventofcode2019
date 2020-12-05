import {input} from './input';
import {processMassInput} from './processMassInput';

// const input = `
// 12
// 14
// 1969
// 100756
// `;

console.log('--- Day 1, part 1: The Tyranny of the Rocket Equation ---', input);

const output = processMassInput(input)
    .map(calculateFuel)
    .reduce((acc, fuel) => acc + fuel, 0);

console.log('--- output ---', output);

function calculateFuel(mass: number): number {
    const fuel = Math.floor(mass / 3) - 2;

    if(fuel <= 0){
        return 0;
    }

    return fuel + calculateFuel(fuel);
}
