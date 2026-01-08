/*

    Simple harmonic motion = back and forth oscillation around a central point
        - amplitude = distance from the center of motion to either extreme
        - period = duration for one complete cycle of motion
    
    Amplitude can be measured in pixels -> oscillate around the center of the canvas 
    For period, frames can be used as a unit of time for p5.js

    let x = amplitude * sin(TWO_PI * frameCount / period);

    The output of the sine function oscilliates between -1 and 1. Multiplying it by a chosen value gives the desired result.
    frameCount / period gives the number of cycles that have been completed; multiplying by TWO_PI is need for one whole cycle.

*/

function setup() {
    createCanvas(800, 400);
}

function draw() {
    background(255);

    let period = 120;
    let amplitude = 200;
    // calculate the horizontal position according to the formula for simple harmonic motion
    let x = amplitude * sin(TWO_PI * frameCount / period);

    stroke(0);
    fill(127);
    translate(width / 2, height / 2);
    line(0, 0, x, 0);
    circle(x, 0, 48);
}