import {input} from './input';
import {intcode} from './intcode';

// const input = `
// 1,9,10,3,2,3,11,0,99,30,40,50
// `;

console.log('--- Day 2, part 1: 1202 Program Alarm ---', input);

const output = input.split(',')
    .map(value => parseInt(value, 10));

// before running
output[1] = 12; // noun
output[2] = 2; // verb

console.log('--- output ---', intcode(output, 0, true));
