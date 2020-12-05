export function addition(memory: number[], address: number, debug = false): [number[], number] {
    const {addressRead0, addressRead1, addressWrite, value0, value1} = readInstruction(memory, address);
    const answer = value0 + value1;

    if (debug) {
        console.log('[instruction]', 1, addressRead0, addressRead1, addressWrite, '(addition)', value0, value1, answer);
    }

    return [memory.map((current, index) => index === addressWrite ? answer : current), 4];
}

export function multiply(memory: number[], address: number, debug = false): [number[], number] {
    const {addressRead0, addressRead1, addressWrite, value0, value1} = readInstruction(memory, address);
    const answer = value0 * value1;

    if (debug) {
        console.log('[instruction]', 2, addressRead0, addressRead1, addressWrite, '(multiply)', value0, value1, answer);
    }

    return [memory.map((current, index) => index === addressWrite ? answer : current), 4];
}

function readAddress(memory: number[], address: number): number {
    const value = memory[address];

    if (!Number.isFinite(value)) {
        throw Error(`Unknown address '${address}'`);
    }

    return value;
}

function readInstruction(memory: number[], address: number) {
    const addressRead0 = readAddress(memory, address + 1);
    const addressRead1 = readAddress(memory, address + 2);
    const addressWrite = readAddress(memory, address + 3);

    const value0 = readAddress(memory, addressRead0);
    const value1 = readAddress(memory, addressRead1);

    return {addressRead0, addressRead1, addressWrite, value0, value1};
}
