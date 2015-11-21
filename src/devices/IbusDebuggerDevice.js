var Log = require('log'),
    log = new Log('debug'),
    clc = require('cli-color'),
    _ = require('underscore');

// Debug Ibus messages
var IbusDebuggerDevice = function() {

    // self reference
    var _self = this;

    // exposed data
    this.init = init;
    this.deviceName = 'Ibus Debugger';
    this.listenDeviceIds = [];
    this.up = simulateUp;
    this.left = simulateLeft;
    this.down = simulateDown;
    this.right = simulateRight;
    this.back = simulateBack;
    this.select = simulateSelect;
    this.srr = simulateRotateRight;
    this.srl = simulateRotateLeft;

    // local data
    this.ibusInterface = {};

    // implementation
    function init(ibusInterface, listenDeviceIds, successFn) {
        log.debug('[IbusDebuggerDevice] Starting up..');

        // set interfaces
        _self.ibusInterface = ibusInterface;
        _self.listenDeviceIds = listenDeviceIds || [];

        // events
        _self.ibusInterface.on('data', onData);

        if (successFn) {
            successFn();
        }
    }

    function onData(data) {
        log.debug('[IbusDebuggerListener] ', data);
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


    function simulateRotateLeft() {
        _self.ibusInterface.sendMessage({
            src: 0xf0,
            dst: 0x68,
            msg: new Buffer([0x49, 0x03])
        });
    }

    function simulateRotateRight() {
        _self.ibusInterface.sendMessage({
            src: 0xf0,
            dst: 0x68,
            msg: new Buffer([0x49, 0x83])
        });
    }


    function simulateUp() {
        _self.ibusInterface.sendMessage({
            src: 0xf0,
            dst: 0x68,
            msg: new Buffer([0x48, 0x13])
        });
    }

    function simulateLeft() {
        _self.ibusInterface.sendMessage({
            src: 0xf0,
            dst: 0x68,
            msg: new Buffer([0x48, 0x12])
        });
    }

    function simulateDown() {
        _self.ibusInterface.sendMessage({
            src: 0xf0,
            dst: 0x68,
            msg: new Buffer([0x48, 0x03])
        });
    }

    function simulateRight() {
        _self.ibusInterface.sendMessage({
            src: 0xf0,
            dst: 0x68,
            msg: new Buffer([0x48, 0x02])
        });
    }

    function simulateSelect() {
        _self.ibusInterface.sendMessage({
            src: 0xf0,
            dst: 0x68,
            msg: new Buffer([0x48, 0x05])
        });
    }

    function simulateBack() {
        _self.ibusInterface.sendMessage({
            src: 0xf0,
            dst: 0x68,
            msg: new Buffer([0x48, 0x01])
        });
    }

}

module.exports = IbusDebuggerDevice;