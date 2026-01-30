let flock;

function setup() {
    createCanvas(1000, 800);
    flock = new Flock();

    for (let i = 0; i < 120; i++) {
        let boid = new Boid(width / 2, height / 2);
        flock.addBoid(boid);
    }
}

function draw() {
    background("#F2E6D5");
    flock.run();
}