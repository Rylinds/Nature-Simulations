class Walker {

    // setup func
    constructor() {
        this.x = width / 2;
        this.y = height / 2;
    }

    // drawing the walk
    show() {
        stroke(0);
        point(this.x, this.y);
    }

    // choosing which directions to go
    step() {
        // three possible directions (nine possible steps) for the walker to go -> yields -1, 0, 1
        let xstep = floor(random(3)) - 1;
        let ystep = floor(random(3)) - 1;

        // to create continuous step lenths from -1 to 1
        // let xstep = random(-1, 1)
        // let ystep = random(-1, 1)

        this.x += xstep;
        this.y += ystep;
    }

    step_tendency() {
        // the random numbers from random() aren't truly random - they're pseudorandom since they're the result of mathematical simulated randomness
        // we could produce a walker that has a tendency to move to the right

        let r = random(1);

        if (r < 0.4) {      // a 40% chance of moving to the right
            this.x++;
        } else if (r < 0.6) {
            this.x--;
        } else if (r < 0.8) {
            this.y++;
        } else {
            this.y--;
        }
    }

    // random walkers have a tendency to return to previously visited spots (oversampling)
    // this isn't an effective approach if the walker is foraging for food as it wastes energy
    // Lévy flight allows the walker to occasionally take a large step away to reduce oversampling
    levy() {
        let r = random(1);

        if (r < 0.01) {     // 1% chance of taking a large step
            xstep = random(-100, 100);
            ystep = random(-100, 100);
        } else {
            xstep = random(-1, 1);
            ystep = random(-1, 1);
        }
    }
}

// ultimately, absolute randomness can appear unnatural...
// Perlin noise "smooths" the randomness by producing a naturally ordered sequence of pseudorandom numbers (each one is close to the value before it)
class PerlinWalker {

    constructor() {
        // the noise function is deterministic - it always gives you the same result for a specific time
        // the walker would move along the diagonal if I asked for the noise value at the same t for x and y
        this.tx = 1;
        this.ty = 10000;    // 'arbitrary' choice
    }

    show() {
        stroke(0);
        point(this.x, this.y);
    }

    step() {
        // x and y position mapped from noise
        this.x = map(noise(this.tx), 0, 1, 0, width);
        this.y = map(noise(this.ty), 0, 1, 0, height);
        // move forward through time (really it's just space)
        this.tx += 0.01;
        this.ty += 0.01;
    }
}