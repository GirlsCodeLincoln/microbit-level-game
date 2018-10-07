
basic.forever(() => {

    // Read the accelerometer for pitch and roll
    let pitch = input.rotation(Rotation.Pitch);
    let roll = input.rotation(Rotation.Roll);

    // Set sensitivity
    let sensitivity = 10;

    // Convert degrees into something the display can use
    let xLoc = 2 + (roll / sensitivity);
    let yLoc = 2 + (pitch / sensitivity);

    // Clear the screen and plot the new point
    basic.clearScreen();
    led.plot(xLoc, yLoc);

})
