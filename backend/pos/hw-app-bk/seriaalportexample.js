var serialport = require('serialport');
var usb = require('usb')
var sf = require('sf');
var usbDetect = require('usb-detection');
const drivelist = require('drivelist');
var checkUSBintervalID;

/*
serialport.list(function (err, ports) {
  if (err) { throw err; }
  for (var i = 0; i < ports.length; i++) {
    var port = ports[i];
    console.log(port);
  }
});
console.log("next");
var usblist = usb.getDeviceList(function (err, usbs) {
  if (err) { throw err; }
  for (var i = 0; i < usbs.length; i++) {
    var usb = usbs[i];
    console.log(usb);
  }
});
console.log(usblist);
*/

// This is the listener function for the 'add' event
function addUSBhandler() {
    console.log('added event listener for usb ADD');

    // Start interval to check if the USB is mounted
    checkUSBintervalID = setInterval(function() {
        drivelist.list(function(error, drives) {
            console.log('listening for USB mount...');
            if (error) { throw error; }

            // iterate through all drives
            for(var d = 0; d < drives.length; d++) {

                // if the drive is a removable usb
                if(drives[d].system == false) { 

                    // if this drive is mounted
                    if(drives[d].mountpoints.length > 0) {
                        console.log('found removable USB');
                        // the drive is mounted
                        // do stuff here
                        // the path is at drives[d].mountpoints[0].path
                        clearInterval(checkUSBintervalID);
                    }
                }
            }
        });
    }, 1000);
}

usbDetect.on('add', addUSBhandler);

