let emitters = [];

function setup() {
    createCanvas(800, 400);
}

function mousePressed() {
    emitters.push(new Emitter(mouseX, mouseY));
}

function draw() {
    background(255);

    // ok to use for.. of since no elements are being removed from the array
    for (let emitter of emitters) {
        emitter.run();
   }
}


class Emitter {

    constructor(x, y) {
        this.origin = createVector(x, y);

        this.particles = [];
    }

    addParticle() {
        this.particles.push(new Particle(this.origin.x, this.origin.y));
    }

    run() {
        this.addParticle();


        let length = this.particles.length - 1;
        let gravity = createVector(0, 0.1);

        for (let i = length; i >= 0; i--) {
            let particle = this.particles[i];

            particle.update();
            particle.show();
            particle.applyForce(gravity);

            if (particle.isDead()) {
                this.particles.splice(i, 1);
            }
        }
    }
}