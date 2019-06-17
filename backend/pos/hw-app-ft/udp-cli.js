// Require node js dgram module.
var dgram = require('dgram');
var BROADCAST_ADDR = "192.168.43.255";
//var BROADCAST_ADDR = "192.168.0.255";
var PORT = 8089;
var client = dgram.createSocket("udp4");

client.on("message", function(message, rinfo) {
    console.info(`Message from: ${rinfo.address}:${rinfo.port} - ${message}`);
});

client.on('listening', function(){
    client.setBroadcast(true);
    //client.addMembership(BROADCAST_ADDR);
    var address = client.address(); 
    console.log('UDP client started and listening on ' + address.address + ":" + address.port);
});
client.bind(PORT,  "192.168.43.255");
//client.bind(8000);
var message = new Buffer("Some bytes");

// message variable is used to save user input text.
// var message = "";

// // Set command line input character encoding to utf-8.
// process.stdin.setEncoding('utf-8');

// // When receive user input data in console.
// process.stdin.on('data', function (text) {

//     // If user input 'send\n' then send all user input data to udp server.
//     if('send\n' === text) {

//         // If user do not input data in command line then send default message.
//         if (message == null || message.length == 0) {
//             message = "Hello udp server.";

//         }

//         console.log("User input : " + message);

//         // Create a node Buffer object to wrap message object.
//         message = new Buffer(message);

//         // Send message to udp server through client socket.
//         client.send(message, 0, message.length, 8089, BROADCAST_ADDR);

//     }else{
//         // Concat all user input text in message.
//         message += text;
//     }
// });