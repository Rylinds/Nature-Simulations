let mover;

function setup() {
    createCanvas(1000, 1000);
    mover = new Mover();
}

function draw() {
    background(255);
    mover.update();
    mover.show();
}