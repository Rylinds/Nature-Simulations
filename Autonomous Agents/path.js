/*
class Path {

    constructor() {
        this.radius = 20;
        this.start = createVector(0, height / 3);
        this.end = createVector(width, (2 * height) / 3);
    }

    getNormalPoint(position, a, b) {
        let vectorA = p5.Vector.sub(position, a);           // vector that points from a to position

        let vectorB = p5.Vector.sub(b, a);                  // vector that points from a to b
        vectorB.normalize();                                // use the dot product for scalar projection
        vectorB.mult(vectorA.dor(vectorB));
        let normalPoint = p5.Vector.add(a, vectorB);        // find the normal point along the line segment

        return normalPoint;
    }

    show() {
        strokeWeight(this.radius * 2);
        stroke(0, 100);
        line(this.start.x, this.start.y, this.end.x, this.end.y);
        strokeWeight(1);
        stroke(0);
        line(this.start.x, this.start.y, this.end.x, this.end.y)
    }
}
*/

// Let's make a path made of multiple line segments instead of just one (above)
class Path {

    constructor() {
        this.radius = 20;
        this.points = [];
    }

    addPoint(x, y) {
        let pathPoint = createVector(x, y);
        this.points.push(pathPoint);
    }

    getNormalPoint(position, a, b) {
        let vectorA = p5.Vector.sub(position, a);           // vector that points from a to position

        let vectorB = p5.Vector.sub(b, a);                  // vector that points from a to b
        vectorB.normalize();                                // use the dot product for scalar projection
        vectorB.mult(vectorA.dot(vectorB));
        let normalPoint = p5.Vector.add(a, vectorB);        // find the normal point along the line segment

        return normalPoint;
    }

    show() {
        stroke(200);
        strokeWeight(this.radius * 2);
        noFill();
        beginShape();
        for (let pathPoint of this.points) {
            vertex(pathPoint.x, pathPoint.y);
        }
        endShape();

        stroke(0);
        strokeWeight(1);
        beginShape();
        for (let pathPoint of this.points) {
            vertex(pathPoint.x, pathPoint.y);
        }
        endShape()
    }
}
