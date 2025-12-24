// An example of vector multiplication

function draw() {
    background(255);

    let mouse = createVector(mouseX, mouseY);
    let center = createVector(width / 2, height / 2);
    mouse.sub(center);

    translate(width / 2, height / 2);
    strokeWeight(2);
    stroke(200);
    line(0, 0, mouse.x, mouse.y);
    mouse.mult(0.5);        // multiplication --> the vector is now half of its original size

    stroke(0);
    strokeWeight(4);
    line(0, 0, mouse.x, mouse.y);
}

/* 
    As a reminder for number properties:
        - basic algebraic rules of multiplication apply to vectors
        - associative rule: (n * m) * v = n * (m * v)
        - distributive rule with two scalars, one vector: (n + m) * v = (n * v) + (m * v)
        - distributive rule with two vectors, one scalar: (u + v) * n = (u * n) + (v * n)
*/