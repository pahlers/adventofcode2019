import {Vector} from './Vector';

export function processInput(input: string): Vector[][] {
    return input.split('\n')
        .filter(wire => !!wire)
        .map(createPath);
}

function createPath(path: string): Vector[] {
    return [
        new Vector(0, 0),
        ...path
            .split(',')
            .map(toRelativePosition)
    ]
        .reduce(toAbsolutePosition, []);
}

function toRelativePosition(part: string): Vector {
    const [direction, ...rest] = part;
    const distance = parseInt(rest.join('').trim(), 10);

    switch (direction) {
        case 'U':
            return new Vector(distance, 0);
        case 'R':
            return new Vector(0, distance);
        case 'D':
            return new Vector(distance * -1, 0);
        case 'L':
            return new Vector(0, distance * -1);
        default:
            throw Error('Unknown direction');
    }
}

function toAbsolutePosition(acc, vector: Vector, index): Vector[] {
    if(index === 0){
        return [vector];
    }

    const last: Vector = acc[acc.length - 1];
    const recalulatedVector: Vector = last.add(vector);

    recalulatedVector.setDistanceFromRoot(last.distanceFromRoot + vector.rectilinearDistance());

    return [...acc, recalulatedVector];
}

