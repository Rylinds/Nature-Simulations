let vehicle;
let flow;

function setup() {
    createCanvas(800, 800);

    flow = new FlowField();
    flow.init();

    vehicle = new Vehicle();
    vehicle.position = createVector(width / 2, height / 2);
    vehicle.velocity = p5.Vector.random2D(); // IMPORTANT
}

function draw() {
    background(245);

    vehicle.followFlow(flow);
    vehicle.contain(100);
    vehicle.update();
    vehicle.show();
}
