var Log = require('log'),
    log = new Log('debug'),
    clc = require('cli-color');

// Respond to Ibus Events
var IbusEventClient = function() {

    // self reference
    var _self = this;

    // exposed data
    this.init = init;
    this.deviceName = 'IbusEventClient';
    this.ibusInterface = {};
    this.remoteControlClient = {};
    this.remoteControlClients = [];

    // exposed methods
    this.init = init;
    this.setRemoteControlClient = setRemoteControlClient;

    // local data
    //var dataInfo = new Buffer([0xa5, 0x63, 0x01]);

    // implementation
    function init(ibusInterface) {
        _self.ibusInterface = ibusInterface;

        // events
        _self.ibusInterface.on('data', onData);
    }

    function setRemoteControlClient(key, remoteControlClient) {
        _self.remoteControlClients[key] = remoteControlClient;
    }

    function repeat(fn, times) {
        for (var i = 0; i < times; i++) {
            console.log('running', i, times);
            fn();
        }
    }

    function onData(data) {
        log.debug('[IbusDebuggerListener] ', data);

        var cmpData = compareify(data.src, data.dst, data.msg);

        if (isEq(cmpData, compareify('f0', '68', new Buffer([0x48, 0x11])))) {
            // 1
            _self.remoteControlClients['xbmc'].back();
        }

        if (isEq(cmpData, compareify('f0', '68', new Buffer([0x48, 0x01])))) {
            // 2
            _self.remoteControlClients['xbmc'].contextMenu();
        }


        if (isEq(cmpData, compareify('f0', '68', new Buffer([0x48, 0x12])))) {
            // 3
            _self.remoteControlClients['xbmc'].left();
        }

        if (isEq(cmpData, compareify('f0', '68', new Buffer([0x48, 0x02])))) {
            // 4
            _self.remoteControlClients['xbmc'].right();
        }

        if (isEq(cmpData, compareify('f0', '68', new Buffer([0x48, 0x13])))) {
            // 5
            _self.remoteControlClients['xbmc'].up();
        }

        if (isEq(cmpData, compareify('f0', '68', new Buffer([0x48, 0x03])))) {
            // 6
            _self.remoteControlClients['xbmc'].down();
        }

        if (isEq(cmpData, compareify('f0', '68', new Buffer([0x48, 0x05])))) {
            // nav turn knob push
            _self.remoteControlClients['xbmc'].select();
        }


        // TURN WHEEL LEFT
        if (isEq(cmpData, compareify('f0', '68', new Buffer([0x49, 0x01])))) {
            // 49 0n - rotate left 1..9
            repeat(_self.remoteControlClients['xbmc'].left, 1);
        }
        if (isEq(cmpData, compareify('f0', '68', new Buffer([0x49, 0x02])))) {
            // 49 0n - rotate left 1..9
            repeat(_self.remoteControlClients['xbmc'].left, 1);
        }
        if (isEq(cmpData, compareify('f0', '68', new Buffer([0x49, 0x03])))) {
            // 49 0n - rotate left 1..9
            repeat(_self.remoteControlClients['xbmc'].left, 2);
        }
        if (isEq(cmpData, compareify('f0', '68', new Buffer([0x49, 0x04])))) {
            // 49 0n - rotate left 1..9
            repeat(_self.remoteControlClients['xbmc'].left, 2);
        }
        if (isEq(cmpData, compareify('f0', '68', new Buffer([0x49, 0x05])))) {
            // 49 0n - rotate left 1..9
            repeat(_self.remoteControlClients['xbmc'].left, 3);
        }
        if (isEq(cmpData, compareify('f0', '68', new Buffer([0x49, 0x06])))) {
            // 49 0n - rotate left 1..9
            repeat(_self.remoteControlClients['xbmc'].left, 3);
        }
        if (isEq(cmpData, compareify('f0', '68', new Buffer([0x49, 0x7])))) {
            // 49 0n - rotate left 1..9
            repeat(_self.remoteControlClients['xbmc'].left, 3);
        }
        if (isEq(cmpData, compareify('f0', '68', new Buffer([0x49, 0x08])))) {
            // 49 0n - rotate left 1..9
            repeat(_self.remoteControlClients['xbmc'].left, 4);
        }
        if (isEq(cmpData, compareify('f0', '68', new Buffer([0x49, 0x09])))) {
            // 49 0n - rotate left 1..9
            repeat(_self.remoteControlClients['xbmc'].left, 4);
        }



        // TURN WHEEL RIGHT
        if (isEq(cmpData, compareify('f0', '68', new Buffer([0x49, 0x81])))) {
            // 49 8n - rotate right 1..9                
            repeat(_self.remoteControlClients['xbmc'].right, 1);
        }
        if (isEq(cmpData, compareify('f0', '68', new Buffer([0x49, 0x82])))) {
            // 49 8n - rotate right 1..9
            repeat(_self.remoteControlClients['xbmc'].right, 1);
        }
        if (isEq(cmpData, compareify('f0', '68', new Buffer([0x49, 0x83])))) {
            // 49 8n - rotate right 1..9
            repeat(_self.remoteControlClients['xbmc'].right, 2);
        }
        if (isEq(cmpData, compareify('f0', '68', new Buffer([0x49, 0x84])))) {
            // 49 8n - rotate right 1..9
            repeat(_self.remoteControlClients['xbmc'].right, 2);
        }
        if (isEq(cmpData, compareify('f0', '68', new Buffer([0x49, 0x85])))) {
            // 49 8n - rotate right 1..9
            repeat(_self.remoteControlClients['xbmc'].right, 3);
        }
        if (isEq(cmpData, compareify('f0', '68', new Buffer([0x49, 0x86])))) {
            // 49 8n - rotate right 1..9
            repeat(_self.remoteControlClients['xbmc'].right, 3);
        }
        if (isEq(cmpData, compareify('f0', '68', new Buffer([0x49, 0x87])))) {
            // 49 8n - rotate right 1..9
            repeat(_self.remoteControlClients['xbmc'].right, 3);
        }
        if (isEq(cmpData, compareify('f0', '68', new Buffer([0x49, 0x88])))) {
            // 49 8n - rotate right 1..9
            repeat(_self.remoteControlClients['xbmc'].right, 4);
        }
        if (isEq(cmpData, compareify('f0', '68', new Buffer([0x49, 0x89])))) {
            // 49 8n - rotate right 1..9
            repeat(_self.remoteControlClients['xbmc'].right, 4);
        }

    }

    function compareify(src, dst, msg) {
        var r = Buffer.concat([new Buffer([parseInt(src, 16), parseInt(dst, 16)]), msg]);

        //console.log(r, '/', src , '/', dst, '/', msg);

        return r;
    }

    function isEq(op1, op2) {
        return op1.equals(op2);
    }

};

module.exports = IbusEventClient;