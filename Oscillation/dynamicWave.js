let startAngle = 0;
let deltaAngle = 0.2;

function setup() {
    createCanvas(800, 400);
}

function draw() {
    background(255);
    let angle = startAngle;

    for (let x = 0; x <= width; x += 24) {
        let y = map(sin(angle), -1, 1, 0, height);
        stroke(0);
        fill(127, 127);
        circle(x, y, 48);
        angle += deltaAngle;
    }

    startAngle += 0.02;
}