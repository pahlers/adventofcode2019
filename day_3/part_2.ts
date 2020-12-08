import {processInput} from './processInput';
import {input} from './input';
import {Vector} from './Vector';
import {getIntersectionFactory} from './getIntersectionFactory';

// const input = `
// R8,U5,L5,D3
// U7,R6,D4,L4
// `;

// const input = `
// R75,D30,R83,U83,L12,D49,R71,U7,L72
// U62,R66,U55,R34,D71,R55,D58,R83
// `;

// const input = `
// R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
// U98,R91,D20,R16,D67,R40,U7,R15,U6,R7
// `;

console.log('--- Day 3, part 2: Crossed Wires ---', input);

const [path0, path1] = processInput(input);

const output = path0
    .reduce((acc: Vector[][], v1: Vector, indexA: number, selfA: Vector[]) => {
        const v2 = selfA[indexA + 1];

        if (v2 === undefined) {
            return acc;
        }

        const intersectionB = path1.reduce(getIntersectionFactory(v1, v2), undefined);

        if (intersectionB) {
            const intersectionRelativeVector = v1.sub(intersectionB);
            const intersectionA = v1.add(intersectionRelativeVector);
            intersectionA.setDistanceFromRoot(v1.distanceFromRoot + intersectionRelativeVector.rectilinearDistance());

            return [...acc, [intersectionA, intersectionB]];
        }

        return acc;
    }, [])
    .map(([v1, v2]) => v1.distanceFromRoot + v2.distanceFromRoot)
    .filter(distance => distance > 0)
    .sort((a, b) => a - b)

console.log('--- output ---', output);
