let angle = 0;
let angleVelocity = 0;
let angleAcceleration = 0.001;

function setup() {
    createCanvas(800, 400);
}

function draw() {
    background(255);
    translate(width / 2, height / 2);
    rotate(angle);              // rotate according to that angle

    stroke(0);
    fill(127);
    line(-60, 0, 60, 0);
    circle(60, 0, 16);
    circle(-60, 0 , 16);

    angleVelocity += angleAcceleration;         // angular equivalent of velocity.add(acceleration)
    angle += angleVelocity;                     // angular equivalent of position.add(velocity)
}