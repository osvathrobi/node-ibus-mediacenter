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

    // events
    ibusInterface.on('data', onData);

    // local data

    // implementation
    function init() {

    }

    function onData(data) {
        printReadableMessage(data);
    }

    function printReadableMessage(data) {
        if ((_self.listenDeviceIds.length === 0) || (_.find(_self.listenDeviceIds, data.dst))) {
            var msg = '';
            for (var i = 0; i < data.msg.length; i++) {
                msg += ', 0x' + ((data.msg[i] < 0x10) ? '0' : '') + data.msg[i].toString(16);
            }

            console.log('// ' + data.msg.toString('ascii'));
            console.log('ibusInterface.sendMessage({src: 0x' + data.src + ',dst: 0x' + data.dst + ', msg: new Buffer([' + msg.substr(2), '])});');
        }
    }

}

module.exports = IbusDebugger;