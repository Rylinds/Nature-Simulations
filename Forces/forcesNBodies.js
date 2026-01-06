/*
let bodyA;
let bodyB;

function setup() {
    createCanvas(800, 800);
    bodyA = new Body(320, 100, 5);
    bodyB = new Body(320, 400, 5);

    bodyA.velocity = createVector(1, 0);
    bodyB.velocity = createVector(-1, 0);
}

function draw() {
    background(255);

    bodyA.attract(bodyB);
    bodyB.attract(bodyA);

    bodyA.update();
    bodyA.show();
    bodyB.update();
    bodyB.show();
}
*/

let bodies = [];

function setup() {
    createCanvas(1000, 1000);

    for (let i = 0; i < 10; i++) {
        bodies[i] = new Body(random(width), random(height), random(0.1, 2));
    }
}

function draw() {
    background(255);

    // for every body, check every body
    for (let i = 0; i < bodies.length; i++) {
        for (let j = 0; j < bodies.length; j++) {
            // don't attract oneself
            if (i !== j) {
                let force = bodies[j].attract(bodies[i]);
                bodies[i].applyForce(force);
            }
        }
        bodies[i].update();
        bodies[i].show();
    }
}

// this uses an n-squared approach (# of calculations = # of bodies) --> the simulation will slow with more bodies introduced