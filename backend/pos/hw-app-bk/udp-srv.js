/* node udp-srv.js */
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