//********************************
//******* Setup variables ********
//********************************

// Accelerometer readings 
let roll = 0;
let pitch = 0;

// Game Sprite and Coordinates for sprite
let Xloc = 2;
let Yloc = 2;
let spritepoint = game.createSprite(Xloc, Yloc);

// Difficulty tracking
let difficulty = 5;
let newDifficulty = 5;

// Flags for event detection
let shakeDetected = false;

//********************************
//******* Main Event Loop ********
//********************************
basic.forever(() => {
    // Look for and process gesture flag
    if (shakeDetected) {
        game.addScore(1);
        shakeDetected = false;
    }

    // Detect difficulty change and display number
    if (newDifficulty != difficulty) {
        difficulty = newDifficulty;
        basic.showNumber(difficulty, 100);
    }

    // Read Accelerometer as a rolling average to smooth the results
    pitch = (input.rotation(Rotation.Pitch) + pitch) / 2;
    roll = (input.rotation(Rotation.Roll) + roll) / 2;

    // Calculate new sprite location
    let newXloc = 2 + (roll / difficulty);
    let newYloc = 2 + (pitch / difficulty);

    // Only assign new location if different than last
    // this helps reduce stuttering of the LED
    if (newXloc != Xloc) {
        Xloc = newXloc;
        spritepoint.setX(Xloc);
    }

    if (newYloc != Yloc) {
        Yloc = newYloc;
        spritepoint.setY(Yloc);
    }

})

//******************************** 
//**** Event Handler Callbacks ***
//********************************

// Button A - Event Handler
input.onButtonPressed(Button.A, () => {
    if (newDifficulty++ >= 9) {
        newDifficulty = 9;
    }
})

// Button B - Event Handler
input.onButtonPressed(Button.B, () => {
    if (newDifficulty-- <= 1) {
        newDifficulty = 1;
    }
})

// Gesture Shake - Event Handler
input.onGesture(Gesture.Shake, () => {
    // Set flag and return to move processing to main event loop
    shakeDetected = true;
})
