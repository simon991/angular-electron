const { app, BrowserWindow } = require('electron');
var os = require('os');
//import { SocketServer } from "./socket-server";
const Server = require('socket.io');
const io = new Server(8080);
let win;


function getIp(window) {
  var interfaces = os.networkInterfaces();
  var addresses = [];
  for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
      var address = interfaces[k][k2];
      if (address.family === 'IPv4' && !address.internal) {
        addresses.push(address.address);
      }
    }
  }
  console.log(addresses);

  /* render a window to show the ip address*/
  window = new BrowserWindow({
    /*  webPreferences: {
     webSecurity: false
     },*/
    width: 600,
    height: 600,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`
  });

  // create BrowserWindow with dynamic HTML content
  var html = [
    "<body>",
    '<h1>' + addresses + '</h1>',
    "</body>",
  ].join("");
  window.loadURL("data:text/html;charset=utf-8," + encodeURI(html));


  //// uncomment below to open the DevTools.
  window.webContents.openDevTools();

  // Event when the window is closed.
  window.on('closed', function () {
    window = null;
  });

}


function createWindow () {

  getIp();

  // Create the browser window.
  win = new BrowserWindow({
  /*  webPreferences: {
      webSecurity: false
    },*/
    width: 600,
    height: 600,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`
  })


  win.loadURL(`file://${__dirname}/dist/index.html`)


  //// uncomment below to open the DevTools.
  win.webContents.openDevTools()

  // Event when the window is closed.
  win.on('closed', function () {
    win = null;
  })




}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})
