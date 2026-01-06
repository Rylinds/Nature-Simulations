/*

A physics engine is a program or computer library that simulates the behavior of objects in a physical environment.
With a p5.js sketch, the objects are 2D shapes, and the environment is a rectangular canvas.

An object's velocity vector will remain constant if it's in a state of equilibrium.
In a Mover class, the update() function shouldn't apply any mathematical operations on the velocity vector unless a nonzero net force is present.

    Newton's 3rd law considering p5.js:
        if you calculate a p5.Vector called f that represents a force of object A on object B, 
        you must also apply the opposite force that object B exerts on object A. You can calculate this
        other force as p5.Vector.mult(f, -1)


Acceleration is directly proportional to force and inversely proportional to mass.

*/

class Mover { 

    constructor(x, y, mass) {
        this.mass = mass        // what is mass in p5.js?? I'll just tie it to pixels
        this.position = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);                  
    }

    // to add forces I want something like: mover.applyForce(wind)
    applyForce(force) {
        let f = p5.Vector.div(force, this.mass)
        // this.acceleration = force <-- this is a literal translation of Newton's 2nd law
        // force accumulation must be handled --> net force = m * a
        this.acceleration.add(f);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);      // clear acceleration after it's been applied
    }

    show() {
        stroke(0);
        fill(175);
        circle(this.position.x, this.position.y, this.mass * 16);
    }

    checkEdges() {
        // should probably do a better job using radius instead of center...
        if (this.position.x > width) {
            this.position.x = width;
            this.velocity.x *= -1;
        } else if (this.position.x < 0) {
            this.velocity.x *= -1;
            this.position.x = 0;
        }

        if (this.position.y > height) {
            this.velocity.y *= -1;
            this.position.y = height;
        }
    }

    contactEdge() {
        // apply friction when the circle makes contact with the edge of the canvas (see frictionNote.md for deets)
        return (this.position.y > height - this.radius - 1);
    }

    bounceEdges() {
        // resolving the problem of idealized elastic collision
        let bounce = -0.9;      // new var to simulate an inelastic collision (10% of v)

        if (this.position.y > height - this.radius) {
            this.position.y = height - this.radius;
            this.velocity.y *= bounce;
        }
    }
}