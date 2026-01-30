let vehicles = [];

function setup() {
    createCanvas(800, 800);
    for (let i = 0; i < 100; i++) {
        vehicles.push(new Vehicle(random(width), random(height)));
    }
}

function draw() {
    background(255);

    for (let vehicle of vehicles) {
        vehicle.separate(vehicles);
        vehicle.contain(100);
        vehicle.update();
        vehicle.show();
    }
}