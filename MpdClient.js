var Log = require('log'),
    log = new Log('info'),
    clc = require('cli-color'),
    mpd = require('mpd'),
    cmd = mpd.cmd;

var moduleName = '[MpdClient] ';


// Media-player-daemon client
var MpdClient = function() {

    // self reference
    var _self = this;

    // exposed data
    this.init = init;
    this.client = mpd.connect({
        port: 6600,
        host: 'localhost',
    });
    this.next = next;
    this.previous = previous;
    this.info = info;

    // events
    this.client.on('ready', function() {
        log.info(moduleName + "Ready");
    });

    this.client.on('system', function(name) {
        log.info(moduleName + "Update", name);
    });

    this.client.on('system-player', function() {
        _self.client.sendCommand(cmd("status", []), _logResultMessage);
    });

    // local data


    // implementation
    function init() {

    }

    function _logResultMessage(err, msg) {
        if (err) log.error(msg);
        log.info(msg);
    }

    function next() {
        _self.client.sendCommand(cmd("next", []), _logResultMessage);
    }

    function previous() {
        _self.client.sendCommand(cmd("previous", []), _logResultMessage);
    }

    function info() {
        _self.client.sendCommand(cmd("currentsong", []), _logResultMessage);
    }

};

module.exports = MpdClient;