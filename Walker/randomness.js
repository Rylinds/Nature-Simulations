let walker;

function setup() {
    createCanvas(640, 240);
    walker = new PerlinWalker();
    background(255);
}

// this will loop forever until you quit
function draw() {
    walker.step();
    walker.show();
}

// in terms of what this is for, it can be used for ecosystem development - a jittery bug or floating leaf perhaps?