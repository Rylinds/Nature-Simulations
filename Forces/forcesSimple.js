let moverA;
let moverB;

function setup() {
    createCanvas(800, 800);
    moverA = new Mover(100, 30, 10);        // big mover
    moverB = new Mover(400, 30, 2);         // small mover
}

function draw() {
    background(255);

    let gravity = createVector(0, 1);
    // scale gravity by mass
    let gravityA = p5.Vector.mult(gravity, moverA.mass);
    let gravityB = p5.Vector.mult(gravity, moverB.mass);
    moverA.applyForce(gravityA);
    moverB.applyForce(gravityB);

    if (mouseIsPressed) {
        let wind = createVector(0.1, 0);
        moverA.applyForce(wind);
        moverB.applyForce(wind);
    }

    moverA.checkEdges();
    moverA.update();
    moverA.show();

    moverB.checkEdges();
    moverB.update();
    moverB.show();
}
