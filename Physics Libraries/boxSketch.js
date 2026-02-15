const { Engine, Bodies, Composite, Body, Vector } = Matter;

let engine;

let boxes = [];
let boundaries = [];

function setup() {
    engine = Engine.create()
    createCanvas(800, 400);

    // floor
    boundaries.push(new Boundary(width / 2, height - 10, width, 20));
    // left wall
    boundaries.push(new Boundary(10, height / 2, 20, height));
    // right wall
    boundaries.push(new Boundary(width - 10, height / 2, 20, height));
}

function draw() {
    Engine.update(engine);
    background(255);
    if (mouseIsPressed) {
        let box = new CustomShape(mouseX, mouseY);
        boxes.push(box);
    }
    for (let box of boxes) {
        box.show();
    }
    for (let boundary of boundaries) {
        boundary.show();
    }
}