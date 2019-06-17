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

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    show: false
  })

  // and load the index.html of the app.
  let indexPath

  // Implementing Webpack
  if (dev && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true
    })
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true
    })
  }

  mainWindow.loadURL(indexPath)

  // Don't show until we are ready and loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()

    // Open the DevTools automatically if developing
    if (dev) {
      mainWindow.webContents.openDevTools()
    }
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

function createWindow1 () {
  var window1 = new BrowserWindow({width: 800,height: 600});

  // window1.loadURL('http://localhost:3000/StaffSide');
   window1.loadURL(`file://${__dirname}/public/windows/window1.html`);
  window1.webContents.openDevTools();
  window1.on('closed', function () {
     window1 = null;
  });
  return window1;
}

function createWindow2 () {
  var window2 = new BrowserWindow({width: 1000, height: 600});
  
  // window2.loadURL('http://localhost:3000/CustomerSide');
  window2.loadURL(`file://${__dirname}/public/windows/window2.html`);
  window2.webContents.openDevTools();
  window2.on('closed', function () {
    window2 = null;
  });
  return window2;
}

app.on('ready', () => {
  var window1 = createWindow1();
  var window2 = createWindow2();

  ipcMain.on('nameMsg', (event, arg) => {
    console.log("name inside main process is: ", arg); // this comes form within window 1 -> and into the mainProcess
    event.sender.send('nameReply', { not_right: false }) // sends back/replies to window 1 - "event" is a reference to this chanel.
    window2.webContents.send( 'forWin2', arg ); // sends the stuff from Window1 to Window2.
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