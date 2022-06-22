const Protocol = require('azure-iot-device-http').Http;
// const Client = require('azure-iot-device-http').clientFromConnectionString;
const Client = require('azure-iot-device').Client;
const Message = require('azure-iot-device').Message;
// const connectionString = process.env.DEVICE_CONNECTION_STRING;
const connectionString = "HostName=xelaaziothub.azure-devices.net;DeviceId=myPhone;SharedAccessKey=c5I3hBNgT2JLQVTj9BuVmOzoTXu6+lOJKihc0NwO1ic=";
let client = Client.fromConnectionString(connectionString, Protocol);
// var client = clientFromConnectionString(connectionString);
var fire = false;
var direc = 0;
var left = document.querySelector('.left');
var right = document.querySelector('.right');
var info = document.getElementById('info');

function handleOrientation(event) {
    var r = event.absolute; // Boolean rotation data [true,false]
    var x = event.beta;  // Rotation around the x axis (left to right) [-180,180]
    var y = event.gamma; // Rotation around the y axis (top to down) [-90,90]
    var z = event.alpha; // Rotation around the z axis (rotate?) [0,360]

    info.textContent = `beta : ${x}\n`;

    console.log("getting into function?")

    if (x < -5) {
        right.style.background = "rgba(0,47,57,1)";
        direc = 2;
        sendMessage();
    } else if (x > 5) {
        left.style.background = "rgba(65,0,0,1)";
        direc = 1;
        sendMessage();
    }
    else if (x >= -5 && x <= 5) {
        left.style.background = "rgba(117, 0, 0, 1)";
        right.style.background = "rgba(0, 91, 110, 1)";
        direc = 0;
    }
}

function sendMessage() {
    // direction: none (0), left(1), right(2)
    // fire: boolean
    const data = JSON.stringify({ direction: direc, fire: fire });
    const message = new Message(data);
    client.sendEvent(message);
    fire = false;
}

function shoot() {
    console.log("shoot");
    fire = true;
    sendMessage();
}

document.getElementById('middle').addEventListener('click', event => shoot());

window.addEventListener('deviceorientation', handleOrientation);