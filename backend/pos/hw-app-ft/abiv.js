const nodeAbi = require('node-abi')

console.log("node:"+nodeAbi.getAbi('10.15.0', 'node'));
console.log("electron:"+nodeAbi.getAbi('5.0.1', 'electron'));
console.log("electron:"+nodeAbi.getAbi('1.8.6', 'electron'));
//