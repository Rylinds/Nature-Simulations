// make Mover become Body with the added attract() method now included. I want to keep this distinct though for the case of clarity.

class Body { 

    constructor(x, y, mass) {
        this.mass = mass    
        this.position = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);                  
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass)
        this.acceleration.add(f);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);    
    }

    show() {
        stroke(0);
        fill(175);
        circle(this.position.x, this.position.y, this.mass * 16);
    }

    checkEdges() {
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
        return (this.position.y > height - this.radius - 1);
    }

    bounceEdges() {
        let bounce = -0.9;

        if (this.position.y > height - this.radius) {
            this.position.y = height - this.radius;
            this.velocity.y *= bounce;
        }
    }

    attract(body) {
        let G = 1.0;

        let force = p5.Vector.sub(this.position, body.position);
        let d = constrain(force.mag(), 5, 25);
        let strength = (G * this.mass * body.mass) / (d * d);
    
        force.setMag(strength);

        //body.applyForce(force);
        
        // for n bodies makes sure it returns force, otherwise use above.
        return force;
    }
}