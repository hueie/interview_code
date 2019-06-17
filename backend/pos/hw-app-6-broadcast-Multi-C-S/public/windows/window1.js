const { ipcRenderer } = window.require("electron")
//const ipcRenderer = electron.ipcRenderer;

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
