/*

    If tan(a) = b
    then a = arctan(b)
    ...
    If tan(angle) = velocity.y / velocity.x
    then angle = arctan(velocity.y / velocity.x)

*/

class Mover {

    constructor() {
        this.position = createVector();
        this.velocity = createVector();
        this.acceleration = createVector();
        this.mass = 1.0;
        // vars for angular motion
        this.angle = 0;
        this.angleVelocity = 0;
    }

    update() {
        let mouse = createVector(mouseX, mouseY);
        let dir = p5.Vector.sub(mouse, this.position);      // compute the direction
        dir.normalize();        // normalize
        dir.mult(0.2);          // scale
        this.acceleration = dir;        // accelerate

        //this.angleAcceleration = this.acceleration.x;           // use x component to calculate angular acceleration
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.angleVelocity += this.angleAcceleration;
        this.angleVelocity = constrain(this.angleVelocity, -0.1, 0.1);      // control the spin
        this.angle += this.angleVelocity;
        this.acceleration.mult(0);
    }

    show() {
        // account for all possible directions with atan2()
        //let angle = atan2(this.velocity.y, this.velocity.x)
        let angle = this.velocity.heading();

        stroke(0);
        fill(185, 200);
        // save the current state so the shape's rotation doesn't affect everything else
        push();
        rectMode(CENTER)

        // set origin at the shape's position
        translate(this.position.x, this.position.y);

        rotate(angle);
        rect(400, 200, 30, 10);
        // restore the previous state after rotation is complete
        pop();
    }
}