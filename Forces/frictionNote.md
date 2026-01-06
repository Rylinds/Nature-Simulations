
Friction is a dissapative force --> causes kinetic energy of an object to be converted to another form (impression of loss)

Friction works in the opposite direction...

```
    let friction = this.velocity.copy();
    friction.normalize();
    friction.mult(-1); 
```

Put it all together using magnitude and direction:

```
    let c = 0.1;
    let normal = 1;
    let frictionMag = c * normal;       // calculate the mag of friction (abitrary)

    let friction = mover.velocity.copy();
    friction.mult(-1);                  // opposite force
    friction.normalize();
    friction.mult(frictionMag);         // takes the unit vector and multiplies by the mag to create the force vector
```

It can be applied when the circle makes contact with an edge:

```
    contactEdge() {
        return (this.position.y > height - this.radius - 1);
    }
```

Of course the spheres show idealized elastic collision (no kinetic energy is lost). That can be sorta fixed:

```
    bounceEdges() {
        let bounce = -0.9;      // new var to simulate an inelastic collision (10% of v)

        if (this.position.y > height - this.radius) {
            this.position.y = height - this.radius;
            this.velocity.y *= bounce;
        }
    }
```
