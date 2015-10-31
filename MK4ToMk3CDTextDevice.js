var Log = require('log'),
    log = new Log('info'),
    clc = require('cli-color');

// Display Mk4 CD-text as Mk3 Options
var MK4ToMk3CDTextDevice = function(ibusInterface, navOutput) {

    // self reference
    var _self = this;

    // exposed data
    this.init = init;
    this.sourceId = '3b';
    this.deviceName = 'MK4ToMk3CDTextDevice';

    // events
    ibusInterface.on('data', onData);

    // local data
    var dataInfo = new Buffer([0xa5, 0x63, 0x01]);
    var dataFlush = new Buffer([0xa5, 0x63, 0x00, 0x00]);
    var artist = '';
    var title = '';
    var album = '';

    // implementation
    function init() {

    }

    function onData(data) {
        if (data.dst === _self.sourceId) {
            //console.log('Data is for me [', _self.deviceName, ']', data.msg);

            if (data.msg.toString() === dataFlush.toString()) {
                flushDataToNavigation();
            }

            var intro = data.msg.slice(0, 3);

            if (dataInfo.toString() === intro.toString()) {
                // artist
                if (data.msg[3] === 0x41) {
                    artist = data.msg.slice(4);
                }

                // title
                if (data.msg[3] === 0x42) {
                    title = data.msg.slice(4);
                }

                // album
                if (data.msg[3] === 0x43) {
                    album = data.msg.slice(4);
                }
            }
        }
    }

    function flushDataToNavigation() {
        // title coming from CD

        navOutput.setOption(0, "--NowPlaying--");
        navOutput.setOption(1, artist.toString('ascii'));
        navOutput.setOption(2, title.toString('ascii'));
        navOutput.setOption(3, "---------------");
        navOutput.setOption(4, album.toString('ascii'));
        navOutput.setOption(5, "");
        navOutput.setOption(6, "");
        navOutput.setOption(7, "");
        navOutput.setOption(8, "");
        navOutput.setOption(9, "");
        
        navOutput.refreshOptions();
    }


};

module.exports = MK4ToMk3CDTextDevice;