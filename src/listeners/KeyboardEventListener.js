var Log = require('log'),
    log = new Log('info'),
    clc = require('cli-color');

var keypress = require('keypress');

// remoteControlClient, ibusDebugger
var KeyboardEventListener = function() {

    var _self = this;

    _self.init = init;

    _self.setRemoteControlClient = setRemoteControlClient;

    _self.remoteControlClient = {};

    function setRemoteControlClient(key, remoteControlClient) {
        _self.remoteControlClient[key] = remoteControlClient;
    }

    function init(successFn) {
        log.info('[KeyboardEventListener] Starting up..');

        // make `process.stdin` begin emitting "keypress" events
        keypress(process.stdin);

        // listen for the "keypress" event
        process.stdin.on('keypress', function(ch, key) {
            //console.log('got "keypress"', ch, key);
            if (!(key && key.name)) {
                key = {
                    name: ch
                }
            }

            if (key && key.ctrl && key.name == 'c') {
                process.emit('SIGINT');
            }

            if (key && key.ctrl && key.name == 'z') {
                process.emit('SIGTERM');
            }


            if (key.name === 'w') {
                _self.remoteControlClient['ibus'].up();
            }

            if (key.name === 'a') {
                _self.remoteControlClient['ibus'].left();
            }

            if (key.name === 's') {
                _self.remoteControlClient['ibus'].down();
            }

            if (key.name === 'd') {
                _self.remoteControlClient['ibus'].right();
            }

            if (key.name === 'q') {
                _self.remoteControlClient['ibus'].back();
            }

            if (key.name === 'e') {
                _self.remoteControlClient['ibus'].select();
            }

            if (key.name === '[') {
                _self.remoteControlClient['ibus'].srl();
            }

            if (key.name === ']') {
                _self.remoteControlClient['ibus'].srr();
            }


            if (key.name === 'up') {
                _self.remoteControlClient['xbmc'].up();
            }
            if (key.name === 'down') {
                _self.remoteControlClient['xbmc'].down();
            }
            if (key.name === 'left') {
                _self.remoteControlClient['xbmc'].left();
            }
            if (key.name === 'right') {
                _self.remoteControlClient['xbmc'].right();
            }
            if (key.name === 'return') {
                _self.remoteControlClient['xbmc'].select();
            }
            if (key.name === 'escape') {
                _self.remoteControlClient['xbmc'].back();
            }
            if (key.name === 'i') {
                _self.remoteControlClient['xbmc'].contextMenu();
            }

        });

        process.stdin.setRawMode(true);
        process.stdin.resume();

        if (successFn) {
            successFn();
        }
    }
}

module.exports = KeyboardEventListener;