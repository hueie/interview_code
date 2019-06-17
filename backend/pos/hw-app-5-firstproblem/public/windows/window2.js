const { ipcRenderer } = window.require("electron")
//const ipcRenderer = electron.ipcRenderer;

var showName = document.getElementById('showName')
ipcRenderer.on('forWin2', function (event, arg){
  console.log(arg);
  showName.innerHTML = arg;
});
console.log("I'm Window2");