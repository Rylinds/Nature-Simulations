let emitters = [];

function setup() {
    createCanvas(800, 400);
}

function mousePressed() {
    emitters.push(new Emitter(mouseX, mouseY));
}

function draw() {
    background(255);
    let gravity = createVector(0, 0.1);
    // ok to use for.. of since no elements are being removed from the array
    for (let emitter of emitters) {
        emitter.applyForce(gravity);
        emitter.addParticle();
        emitter.run();
   }
}


class Emitter {

    constructor(x, y) {
        this.origin = createVector(x, y);

        this.particles = [];
    }

    addParticle() {
        let r = random(1);

        if (r < 0.5) {
            this.particles.push(new Particle(this.origin.x, this.origin.y));
        } else {
            this.particles.push(new Confetti(this.origin.x, this.origin.y));
        }
    }

    applyForce(force) {
        for (let particle of this.particles) {
            particle.applyForce(force);
        }
    }

    applyRepeller(repeller) {
        for (let particle of this.particles) {
            let force = repeller.repel(particle);
            particle.applyForce(force);
        }
    }

    run() {
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