const { Engine, Bodies, Composite, Body, Vector, Render } = Matter;

// simple demo of cube getting plonked into the world... so much less work than in p5.js
function setup() {
    let canvas = createCanvas(800, 400);

    let engine = Engine.create();
    let render = Render.create({
        canvas: canvas.elt, engine,
        options: { width: width, height: height }
    });

    Render.run(render);

    let options = { friction: 0.01, restitution: 0.75 };
    let box = Bodies.rectangle(100, 100, 50, 50, options);

    Body.setVelocity(box, Vector.create(5, 0));
    Body.setAngularVelocity(box, 0.1);
    Composite.add(engine.world, box);

    let ground = Bodies.rectangle(width / 2, height - 5, width, 10, { isStatic: true });
    Composite.add(engine.world, ground);

    let runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
}