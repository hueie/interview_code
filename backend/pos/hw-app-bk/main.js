var express = require('express');
var router = express.Router();
var cors = require('cors');
var serialport = require('serialport');


//********************* UDP SERVER ********************//

var dgram = require('dgram');
const process = require("process");
var BROADCAST_ADDR = "192.168.43.255";
//var BROADCAST_ADDR = "192.168.0.255";

var PORT = 8089;
var server = dgram.createSocket("udp4");

server.on("message", function(message, rinfo) {
    console.info(`Message from: ${rinfo.address}:${rinfo.port} - ${message}`);
});

server.on('listening', function () {
    server.setBroadcast(true);
    //    server.addMembership(BROADCAST_ADDR);
    setInterval(sendMessage, 2500);
    var address = server.address(); 
    console.log('UDP Server started and listening on ' + address.address + ":" + address.port);
});

function sendMessage(contents) {
    if(contents != null){
        var message = Buffer.from(contents);
        server.send(message, 0, message.length, PORT, BROADCAST_ADDR, function() {
          console.info(`Sending message "${message}"`);
        });
    }
}
  
server.bind();

//********************* UDP SERVER ********************//



//********************* USB DETECT ********************//

var usb = require('usb');
var usbDetect = require('usb-detection');
// usbDetect.startMonitoring();
// // Detect add/insert
// usbDetect.on('add', function (device) { console.log('add', device); });
// // Detect remove
// usbDetect.on('remove', function (device) { console.log('remove', device); });
// // Detect add or remove (change)
// //usbDetect.on('change', function(device) { console.log('change', device); });
// usbDetect.find(function(err, devices) { console.log('find', devices, err); });
// usbDetect.find().then(function (devices) { console.log("usbDetect.find"); console.log(devices); }).catch(function (err) { console.log(err); });
/*
serialport.list(function (err, ports) {
    if (err) { throw err; }
    for (var i = 0; i < ports.length; i++) {
        var port = ports[i];
        console.log(port);
    }
});
*/
console.log("next usblist");
var usblist = usb.getDeviceList(function (err, usbs) {
    if (err) { throw err; }
    for (var i = 0; i < usbs.length; i++) {
        var usb = usbs[i];
        console.log(usb);
    }
});
console.log("##############usblist###############")
for(var i=0; i<usblist.length; i++){
    console.log("Device["+i+"]")
    console.log(usblist[i].deviceDescriptor.idVendor);
    console.log(usblist[i].deviceDescriptor.idProduct);
}
// console.log(usblist);
console.log("##############usblist###############")


/// USB DETECT

console.log("##############device###############")
device = usb.findByIds(5426, 70);
console.log(device);
console.log("##############device###############")

device.open();

var deviceInterface = device.interfaces[0],
    descriptor = deviceInterface.descriptor;
    endpoints = deviceInterface.endpoints,
    inEndpoint = endpoints[0],
    outEndpoint = endpoints[1];
console.log(descriptor.bInterfaceProtocol); // 1: keyboard, 2: mouse
console.log("##############endpoint###############")
//console.log(inEndpoint)

console.log("##############endpoint###############")
// inEndpoint.transferType = 2;
// console.log(inEndpoint)
/*
let driverAttached = false
if (deviceInterface.isKernelDriverActive()) {
   driverAttached = true
   deviceInterface.detachKernelDriver()
}
deviceInterface.claim()
inEndpoint.startPoll(1, 8);

var id = "", chunk;

var Buffers = require('buffers');
var bufs = Buffers();
if(inEndpoint != undefined){
    inEndpoint.on('data', function (data) {
        console.log("**********")
        console.log(data.toString('utf8'))
        sendMessage("**********");
        sendMessage(data.toString('utf8'));
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
    });
    
    outEndpoint.on('error', function (error) {
        console.log(error);
    });    
}
*/
/* close
deviceInterface.release(() => {
    if (driverAttached) {
       deviceInterface.attachKernelDriver()
    }
    device.close()
})
*/



/*
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
*/

