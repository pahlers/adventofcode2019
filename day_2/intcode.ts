import {addition, multiply} from './instructions';

export function intcode(memory: number[], instructionPointer: number, debug = false): number[] {
    const opcode = memory[instructionPointer];
    let instructionLength = 1;

    if (opcode === 1) {
        [memory, instructionLength] = addition(memory, instructionPointer, debug);

    } else if (opcode === 2) {
        [memory, instructionLength] = multiply(memory, instructionPointer, debug);

    } else if (opcode === 99) {
        if (debug) {
            console.log('[instruction]', 99, '(exit)');
        }

        return [...memory];

    } else {
        throw Error(`Unknown opcode '${opcode}`);
    }

    return intcode(memory, instructionPointer + instructionLength, debug);
}
