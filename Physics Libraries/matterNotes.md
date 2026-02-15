### Matter.js Overview
**Engine**: entity that manages the physics simulation itself. The engine holds onto the world of the simulation as well as various properties indicating how the world is updated over time.

**Bodies**: primary elements in the world, corresponding to the physical objects being simulated.

**Composite**: container that allows for the creation of complex entities (ex: the world itself).

**Constraints**: act as connections between the bodies.

**Vector**: describes an entity with a magnitude and direction using x- and y- components, defining position, velocities, and forces in the world.

**Quick comparision for how vectors work**:
```
// p5.js
let v = createVector(1, -1);

// Matter.js
let v = Matter.Vector.create(1, -1);
```

Vector addition:
```
let a = Matter.Vector.create(1. -1);
let b = Matter.Vector.create(3, 4);
Matter.Vector.add(a, b, a);

// this would overwrite vector a though -> save to a separate vector?
let c = Matter.Vector.add(a, b);
```

Scalar multiplication, magnitude, and normalizing:
```
let v = Matter.Vector.create(1, -1);
v = Matter.Vector(v, 4);

// mag and norm
let y = Matter.Vector.create(3, 4);
let m = Matter.Vector.magnitude(v);
v = Matter.Vector.normalize(v);
```

`Matter.Vector ` defines the namespace of the source code.
* p5.js is unusual for not consistently defining namespaces (ex: `circle()` instead of `p5.circle()`).

#### Object Destructuring
Technique for extracting properties from an object and assigning them to variables. 
* The `Matter` object contains the `Engine` property.
* an alias for this property can be set with `let Engine = Matter.Engine`, but destructuring can be done as `const { Engine } = Matter`.
    * using `const` to protect myself from overwriting it later.
    * `const {Engine, Vector = Matter}` -> sets up `Engine` as an alias for `Matter.Engine`, and `Vector` as an alias for `Matter.Vector` in one statement.

**Factory method**: function that creates an object
* ex: `createVector()`

#### Constraints
Managed through the `Constraint` class and `MouseConstraint` class.
**Distance constraint**: connection of fixed length between two bodies.
* the constraint is attached to each body at a specific anchor, a point relative to the body's center.

**Revolute joint**: connects two bodies at a common anchor point (hinge).