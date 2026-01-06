let movers = [];
let liquid;

function setup() {
    createCanvas(650, 400);

    for (let i = 0; i < 9; i++) {
        let mass = random(0.1, 5);
        movers[i] = new Mover(40 + i * 70, 0, mass);
    }

    liquid = new Liquid(0, height / 2, width, height / 2, 0.1);
}

function draw() {
    background(255);

    liquid.show();

    for (let j = 0; j < movers.length; j++) {
        if (liquid.contains(movers[j])) {
            let dragForce = liquid.calculateDrag(movers[j]);
            movers[j].applyForce(dragForce);                    // sometimes if the drag coefficient is too high, circles might bounce (inaccuracy)
        }

        let gravity = createVector(0, 0.1 * movers[j].mass);
        movers[j].applyForce(gravity);

        movers[j].update();
        movers[j].show();
        movers[j].checkEdges();
    }
}