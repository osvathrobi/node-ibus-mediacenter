var Log = require('log'),
    log = new Log('info'),
    clc = require('cli-color');

var PibusHw4Handler = require('./PibusHw4Handler.js')
var IbusInterface = require('ibus').IbusInterface;
var IbusDevices = require('ibus').IbusDevices;
var MK4ToMk3CDTextDevice = require('./MK4ToMk3CDTextDevice.js');
var GraphicsNavigationOutputDevice = require('./GraphicsNavigationOutputDevice.js');
var IbusDebugger = require('./IbusDebugger.js');

var MpdClient = require('./MpdClient.js');
var XbmcClient = require('./XbmcClient.js');
var KeyboardClient = require('./KeyboardClient.js');
var IbusEventClient = require('./IbusEventClient.js');

// config
//var device = '/dev/ttys003';
var device = '/dev/ttyAMA0';
//var device = '/dev/cu.usbserial-A601HPGR';

// IBUS communication interface
var ibusInterface = new IbusInterface(device);

// Mpd Client
//var mpc = new MpdClient();

// Xbmc Client
var xbmcc = new XbmcClient();

// Keyboard Client
var keyboardClient = new KeyboardClient(xbmcc);

// Ibus Event Client
var ibusEventClient = new IbusEventClient(ibusInterface, xbmcc);

// Ibus debugger
var ibusDebugger = new IbusDebugger(ibusInterface, ['F0']);

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

function onUncaughtException(err) {
    log.error(err);

    // restart app
    setTimeout(function() {
        log.info('Restarting app in 5 seconds...');
        restartApp();
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