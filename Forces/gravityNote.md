1. Fg refers to the gravitational force, the vector to compute and pass into the applyForce() method
2. G is the universal gravitational constant: 6.67428 * 10^-11 m^3 per kg per s^2
3. r hat is the unit vector pointing from object 1 to object 2
4. r^2 is the distance bewteen the two objects squared

The strength of the gravitational force is inversely proportional to the distance squared.
To translate to p5.js, I can assume:
- there are two objects
- each object has a position
- each object has a mass
- G represents the universal gravitational constant

```
    let direction = p5.Vector.sub(mouse, position);

    // or let's just do
    let direction = p5.Vector.sub(position1, position2);
    direction.normalize();

    // now compute magnitude and scale the vector
    let magnitude = (G * mass1 * mass2) / (distance * distance);
    dir.mult(magnitude);

    // but I don't know what distance is...
    let force = p5.Vector.sub(position2, position1);
    let distance = force.mag();
    force.setMag(magnitude);
```

How can I make an attractor and mover communicate?
1. A global func that receives both and Attractor and Mover
2. A method in the Attractor class that receives a Mover
3. A method in the Mover class that receives an Attractor
4. A method in the Attractor class that receives a Mover and returns a p5.Vector, which is the attraction force. Then pass it into the Mover's applyForce()

I'll do #4. I don't really want to change the applyForce() method.
---
What about when many objects attract many objects?
- according to Newton's 3rd law, all forces occur in pairs
- so I need a `Body`, with every body attracting every other body

The n-body problem involves solving for the motion of a group og objects that interact via graviational forces. The two-body problem is a famous one.
The three-body problem has no formal solution though...
