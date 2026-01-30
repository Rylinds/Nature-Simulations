// Vehicle was getting a little insane so here's just boids for flocking
class Boid {

    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = p5.Vector.random2D().mult(random(1, 3));
        this.acceleration = createVector();
        this.r = 6;
        this.maxspeed = 4;
        this.maxforce = 0.3;

        const mesaColors = [
            color('#D95D34'),
            color('#F6A600'),
            color('#CBE3B4'),
            color('#7B9A9E'),
            color('#A35D3B'),
            color('#A89CA6'),
            color('#4B4B4B')
        ];
        this.color = random(mesaColors);

        // Store history of positions with frame timestamp
        this.history = [];
        this.trailLifetime = 100; // if you want to see trails fade out
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);

        // Add current position with timestamp
        this.history.push({ pos: this.position.copy(), age: 0 });

        // Update trail ages and remove old points
        for (let i = this.history.length - 1; i >= 0; i--) {
            this.history[i].age++;
            if (this.history[i].age > this.trailLifetime) {
                this.history.splice(i, 1);
            }
        }
    }

    show() {
        // Draw fading trail
        /*
        noFill();
        beginShape();
        for (let h of this.history) {
            let alpha = map(h.age, 0, this.trailLifetime, 255, 0);
            stroke(red(this.color), green(this.color), blue(this.color), alpha);
            strokeWeight(2);
            vertex(h.pos.x, h.pos.y);
        }
        endShape();
        */

        // Draw the boid on top
        let angle = this.velocity.heading();
        fill(this.color);
        stroke(0, 50);
        push();
        translate(this.position.x, this.position.y);
        rotate(angle);
        beginShape();
        vertex(this.r * 2, 0);
        vertex(-this.r * 2, -this.r);
        vertex(-this.r * 2, this.r);
        endShape(CLOSE);
        pop();
    }

    // Push vehicles away from walls, perpendicular to edges
    contain(margin = 50) {
        let force = createVector(0, 0);

        if (this.position.x < margin)
            force.x = (margin - this.position.x) / margin * this.maxforce;
        if (this.position.x > width - margin)
            force.x = -((this.position.x - (width - margin)) / margin * this.maxforce);
        if (this.position.y < margin)
            force.y = (margin - this.position.y) / margin * this.maxforce;
        if (this.position.y > height - margin)
            force.y = -((this.position.y - (height - margin)) / margin * this.maxforce);

        this.applyForce(force);
    }

    separate(boids) {
        let desiredSeparation = this.r * 10;
        let sum = createVector();
        let count = 0;

        for (let other of boids) {
            let d = p5.Vector.dist(this.position, other.position);
            if ((this !== other) && (d < desiredSeparation)) {
                let diff = p5.Vector.sub(this.position, other.position);
                diff.normalize();
                diff.div(d + 0.0001);
                sum.add(diff);
                count++;
            }
        }

        if (count > 0) {
            sum.div(count);
            sum.setMag(this.maxspeed);
            let steer = p5.Vector.sub(sum, this.velocity);
            steer.limit(this.maxforce);
            return steer;
        }
        return createVector(0, 0);
    }

    align(boids) {
        let neighborDistance = 50;
        let sum = createVector();
        let count = 0;

        for (let other of boids) {
            let d = p5.Vector.dist(this.position, other.position);
            if ((this !== other) && (d < neighborDistance)) {
                sum.add(other.velocity);
                count++;
            }
        }

        if (count > 0) {
            sum.div(count);
            sum.setMag(this.maxspeed);
            let steer = p5.Vector.sub(sum, this.velocity);
            steer.limit(this.maxforce);
            return steer;
        }
        return createVector(0, 0);
    }

    cohere(boids) {
        let neighborDistance = 50;
        let sum = createVector();
        let count = 0;

        for (let other of boids) {
            let d = p5.Vector.dist(this.position, other.position);
            if ((this !== other) && (d < neighborDistance)) {
                sum.add(other.position);
                count++;
            }
        }

        if (count > 0) {
            sum.div(count);
            let desired = p5.Vector.sub(sum, this.position);
            desired.setMag(this.maxspeed);
            let steer = p5.Vector.sub(desired, this.velocity);
            steer.limit(this.maxforce);
            return steer;
        }
        return createVector(0, 0);
    }

    flock(boids) {
        let separation = this.separate(boids);
        let alignment = this.align(boids);
        let cohesion = this.cohere(boids);

        separation.mult(1.5);
        alignment.mult(1.0);
        cohesion.mult(1.0);

        this.applyForce(separation);
        this.applyForce(alignment);
        this.applyForce(cohesion);

        // optional tiny jitter to break symmetry
        this.applyForce(p5.Vector.random2D().mult(0.01));
    }

    run(boids) {
        this.flock(boids);
        this.contain(100);
        this.update();
        this.show();
    }

}
