var Log = require('log'),
    log = new Log('info'),
    clc = require('cli-color');

var PibusHw4Handler = require('./adapters/PibusHw4Handler.js')
var IbusInterface = require('ibus').IbusInterface;
var IbusDevices = require('ibus').IbusDevices;
var MK4ToMk3CDTextDevice = require('./devices/MK4ToMk3CDTextDevice.js');
var GraphicsNavigationOutputDevice = require('./devices/GraphicsNavigationOutputDevice.js');
var IbusDebugger = require('./listeners/IbusDebuggerListener.js');

var MpdClient = require('./clients/MpdClient.js');
var XbmcClient = require('./clients/XbmcClient.js');
var KeyboardClient = require('./listeners/KeyboardEventListener.js');
var IbusEventClient = require('./listeners/IbusEventListener.js');

// config
//var device = '/dev/ttys003';
//var device = '/dev/ttyAMA0';
var device = '/dev/cu.usbserial-A601HPGR';


// Mpd Client
//var mpc = new MpdClient();

// Xbmc Client
var xbmcc = new XbmcClient();

// IBUS communication interface
var ibusInterface = new IbusInterface(device);

// Ibus Event Client
var ibusEventClient = new IbusEventClient(ibusInterface, xbmcc);

// Ibus debugger
var ibusDebugger = new IbusDebugger(ibusInterface, []);


// Keyboard Client
var keyboardClient = new KeyboardClient(xbmcc, ibusDebugger);

// Graphics Navidagtion Device pirate
var navOutput = new GraphicsNavigationOutputDevice(ibusInterface);

// Display Mk4 CD-text as Mk3 Options
var mkTextBridge = new MK4ToMk3CDTextDevice(ibusInterface, navOutput);

// events
process.on('SIGINT', onSignalInt);
process.on('uncaughtException', onUncaughtException);

// implementation
function onSignalInt() {
    shutdown(function() {
        process.exit();
    });
}

var isShuttingDown = false;

function onUncaughtException(err) {

    log.error(err);

    if (isShuttingDown) {
        return;
    }

    log.info('Restarting app in 5 seconds...');

    isShuttingDown = true;

    // restart app
    setTimeout(function() {
        restartApp();
        isShuttingDown = false;
    }, 5000);
}

function restartApp() {
    shutdown(function() {
        startup();
    })
}

function startup(successFn) {
    ibusInterface.startup(function() {
        if (successFn) {
            successFn();
        }
    });
}

function shutdown(successFn) {
    ibusInterface.shutdown(function() {
        if (successFn) {
            successFn();
        }
    });
}

// main start
startup();