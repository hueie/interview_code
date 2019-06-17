const { ipcRenderer } = window.require("electron");
const ioHook = window.require("iohook");

let name = document.getElementById('name');

var ButtonSendName = document.getElementById('sendName');
if(ButtonSendName){
  ButtonSendName.addEventListener('click', (event) => {
    ipcRenderer.send('nameMsg', name.value);
  })
}
ipcRenderer.on('nameReply', (event, arg) => {
  console.log(arg) // why/what is not right..
});


ioHook.on("keyup", event => {
  console.log(event); // {keychar: 'f', keycode: 19, rawcode: 15, type: 'keup'}
});

ioHook.start();

