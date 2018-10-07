
basic.forever(() => {

    // Read the accelerometer for pitch and roll
    let pitch = input.rotation(Rotation.Pitch);
    let roll = input.rotation(Rotation.Roll);

    // Button A prints the Pitch to the Display
    if (input.buttonIsPressed(Button.A) === true) {
        basic.showNumber(pitch);
    }

    // Button B prints the Pitch to the Display
    if (input.buttonIsPressed(Button.B) === true) {
        basic.showNumber(roll);
    }

})
