
basic.forever(() => {

    // Button A is simple LED activation
    if (input.buttonIsPressed(Button.A) === true) {
        led.plot(0, 0);
    }

    // Button B
    if (input.buttonIsPressed(Button.B) === true) {
        // Pressing will activate the LED
        led.plot(4, 0);
    } else {
        // Releasing will turn the LED off
        led.unplot(4, 0);
    }

})
