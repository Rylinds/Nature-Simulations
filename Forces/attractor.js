class Attractor {

    constructor() {
        // the attractor doesn't move, just needs a position and mass
        this.position = createVector(width / 2, height / 2);
        this.mass = 20;
    }

    attract(mover) {
        let G = 1.0;

        // see gravityNote.md for why this my choice
        let force = p5.Vector.sub(this.position, mover.position);
        let distance = force.mag();
        distance = constrain(distance, 5, 25);           // control so the circle doesn't go wild

        // calculate the strength of the attraction force
        let strength = (G * this.mass * mover.mass) / (distance * distance);
        // something to beware of: when using '/', what if the distance is really really small? 
        // p5.js isn't the real world so I want to constrain the distance before using the result for force.
        force.setMag(strength);

        // return force to be applied to the mover
        return force;
    }

    show() {
        stroke(0);
        fill(175, 200);
        circle(this.position.x, this.position.y, sqrt(this.mass) * 2);
    }
}