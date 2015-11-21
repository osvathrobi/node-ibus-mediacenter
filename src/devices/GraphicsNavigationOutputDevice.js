var Log = require('log'),
    log = new Log('info'),
    clc = require('cli-color');

var GraphicsNavigationOutputDevice = function(ibusInterface) {

    // self reference
    var _self = this;

    // exposed data
    this.init = init;
    this.deviceName = 'BordMonitorOutput';
    this.setZone = setZone;
    this.setTitle = setTitle;
    this.refreshTop = refreshTop;
    this.refreshOptions = refreshOptions;
    this.setOption = setOption;
    this.showStatus = showStatus;
    this.updateScreen = updateScreen;

    // events

    // local data

    // implementation
    function init() {

    }

    function clearScreen() {

    }

    function updateScreen() {
        ibusInterface.sendMessage({
            src: 0x68,
            dst: 0x3b,
            msg: new Buffer([0xA5, 0x62, 0x01])
        });        
    }

    function refreshOptions() {
        ibusInterface.sendMessage({
            src: 0x68,
            dst: 0x3b,
            msg: new Buffer([0xa5, 0x60, 0x01, 0x00])
        });
    }

    function refreshTop() {
        ibusInterface.sendMessage({
            src: 0x68,
            dst: 0x3b,
            msg: new Buffer([0xa5, 0x62, 0x01, 0x00])
        });
    }

    function showStatus() {
        ibusInterface.sendMessage({
            src: 0x68,
            dst: 0x3b,
            msg: new Buffer([0xA5, 0x62, 0x01, 0x06])
        });
    }

    function setTitle(text) {
        ibusInterface.sendMessage({
            src: 0x68,
            dst: 0x3b,
            msg: Buffer.concat([new Buffer([0x23, 0x62, 0x10]), getPaddedLenBuf(text, 11)])
        });
    }

    function setOption(index, text) {
        // 0 to 9
        if (index === 7) {
            indexCode = 0x07;
        } else {
            indexCode = 0x40 + index;
        }

        ibusInterface.sendMessage({
            src: 0x68,
            dst: 0x3b,
            msg: Buffer.concat([new Buffer([0x21, 0x60, 0x00, indexCode]), getPaddedLenBuf(text, 14)])
        });
    }

    function setZone(index, text) {
        // 0 to 6
        var indexCode = 0x41 + index;

        var len = 0;

        if (index <= 3) {
            len = 5;
        }
        if (index === 4) {
            len = 7;
        }
        if ((5 <= index) && (index <= 6)) {
            len = 20;
        }


        ibusInterface.sendMessage({
            src: 0x68,
            dst: 0x3b,
            msg: Buffer.concat([new Buffer([0xa5, 0x62, 0x01, indexCode]), getPaddedLenBuf(text, len)])
        });
    }

    function getPaddedLenBuf(text, len) {
        var outputTextBuf = new Buffer(len);
        outputTextBuf.fill(0x20);

        var textBuf = (new Buffer(text, 'utf-8')).slice(0, len);

        // copy to the new padded buffer
        textBuf.copy(outputTextBuf);

        return outputTextBuf;
    }

};

module.exports = GraphicsNavigationOutputDevice;