// variables for position and ball speed
/*
let x = 100;
let y = 100;
let xspeed = 2.5;
let yspeed = 2;

function setup() {
    createCanvas(640, 240);
}

function draw() {
    background(255);

    // move the ball according to its speed
    x = x + xspeed;
    y = y + yspeed;

    if (x > width ||  x < 0) {
        xspeed = xspeed * -1;
    }
    if (y > height || y < 0) {
        yspeed = yspeed * -1;
    }

    stroke(0);
    fill(127);
    circle(x, y, 48)        // draw the ball here
}
*/

// but p5.Vector exists so the old ball position/speed code can be replaced as:
let position;
let velocity;

function setup() {
    createCanvas(640, 240);
    position = createVector(100, 100);
    velocity = createVector(2.5, 2);
}

function draw() {
    background(255);

    position.add(velocity);

    if ((position.x > width) || (position.x < 0)) {
        velocity.x = velocity.x * -1;
    }
    if ((position.y > height) || (position.y < 0)) {
        velocity.y = velocity.y * -1;
    }

    stroke(0);
    fill(127);
    // a circle can be drawn with only two scalar values --> dig into the p5.Vector object to grab the x- and y-components using OO dot syntax
    circle(position.x, position.y, 48)     
}