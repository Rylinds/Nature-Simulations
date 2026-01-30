An autonomous agent is an entity that majes its own choices about how to act in its environment, without any influence from a leader or global plan.
* for this project, *acting* can be seen just as moving

Key components
* **an autonomous agent has a limited ability to perceive its environment**
* **an autonomous agent processes the information from its environment and calculates an action**
* **an autonomous agent has no leader** 

Valentino Braitenburg (*Vehicles: Experiments in Synthetic Psychology*)
* Craig Reynolds took inspriation from him to create algorithmic steering behaviors

His vehicles have three layers:
1. Action selection: a vehicle has a goal and can choose an action based on that goal
2. Steering: once an action has been selected, the vehicle has to calculate its next move. The next move will be a (steering) force
3. Locomotion: this isn't too relevant right now, given that movement across the canvas is more of an illusion anyways

## Steering Force
The vehicle's goal and subsequent action is to seek the target. Rather than use some grvaitation pull, I want the vehicle to make the *decision* to steer towards the target based on its perception of its own state and environment.
* steering force = desired velocity - current velocity

```
    let steer = p5.Vector.sub(desirbed, velocity)
    let desired = p5.Vector.sub(target, position)
```

The desired vector should point from the vehicle's current position to the target position, with a magnitude equal to the maximum speed of the vehicle.

In the case of gravitational attraction, the force pulling an object toward another is the same regardless of how that object it moving. Here, the vehicle is active aware of its own velocity, and it steering force will compensate accordingly.

## Wandering Behavior
Reynolds: *wandering is a type of random steering which has some long-term order: the steering direction on one frame is related to the steering direction on the next frame. This produces more interesting motion tha, for example, simply generating a random steering direction each frame.*

First the vehicle predicts its future position as a fixed distance in front of it. Then it draws a circle with radius r cantered on that position and picks a random point along the circumference of the circle. That point, which moves randomly around the circle for each frame of animation, is the vehicle's target (so its desired velocity points in that direction).

## Flow Fields
Flow fields?
* the canvas is a grid. In each cell of the grid is an arrow pointing in a certain direction (vector). As the vehicle moves around the canvas, the arrow of a given cell becomes the desired velocity.

## Complex Systems
Qualities
* Simple units have short-range relationships
* Simple units operate in parallel
* Systems as a whole exhibit emergent phenomena
* Nonlinearity
* Competition and cooperation
* Feedback

### Flocking
Simulating animal flocking behavior can work like:
* use a steering force formula to implement the rules of flocking
* the steering forces will be group behaviors and will require each vehicle to perceive the others
* combine and weight multiple forces
* the result will be a complex system -> intelligent group behavior will emerge without a group leader

3 rules to govern flocking:
1. Separation (avoidance)
2. Alignment (copy)
3. Cohersion (center)