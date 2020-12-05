import {input} from './input';
import {intcode} from './intcode';

// const input = `
// 1,9,10,3,2,3,11,0,99,30,40,50
// `;

console.log('--- Day 2, part 2: 1202 Program Alarm ---', input);

const output = input.split(',')
    .map(value => parseInt(value, 10));

// before running
const answer = Array.from({length: 100})
    .reduce((acc: { noun: number, verb: number }, _, noun) => {
        if (acc.verb < 0) {
            const verb = Array.from({length: 100})
                .findIndex((_, verb) => {
                    const localOutput = [...output];


                    localOutput[1] = noun; // noun
                    localOutput[2] = verb; // verb

                    const [answer] = intcode(localOutput, 0);

                    return answer === 19690720;
                });

            if (verb !== -1) {
                return {
                    noun,
                    verb
                }
            }
        }

        return acc;
    }, {
        noun: -1,
        verb: -1
    })

console.log('--- output ---', answer, 100 * answer.noun + answer.verb);
