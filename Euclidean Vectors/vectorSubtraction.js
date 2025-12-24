// An example of vector subtraction

function draw() {
    background(255);
    
    // two vectors: one for mouse location and one for the center of the window
    let mouse = createVector(mouseX, mouseY);
    let center = createVector(width / 2, height / 2);

    // draw the two original vectors
    stroke(200);
    strokeWeight(4);
    line(0, 0, mouse.x, mouse.y);
    line(0, 0, center.x, center.y);

    // vector subtraction
    mouse.sub(center);
    // draw a line to represent the result of subtraction (move the origin with translate to place the vector)
    stroke(0);
    translate(width / 2, height / 2);
    line(0, 0, mouse.x, mouse.y)
}

// by subtracting the center vector from the mouse vector, the starting point of the resulting vector is moved to the center of the canvas