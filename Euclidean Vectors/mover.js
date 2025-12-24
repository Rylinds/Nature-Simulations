class Mover {

    // the object has two vectors: position and velocity
    constructor() {
        this.position = createVector(width / 2, height / 2);
        this.velocity = createVector(0, 0);

        // now let's add acceleration
        this.acceleration = createVector(-0.001, 0.01);
    }

    // the mover moves --> position changes by velocity
    update() {
        // now lets make the mover accelerate towards the mouse
        let mouse = createVector(mouseX, mouseY);
        let dir = p5.Vector.sub(mouse, this.position);      // compute the direction

        dir.normalize();        // normalize
        dir.mult(0.2);          // scale
        this.acceleration = dir;        // accelerate

        //this.acceleration = p5.Vector.random2D();       // the random2D() returns a unit vector pointing in a random direction
        //this.acceleration.mult(random(2));
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
    }

    // the mover is drawn as a circle
    show() {
        stroke(0);
        fill(175);
        circle(this.position.x, this.position.y, 48);
    }

    checkEdges() {
        if (this.position.x > width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = width;
        }

        if (this.position.y > height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = height;
        }
    }
}

// acceleration refers to any change in velocity - magnitude or direction.

/*
    For traditional walkers, velocity is directly manipulated, meaning each step was independent from the last. 
    Here, acceleration (rate of change of velocity) is being randomized, not the velocity itself. This makes the object's motion dependent on
    its previous state: the velocity changes incrementally according to the random acceleration.
*/