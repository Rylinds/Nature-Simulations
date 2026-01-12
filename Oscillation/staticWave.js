let angle = 0;
let deltaAngle = 0.2;
let amplitude = 100;

function setup() {
    createCanvas(800, 400);
    background(255);
    stroke(0);
    fill(127, 127);

    for (let x = 0; x <= width; x += 24) {
        // calculate the y-position according to the amplitude and the sine of the angle
        let y = amplitude * sin(angle);

        circle(x, y + height / 2, 48);

        // increment the angle according to the delta angle
        angle += deltaAngle;
    }
}