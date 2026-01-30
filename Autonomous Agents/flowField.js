class FlowField {

    constructor() {
        this.resolution = 20;
        this.cols = floor(width / this.resolution);
        this.rows = floor(height / this.resolution);

        this.field = new Array(this.cols);
        for (let i = 0; i < this.cols; i++) {
            this.field[i] = new Array(this.rows);
        }
    }

    init() {
        noiseSeed(random(10000));

        let xoff = 0;
        for (let i = 0; i < this.cols; i++) {
            let yoff = 0;
            for (let j = 0; j < this.rows; j++) {
                let angle = map(noise(xoff, yoff), 0, 1, 0, TWO_PI);
                this.field[i][j] = p5.Vector.fromAngle(angle);
                yoff += 0.1;
            }
            xoff += 0.1;
        }
    }

    lookup(position) {
        let col = constrain(
            floor(position.x / this.resolution),
            0,
            this.cols - 1
        );
        let row = constrain(
            floor(position.y / this.resolution),
            0,
            this.rows - 1
        );

        let v = this.field[col][row].copy();
        v.mult(2); // 👈 amplify flow so motion is visible
        return v;
    }
}
