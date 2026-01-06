class Liquid {

    constructor(x, y, w, h, c) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;         // drag coefficient
    }

    contains(mover) {
        // apply the drag force to the mover
        let pos = mover.position;

        // boolean determines whether the position vector is contained within the rect defined by the liquid class
        return (
            pos.x > this.x && pos.x < this.x + this.w &&
            pos.y > this.y && pos.y < this.y + this.h
        );
    }

    calculateDrag(mover) {
        // see airResistanceNote.md for deets
        let speed = mover.velocity.mag();
        let dragMagnitude = this.c * speed * speed;

        let dragForce = mover.velocity.copy();
        dragForce.mult(-1);
        dragForce.setMag(dragMagnitude);

        return dragForce;
    }

    show() {
        noStroke();
        fill(200);
        rect(this.x, this.y, this.w, this.h);
    }
}