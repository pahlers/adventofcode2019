import {Vector} from './Vector';
import {checkIntersection} from 'line-intersect';

export function getIntersections(crossPath) {
    return (acc: Vector[][], v1: Vector, indexA: number, selfA: Vector[]): Vector[][] => {
        const v2 = selfA[indexA + 1];

        if (v2 === undefined) {
            return acc;
        }

        const intersectionB = crossPath.reduce(getIntersection(v1, v2), undefined);

        if (intersectionB) {
            const intersectionRelativeVector = v1.sub(intersectionB);
            const intersectionA = v1.add(intersectionRelativeVector);
            intersectionA.setDistanceFromRoot(v1.distanceFromRoot + intersectionRelativeVector.rectilinearDistance());

            return [...acc, [intersectionA, intersectionB]];
        }

        return acc;
    };
}

function getIntersection(v1: Vector, v2: Vector) {
    return (acc: Vector | undefined, v3: Vector, indexB: number, selfB: Vector[]): Vector | undefined => {
        const v4 = selfB[indexB + 1];

        if (v4 === undefined) {
            return acc;
        }

        const intersection = checkIntersection(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y, v4.x, v4.y);

        if (intersection.type === 'intersecting') {
            const intersectionRelativeVector = v3.sub(new Vector(intersection.point.x, intersection.point.y));
            const intersectionVector = v3.add(intersectionRelativeVector);
            intersectionVector.setDistanceFromRoot(v3.distanceFromRoot + intersectionRelativeVector.rectilinearDistance());

            return intersectionVector;
        }

        return acc;
    };
}
