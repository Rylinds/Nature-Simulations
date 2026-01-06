let movers = [];
let attractor;

function setup() {
    createCanvas(800, 800);
    
    for (let i = 0; i < 10; i++) {
        movers[i] = new Mover(random(width), random(height), random(0.5, 3));
    }

    attractor = new Attractor();
}

function draw() {
    background(255);

    attractor.show();

    for (let j = 0; j < movers.length; j++) {
        let force = attractor.attract(movers[j]);       // calculate the attraction force for each mover object

        movers[j].applyForce(force);
        movers[j].update();
        movers[j].show();
    }
}