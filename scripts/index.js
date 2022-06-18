const Protocol = require('azure-iot-device-http').Http;
// const Client = require('azure-iot-device').Client;
// const Message = require('azure-iot-device').Message;
// const deviceConnectionString = process.env.IOTHUB_DEVICE_CONNECTION_STRING;

var output = document.querySelector('.output');
var left = document.querySelector('.left');
var right = document.querySelector('.right');
var output = document.querySelector('.info');

function handleOrientation(event) {
    var r = event.absolute; // Boolean rotation data [true,false]
    var x = event.beta;  // Rotation around the x axis (left to right) [-180,180]
    var y = event.gamma; // Rotation around the y axis (top to down) [-90,90]
    var z = event.alpha; // Rotation around the z axis (rotate?) [0,360]

    output.textContent = `beta : ${x}\n`;
    // output.textContent += `gamma: ${y}\n`;

    console.log("getting into function?")

    if (x < -5) {
        document.getElementById("right").style.background = "rgba(0,47,57,1)";
    } else if (x > 5) {
        document.getElementById("left").style.background = "rgba(65,0,0,1)";
    }
    else if (x >= -5 && x <= 5) {
        document.getElementById("left").style.background = "rgba(117, 0, 0, 1)";
        document.getElementById("right").style.background = "rgba(0, 91, 110, 1)";
    }

    // Because we don't want to have the device upside down
    // We constrain the x value to the range [-90,90]
    if (x > 90) { x = 90 };
    if (x < -90) { x = -90 };

    // To make computation easier we shift the range of
    // x and y to [0,180]
    x += 90;
    y += 90;
}

// function generateMessage() {
//     const data = JSON.stringify({ deviceId: 'myPhone', movement: 'z', input: 'x' });
//     const message = new Message(data);
//     return message;
// }

window.addEventListener('deviceorientation', handleOrientation);