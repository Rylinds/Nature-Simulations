let r;
let theta;

function setup() {
    createCanvas(800, 800);
    r = height * 0.45;
    theta = 0;
}

function draw() {
    background(255);
    translate(width / 2, height / 2);

    // polar coords are converted to Cartesian for use in the circle() function
    let x = r * cos(theta);
    let y = r * sin(theta);

    fill(127);
    stroke(0);
    line(0, 0, x, y);
    circle(x, y, 48);
    // increase the angle over time
    theta += 0.02;
}

/*

    fromAngle() takes an angle in radians and creates a unit vector in Cartesian space that points in the direction specified by the angle.

    let position  = p5.Vector.fromAngle(theta);         // create a unit vector pointing in the direction of an angle
    position.mult(r);                                   // polar-to-Cartesian conversion, scale position by r
    circle(position.x, position.y, 48)                  // draw the circle using the x and y components of the vector

*/