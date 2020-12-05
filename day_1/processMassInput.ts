export function processMassInput(input: string) {
    return input.split('\n')
        .filter(mass => !!mass)
        .map(mass => parseInt(mass, 10));
}
