var IbusInterface = require('ibus').IbusInterface;
var IbusDevices = require('ibus').IbusDevices;
var MK4ToMk3CDTextDevice = require('./MK4ToMk3CDTextDevice.js');
var GraphicsNavigationOutputDevice = require('./GraphicsNavigationOutputDevice.js');
var IbusDebugger = require('./IbusDebugger.js');

// config
var device = '/dev/ttys003';
//var device = '/dev/cu.usbserial-A601HPGR';

// data

// IBUS communication interface
var ibusInterface = new IbusInterface(device);

// Ibus debugger
var ibusDebugger = new IbusDebugger(ibusInterface, ['3b']);

// Graphics Navidagtion Device pirate
var navOutput = new GraphicsNavigationOutputDevice(ibusInterface);

// Display Mk4 CD-text as Mk3 Options
var mkTextBridge = new MK4ToMk3CDTextDevice(ibusInterface, navOutput);

// events
process.on('SIGINT', onSignalInt);

// implementation
function onSignalInt() {
    ibusInterface.shutdown(function() {
        process.exit();
    });
}

// main start
ibusInterface.startup();
