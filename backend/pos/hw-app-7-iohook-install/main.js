'use strict'

// Import parts of electron to use
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Keep a reference for dev mode
let dev = false

if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
  dev = true
}

// Temporary fix broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === 'win32') {
  app.commandLine.appendSwitch('high-dpi-support', 'true')
  app.commandLine.appendSwitch('force-device-scale-factor', '1')
}


var staffWindowsCnt = 2;
var staffWindowsArr = [];
function createStaffWindow (cnt) {
  for(var i=0; i<cnt; i++){
    staffWindowsArr[i] = new BrowserWindow({title: "S Win " + i , width: 800, height: 600});
    staffWindowsArr[i].loadURL(`file://${__dirname}/public/windows/window1.html`);
    staffWindowsArr[i].webContents.openDevTools();
    staffWindowsArr[i].on('closed', function () {
      staffWindowsArr[i] = null;
    });
  }
  return staffWindowsArr;
}

var customerWindowCnt = 2;
var customerWindowsArr = [];
function createCustomerWindow (cnt) {
  for(var i=0; i<cnt; i++){
    customerWindowsArr[i] = new BrowserWindow({title: "C Win " + i , width: 1000, height: 600});  
    customerWindowsArr[i].loadURL(`file://${__dirname}/public/windows/window2.html`);
    customerWindowsArr[i].webContents.openDevTools();
    customerWindowsArr[i].on('closed', function () {
      customerWindowsArr[i] = null;
    });
  }
  return customerWindowsArr;
}

function customerBroadcast (message) {
  for (var i = 0; i < customerWindowsArr.length; i++) {
    customerWindowsArr[i].webContents.send("broadcastMsg", message);
  }
}

app.on('ready', () => {
  staffWindowsArr = createStaffWindow(staffWindowsCnt);
  customerWindowsArr = createCustomerWindow(customerWindowCnt);

  //MsgEvtHdl
  ipcMain.on('nameMsg', (event, arg) => { 
    console.log("name inside main process is: ", arg); // this comes form within S W # -> and into the mainProcess
    event.sender.send('nameReply', { not_right: false }) // sends back/replies to S W # - "event" is a reference to this chanel.

    customerBroadcast(arg);
  });
});


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})