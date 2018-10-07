# Summary

This is a basic example of a micro:bit game which uses the 3-axis accelerometer to detect board tilt. Utilizing the LED matrix the tilt is represented by lighting an LED offset from the center by the magnitude of the tilt.

The javascript files in this package have been broken out into steps files which can be utilized as logical progression steps when working through this example with a class.

# Technical Items

## Hardware Items

The hardware items listed below are not a comprehensive list of support items on the PCB, but rather those used in this example. For a list of all harware items please visit: https://tech.microbit.org/hardware/

### Hardware Buttons

The board contains two hardware push buttons, Button A and Button B, on the back side of the PCB located on either side of the LED Matrix. Button presses will be triggered as Hardware Interrupts (HWIs) so care should be given to perform as little work within these callbacks as possible. In an ideal scenario a flag should be set and the callback should return immediately, allowing the main processing loop to observe and react to the event flag.

The status of the buttons can also be read within the `basic.forever()` event loop by using `input.buttonIsPressed(Button.A)` which returns a boolean value.

### LED Matrix (Display)

On the back side of the PCB is a 5x5 LED matrix used for ouput to the user. These LEDs can be lit individually and light intensity can be varied. The micro:bit api includes helper methods to print scrolling ASCII characters, numbers, and predefined or custom created pixel images.

### 3-Axis Accelerometer

The PCB also contains a 3-axis accelerometer which can detect movement in the X, Y, and Z directions. Within the API these are translated (roughly) into roll, pitch, and freefall.

## Software IDE

The micro:bit project provides a web based tool for coding and compiling the hex file needed to flash the hardware. The tool can be found at: https://makecode.microbit.org/#

The resultant `.hex` file produced by this tool must be copied to the micro:bit as if the file was being copied to a USB jump drive. On windows this is accomplished by opening Windows File Explorer, locating the `.hex` file, and dragging it to the micro:bit drive.

## Software API

The API reference docs can be found at: https://makecode.microbit.org/reference.

Unfortunately these docs default to the block representation, but under each block example is a "show code" button which will reveal the associated Javascript version.

# Source Code Steps

## Step 1 - Empty Skeleton

This is the basic step and the one which is most likely presented in the IDE upon loading a new project. The `basic.forever()` event handler is continually called during the exectuion of the program. It can be treated as the main execution thread.

```javascript
  basic.forever(() => {
    // Do something here
  });
```

## Step 2 - Basic GPIO manipulation of LEDs

```javascript
  // Upper Left LED
  led.plot(0, 0);

  // Middle LED
  led.plot(2, 2);

  // Just below and to the right of middle LED
  led.plot(3, 3);
```

## Step 3 - Basic GPIO manupilation of Buttons

This example can also be extended to use `led.toggle(x, y)` instead.

```javascript
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
```

While presenting this step many of the students wanted to know the correct way to use the `AB` combination. In many cases the issue came down to them using `if A...if B...if AB` instead of `else if` such as the following:

```javascript
  if (input.buttonIsPressed(Button.AB) === true) {

  } else if (input.buttonIsPressed(Button.A) === true) {

  } else if (input.buttonIsPressed(Button.B) === true) {

  }
```

## Step 4 - Accelerometer input

```javascript
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
```

## Step 5 - Convert degrees into something usable on the Display

In order to display the pitch and roll continuously on the LED matrix the degrees (-90 through 90) need to be mapped to a value between 0 and 5 with 0 pitch and 0 roll being equal to (2,2) on the matrix.

```javascript
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
```
