1. Fd refers to drag force, the vector to compute and pass into the applyForce() method.
2. -1/2 is a constant: -0.5. The valus is a little arbitrary, but being negative means that the force points in the opposite direction.
3. rho refers to the density of fluid.
4. v, velocity, is an object's speed shown as velocity.mag().
5. A refers to the frontal surface area of the object that's pushing through the liquid or gas.
6. Cd is the drag coefficient (same coefficient as friction). This determines the relative strength of the drag force.
7. the velocity unit vector is found with velocity.normalize()

A simplified drag formula can be something like:

```
    let c = 0.1;
    let speed = this.velocity.mag();
    let dragMagnitude = c * speed * speed;

    let drag = this.velocity.copy();;
    drag.mult(-1);

    drag.setMag(dragMagnitude);
```
