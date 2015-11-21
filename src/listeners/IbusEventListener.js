var Log = require('log'),
    log = new Log('info'),
    clc = require('cli-color');

// Respond to Ibus Events
var IbusEventClient = function(ibusInterface, remoteControlClient) {

    // self reference
    var _self = this;

    // exposed data
    this.init = init;
    this.deviceName = 'IbusEventClient';

    // events
    ibusInterface.on('data', onData);

    // local data
    //var dataInfo = new Buffer([0xa5, 0x63, 0x01]);

    // implementation
    function init() {

    }

    function onData(data) {
 
        var cmpData = compareify(data.src, data.dst, data.msg);

        switch (cmpData) {
            case (compareify('f0', '68', new Buffer([0x48, 0x11]))):
                // 1
                remoteControlClient.back();
                break;

            case (compareify('f0', '68', new Buffer([0x48, 0x01]))):
                // 2

                break;


            case (compareify('f0', '68', new Buffer([0x48, 0x12]))):
                // 3
                remoteControlClient.left();
                break;

            case (compareify('f0', '68', new Buffer([0x48, 0x02]))):
                // 4
                remoteControlClient.right();
                break;

            case (compareify('f0', '68', new Buffer([0x48, 0x13]))):
                // 5
                remoteControlClient.up();
                break;

            case (compareify('f0', '68', new Buffer([0x48, 0x03]))):
                // 6
                remoteControlClient.down();
                break;

            case (compareify('f0', '68', new Buffer([0x48, 0x05]))):
                // nav turn knob push
                remoteControlClient.select();
                break;

            case (compareify('f0', '68', new Buffer([0x49, 0x00]))):
                // 49 0n - rotate left 1..9

                break;

            case (compareify('f0', '68', new Buffer([0x49, 0x81]))):
                // 49 8n - rotate right 1..9

                break;
        }
    }

    function compareify(src, dst, msg) {
        var r = src.toString() + dst.toString() + msg.toString();

        return r;
    }

};

module.exports = IbusEventClient;