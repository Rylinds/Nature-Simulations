// An example of normalizing a vector

function draw() {
    background(255);

    let mouse = createVector(mouseX, mouseY);
    let center = createVector(width / 2, height / 2);
    mouse.sub(center);

    translate(width / 2, height / 2);
    stroke(200);
    line(0, 0, mouse.x, mouse.y);

    // since the vector is normalized, the vector always has the same length of 50
    mouse.normalize();
    mouse.mult(50);

    stroke(0);
    strokeWeight(8);
    line(0, 0, mouse.x, mouse.y);
}

// normalization is often the first step in creating a vector of a specific length, even if the desired length is something other than 1