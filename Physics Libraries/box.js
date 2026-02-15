class Box {

    constructor(x, y) {
        this.w = 16;
        this.body = Bodies.rectangle(x, y, this.w, this.w);

        Composite.add(engine.world, this.body);
    }

    show() {
        let position = this.body.position;
        let angle = this.body.angle;

        rectMode(CENTER);
        fill(127);
        stroke(0);
        strokeWeight(2);
        push();
        translate(position.x, position.y);
        rotate(angle);

        square(0, 0, this.w);
        pop();
    }

    removeBody() {
        Composite.remove(engine.world, this.body);
    }
}