// the class's motion is controlled throughout position, velocity, and acceleration vectors. This makes the behaviors easy ti implement.

class Vehicle {

    constructor() {
        this.position = createVector();
        this.velocity = createVector();
        this.acceleration = createVector();
        this.r = 6.0
        this.maxspeed = 8;                  // arbitrary value selection
        this.maxforce = 0.2;
    }

    seek(target) {
        // the seeking steering force based on Reynold's formula (see agentsNote.md)
        let desired = p5.Vector.sub(target, this.position);
        desired.setMag(this.maxspeed);

        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);
        this.applyForce(steer);
    }

    arrive(target) {
        let desired = p5.Vector.sub(target, this.position);
        let d = desired.mag();          // the distance is the mag of the vector pointing from the position to its target

        if (d < 100) {                  // if we are closer than 100px
            let m = map(d, 0, 100, 0, this.maxspeed);           // set the mahg according to how close we are
            desired.setMag(m);
        } else {
            desired.setMag(this.maxspeed);                      // otherwise proceed at max speed
        }

        let steer = p5.Vector.sub(desired, this.velocity);

        steer.limit(this.maxforce);
        this.applyForce(steer);
    }

    boundaries(offset) {
        // start with a null desired velocity
        let desired = null;

        if (this.position.x < offset) {
            // make a desired velocity that retains the y-direction of the vehicle but points the x-direction directly away from the edges
            desired = createVector(this.maxspeed, this.velocity.y);
        } else if (this.position.x > width - offset) {
            desired = createVector(-this.maxspeed, this.velocity.y);
        }
        
        if (this.position.y < offset) {
            desired = createVector(this.velocity.x, this.maxspeed);
        } else if (this.position.y > height - offset) {
            desired = createVector(this.velocity.x, -this.maxspeed);
        }

        if (desired !== null) {
            // apply steering if the desired velocity is non-null
            desired.normalize();
            desired.mult(this.maxspeed);

            let steer = p5.Vector.sub(desired, this.velocity);
            steer.limit(this.maxforce);
            this.applyForce(steer);
        }
    }

    contain(margin = 50) {
        let force = createVector(0, 0);
        let center = createVector(width / 2, height / 2);

        // Left wall
        if (this.position.x < margin) {
            let d = this.position.x / margin;
            let strength = (1 - d) * this.maxforce * 5;
            let inward = p5.Vector.sub(center, this.position);
            inward.setMag(strength);
            force.add(inward);
        }

        // Right wall
        if (this.position.x > width - margin) {
            let d = (width - this.position.x) / margin;
            let strength = (1 - d) * this.maxforce * 5;
            let inward = p5.Vector.sub(center, this.position);
            inward.setMag(strength);
            force.add(inward);
        }

        // Top wall
        if (this.position.y < margin) {
            let d = this.position.y / margin;
            let strength = (1 - d) * this.maxforce * 5;
            let inward = p5.Vector.sub(center, this.position);
            inward.setMag(strength);
            force.add(inward);
        }

        // Bottom wall
        if (this.position.y > height - margin) {
            let d = (height - this.position.y) / margin;
            let strength = (1 - d) * this.maxforce * 5;
            let inward = p5.Vector.sub(center, this.position);
            inward.setMag(strength);
            force.add(inward);
        }

        this.applyForce(force);
    }


     // makes more sense to keep it here than in Vehicle
    followFlow(flow) {
        let desired = flow.lookup(this.position);
        desired.setMag(this.maxspeed)
        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);
        this.applyForce(steer);
    }

    followPath(path) {
        // step 1: predict the vehicle's future position
        let future = this.velocity.copy();
        future.setMag(25);
        future.add(this.position);

        // step 2: find the normal point along the path
        let normalPoint = getNormalPoint(future, path.start, path.end);
        // step 3: look farther along the path and set a target
        let b = p5.Vector.sub(path.end, path.start);
        b.setMag(25);
        let target = p5.Vector.add(normalPoint, b);

        // step 4: if you're off the path, seek that target to get back on the path
        let distance = p5.Vector.dist(normalPoint, future);
        if (distance > path.radius) {
            this.seek(target);
        }
    }

    applyForce(force) {
        this.acceleration.add(force);
    }
    
    separate(vehicles) {
        let desiredSeparation = this.r * 2;

        let sum = createVector(0, 0);
        let count = 0;

        for (let other of vehicles) {
            let d = p5.Vector.dist(this.position, other.position);
            if (this !== other && d < desiredSeparation) {
                let diff = p5.Vector.sub(this.position, other.position);
                diff.normalize();
                diff.div(d + 0.0001);        // scale by distance
                sum.add(diff);
                count++;
            }
        }

        if (count > 0) {
            sum.div(count);                 // average
            sum.setMag(this.maxspeed);
            let steer = p5.Vector.sub(sum, this.velocity);
            steer.limit(this.maxforce);
            this.applyForce(steer);
        }
    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    show() {
        let angle = this.velocity.heading();
        fill(127);
        stroke(0);
        push();
        translate(this.position.x, this.position.y);
        rotate(angle);
        // the vehicle is a triangle pointing in the direction of the velocity
        beginShape();
        vertex(this.r * 2, 0);
        vertex(-this.r * 2, -this.r);
        vertex(-this.r * 2, this.r);
        endShape(CLOSE);
        pop(); 
    }

}