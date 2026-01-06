let mover;

function setup() {
    createCanvas(800, 800);
    mover = new Mover(100, 30, 10);
}

function draw() {
    background(255);

    let gravity = createVector(0, 1);
    mover.applyForce(gravity);          // not scaling this time just to see it slow down faster

    if (mouseIsPressed) {
        let wind = createVector(0.1, 0);
        mover.applyForce(wind);
    }

    // now friction can be included. After some time the circle will come to a rest
    if (mover.contactEdge()) {
        let c = 0.1;
        let friction = mover.velocity.copy();
        friction.mult(-1);
        friction.setMag(c);
        mover.applyForce(friction);    
    }

    mover.checkEdges();
    mover.bounceEdges();
    mover.update();
    mover.show();
}
