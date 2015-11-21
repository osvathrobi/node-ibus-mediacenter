var Log = require('log'),
    log = new Log('info'),
    clc = require('cli-color'),
    _ = require('underscore');

// Debug Ibus messages
var IbusDebugger = function(ibusInterface, listenDeviceIds) {

    // self reference
    var _self = this;

    // exposed data
    this.init = init;
    this.deviceName = 'Ibus Debugger';
    this.listenDeviceIds = listenDeviceIds || [];
    this.up = simulateUp;
    this.left = simulateLeft;
    this.down = simulateDown;
    this.right = simulateRight;
    this.back = simulateBack;
    this.select = simulateSelect;


    // events
    ibusInterface.on('data', onData);

    // local data

    // implementation
    function init() {

    }

    function onData(data) {
        //printReadableMessage(data);
    }

    function printReadableMessage(data) {
        if ((_self.listenDeviceIds.length === 0) || (_.find(_self.listenDeviceIds, function(val) {
            return val === data.dst;
        }))) {
            var msg = '';
            for (var i = 0; i < data.msg.length; i++) {
                msg += ', 0x' + ((data.msg[i] < 0x10) ? '0' : '') + data.msg[i].toString(16);
            }

            console.log('// ' + data.msg.toString('ascii'));
            console.log('ibusInterface.sendMessage({src: 0x' + data.src + ',dst: 0x' + data.dst + ', msg: new Buffer([' + msg.substr(2), '])});');
        }
    }


    function simulateUp() {
        ibusInterface.sendMessage({
            src: 0xf0,
            dst: 0x68,
            msg: new Buffer([0x48, 0x13])
        });
    }

    function simulateLeft() {
        ibusInterface.sendMessage({
            src: 0xf0,
            dst: 0x68,
            msg: new Buffer([0x48, 0x12])
        });
    }

    function simulateDown() {
        ibusInterface.sendMessage({
            src: 0xf0,
            dst: 0x68,
            msg: new Buffer([0x48, 0x03])
        });
    }

    function simulateRight() {
        ibusInterface.sendMessage({
            src: 0xf0,
            dst: 0x68,
            msg: new Buffer([0x48, 0x02])
        });
    }

    function simulateSelect() {
        ibusInterface.sendMessage({
            src: 0xf0,
            dst: 0x68,
            msg: new Buffer([0x48, 0x05])
        });
    }

    function simulateBack() {
        ibusInterface.sendMessage({
            src: 0xf0,
            dst: 0x68,
            msg: new Buffer([0x48, 0x11])
        });
    }

}

module.exports = IbusDebugger;