A particle system is a collection of many minute particles that together represent a fuzzy object. Over a period of time, particles are generated into a system, move and change from within the system, and die from the system.

I need to accomodate flexible quantities of elements - some may have zero things, sometimes one thing, sometimes ten things, and sometimes ten thousand things. A class needs to be created to accomodate for all these things -- see `particle.js`

Some particle systems involve an emitter that serves as the source of the particles.
- controls the initial settings for the particles: position, velocity, and more
- helps me clean up `draw()` but removing the logic of looping through particles
- I could now have multiple emitters

A `lifespan` variable can act like a timer for when a particle needs to be removed.