// the vector sets the object's velocity, defined as the rate of change of the object's position with respect to time
// --> the new position is equal to  the result of applying the velocity to the current position

class Vector {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // a function to add another vector to this vector
    add(v) {
        this.x = this.x + v.x;
        this.y = this.y + v.y;
    }
}