var express = require('express');
var router = express.Router();
var cors = require('cors');
var SerialPort = require('serialport');
var usb = require('usb');
var usbDetect = require('usb-detection');
usbDetect.startMonitoring();
// Detect add/insert
usbDetect.on('add', function (device) { console.log('add', device); });
// Detect remove
usbDetect.on('remove', function (device) { console.log('remove', device); });
// Detect add or remove (change)
//usbDetect.on('change', function(device) { console.log('change', device); });
usbDetect.find(function(err, devices) { console.log("usbDetect.find"); console.log('find', devices, err); });
//usbDetect.find().then(function (devices) { console.log("usbDetect.find"); console.log(devices); }).catch(function (err) { console.log(err); });

/// USB DETECT


console.log("##############device###############")
//Razer Mouse
//device = usb.findByIds(5426, 70);
//Wired Keyboard
device = usb.findByIds(1118, 1872);
console.log(device);
console.log("##############device###############")

device.open();

var deviceInterface = device.interfaces[0],
    endpoints = device.interfaces[0].endpoints,
    inEndpoint = endpoints[0],
    outEndpoint = endpoints[1];

console.log("##############endpoint###############")
console.log(endpoints)
console.log("##############endpoint###############")
// inEndpoint.transferType = 2;
// console.log(inEndpoint)

let driverAttached = false
if (deviceInterface.isKernelDriverActive()) {
   driverAttached = true
   deviceInterface.detachKernelDriver()
}
deviceInterface.claim()
inEndpoint.startPoll(1, 8);

var id = "", chunk;
var testCount = 0;
var Buffers = require('buffers');
var bufs = Buffers();
if(inEndpoint != undefined){
    inEndpoint.on('data', function (data) {
        console.log("**********")
        console.log(data)
        testCount++;
        if( testCount == 10){
            deviceInterface.release(() => {
                if (driverAttached) {
                   deviceInterface.attachKernelDriver()
                }
                //device.close()
            })
        }
    });
    inEndpoint.on('error', function (error) {
        console.log("on error", error);
    });
    
    inEndpoint.on('end', function () {
        console.log("on end");
    });    
}
if(outEndpoint != undefined){
    outEndpoint.on("data", function (data) {
        console.log(data)
        console.log("-->", bufferOne.toString('utf8'))
        testCount++;
        if( testCount == 10){
            deviceInterface.release(() => {
                if (driverAttached) {
                   deviceInterface.attachKernelDriver()
                }
                device.close()
            })
        }
    });
    
    outEndpoint.on('error', function (error) {
        console.log(error);
    });    
}

/*

*/

router.use(cors());

console.log('NodeJS service has started.');
const Readline = SerialPort.parsers.Readline;
var portName = 'COM7';
var isPortExists = false;
var lastresult = '';
SerialPort.list(function (err, ports) {
    ports.forEach(function (port) {
        if (port.comName == portName) {
            isPortExists = true;
            const port = new SerialPort(portName, {
                baudrate: 9600
            });
            const parser = new Readline();
            port.pipe(parser);

            var count = 0;
            parser.on('data', function (data) {
                if (++count == 10) {
                    lastresult = data;
                    count = 0;
                }
            });
            port.on('close', function () {
                console.log('1');
            });
        }
    });
});

router.get('/getScale', function (req, res) {
    let respond;
    if (isPortExists) {
        SerialPort.list(function (err, ports) {
            ports.forEach(function (port) {
                if (port.comName == portName) {
                    respond = /\d+/g.exec(lastresult)[0]
                } else {
                    respond = 'N/A';
                }
            });
            res.send(respond);
        });
    } else {
        respond = 'N/A';
        res.send(respond);
    }

});
router.get('/getPorts', function (req, res) {
    var Devices = [];
    SerialPort.list(function (err, ports) {
        ports.forEach(function (port) {
            Devices.push(port.comName + '-' + port.pnpId);
        });
        res.send(JSON.stringify(Devices));
    });
});
module.exports = router;