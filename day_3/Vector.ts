export class Vector {
    x: number = 0;
    y: number = 0;
    distanceFromRoot = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `[${this.x},${this.y}]`;
    }

    distance() {
        return Math.abs(this.x) + Math.abs(this.y);
    }

    add(vector: Vector): Vector {
        return new Vector(vector.x + this.x, vector.y + this.y);
    }

    sub(vector: Vector): Vector {
        return new Vector(vector.x - this.x, vector.y - this.y);
    }

    setDistanceFromRoot(distance: number) {
        this.distanceFromRoot = distance;
    }
}
