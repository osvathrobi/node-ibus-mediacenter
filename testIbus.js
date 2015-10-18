var IbusInterface = require('ibus').IbusInterface;
var IbusDevices = require('ibus').IbusDevices;
var MK4To3TextBridgeDevice = require('./MK4To3TextBridgeDevice.js');
var GraphicsNavigationOutputDevice = require('./GraphicsNavigationOutputDevice.js');

// config
//var device = '/dev/ttys002';
var device = '/dev/cu.usbserial-A601HPGR';

// data
var ibusInterface = new IbusInterface(device);
var navOutput = new GraphicsNavigationOutputDevice(ibusInterface);
var mkTextBridge = new MK4To3TextBridgeDevice(ibusInterface, navOutput);

// events
//process.on('SIGINT', onSignalInt);
ibusInterface.on('data', onIbusData);

// implementation
function onSignalInt() {
    ibusInterface.shutdown(function() {
        process.exit();
    });
}

function onIbusData(data) {
    //printReadableMessage(data);
}

function printReadableMessage(data) {
    if ((data.dst === '3b') /* && (data.src === '68')*/ ) {
        var msg = '';
        for (var i = 0; i < data.msg.length; i++) {
            msg += ', 0x' + ((data.msg[i] < 0x10) ? '0' : '') + data.msg[i].toString(16);
        }

        console.log('// ' + data.msg.toString('ascii'));
        console.log('ibusInterface.sendMessage({src: 0x' + data.src + ',dst: 0x' + data.dst + ', msg: new Buffer([' + msg.substr(2), '])});');
    }
}

// main start

ibusInterface.startup();

var i = 0;


setInterval(function() {
    /*
    navOutput.setTitle("Title Robi" + i);

    navOutput.setZone(0, "0Robi0" + i);
    navOutput.setZone(1, "1Robi1" + i);
    navOutput.setZone(2, "2Robi2" + i);
    navOutput.setZone(3, "3Robi3" + i);
    navOutput.setZone(4, "4Robi4" + i);
    navOutput.setZone(5, "5Robi5" + i);
    navOutput.setZone(6, "6Robi6" + i);
    navOutput.refreshTop();

    navOutput.setOption(0, "0Robi" + i);
    navOutput.setOption(1, "1Robi" + i);
    navOutput.setOption(2, "2Robi" + i);
    navOutput.setOption(3, "3Robi" + i);
    navOutput.setOption(4, "4Robi" + i);
    navOutput.setOption(5, "5Robi" + i);
    navOutput.setOption(6, "6Robi" + i);
    navOutput.setOption(7, "7Robi" + i);
    navOutput.setOption(8, "8Robi" + i);
    navOutput.setOption(9, "9Robi" + i);
    navOutput.refreshOptions();
    */


    i++;

}, 2000);