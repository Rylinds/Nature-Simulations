let particles = [];

function setup() {
    createCanvas(800, 400);
}

function draw() {
    background(255);
    let gravity = createVector(0, 0.1);
    
    particles.push(new Particle(width / 2, 20));

    /* 
    
    a problem with the for loop is that when an element is removed with splice(), all elements are shifted to the left
    ...some particles will sneakby unchecked when they fall into an index that's already been reviewed
    I could iterate through the array backwards or use a higher order function to check *all* elements

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].show();
        particles[i].applyForce(gravity);

        if (particles[i].isDead()) {
            particles.splice(i, 1);         // remove a particle at index i so the program doesn't die in a few minutes
        }
    }

    */

    for (let i = particles.length - 1; i >= 0; i--) {           // loop through the list backward
        let particle = particles[i];
        particle.update();
        particle.show();
        particle.applyForce(gravity);

        if (particle.isDead()) {
            particles.splice(i, 1);
        }
    }

    /*

    Thought about using shift() to remove the first element of the array, but in many particle systems, other conditions
    or interactions may cause younger particles to die sooner than older particles.
    For now, using isDead() and splice() is a simple and flexible solution.

    */
}


class Particle {

    constructor(x, y) {
        this.position = createVector(x, y);
        this.acceleration = createVector(random(-1, 1), random(-2, 0));
        this.velocity = createVector(0, 0);
        this.lifespan = 255.0;            // tells us how long the particle has been alive
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        this.lifespan -= 2.0;           // lifespan decreases
    }

    show() {
        stroke(0, this.lifespan);       // use lifespan for alpha (nice visual cue) -- it will fade away
        fill(175, this.lifespan);
        circle(this.position.x, this.position.y, 8);
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    isDead() {
        return (this.lifespan < 0.0);
    }
}