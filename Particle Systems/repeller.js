let emitter;
let repeller;

function setup() {
    createCanvas(800, 400);
    emitter = new Emitter(width / 2, 20);
    repeller = new Repeller(width / 2, 200);
}

function draw() {
    background(255);
    emitter.addParticle();

    let gravity = createVector(0, 0.1);
    emitter.applyForce(gravity);
    emitter.applyRepeller(repeller);
    emitter.run();
    repeller.show();
}

// now let's push away particles if they get too close
class Repeller {

    constructor(x, y) {
        this.position = createVector(x, y);
        this.power = 350;           // scales the repellent force
    }

    show() {
        stroke(0);
        fill(127);
        circle(this.position.x, this.position.y, 32);
    }

    repel(particle) {
        let force = p5.Vector.sub(this.position, particle.position);
        let distance = force.mag();
        distance = constrain(distance, 5, 50);
        let strength = -1 * this.power / (distance * distance);         // based on equation from gravitational attraction
        force.setMag(strength);
        return force;
    }
}