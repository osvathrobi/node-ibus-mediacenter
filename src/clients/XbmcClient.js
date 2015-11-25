var Log = require('log'),
    log = new Log('info'),
    clc = require('cli-color');

var Xbmc = require('xbmc');


var moduleName = '[XbmcClient] ';


// Media-player-daemon client
var XbmcClient = function() {

    // self reference
    var _self = this;

    // exposed data
    _self.init = init;
    _self.up = up;
    _self.down = down;
    _self.left = left;
    _self.right = right;
    _self.select = select;
    _self.back = back;
    _self.contextMenu = contextMenu;
    _self.previous = previous;
    _self.next = next;

    // events

    // local data
    var xbmcApi = new Xbmc.XbmcApi({
        silent: true
    });

    // implementation
    function init() {

        var connection = new Xbmc.TCPConnection({
            host: '127.0.0.1',
            port: 9090,
            verbose: true,
            username: 'kodi',
            password: 'kodi'
        });


        xbmcApi.setConnection(connection);

    }

    xbmcApi.on('connection:data', function(data) {
        console.log('onData', data);
    });
    xbmcApi.on('connection:open', function() {
        console.log('onOpen');
    });
    xbmcApi.on('connection:close', function() {
        console.log('onClose');
    });
    xbmcApi.on('error', function(e) {
        console.log(e);
    });

    function previous() {
        xbmcApi.input.ExecuteAction('skipprevious');
    }

    function next() {
        console.log('sending next');
        xbmcApi.input.ExecuteAction('skipnext');
    }

    function up() {
        xbmcApi.input['Up']();
    }

    function down() {
        xbmcApi.input['Down']();
    }

    function left() {
        xbmcApi.input['Left']();
    }

    function right() {
        xbmcApi.input['Right']();
    }

    function select() {
        xbmcApi.input['Select']();
    }

    function back() {
        xbmcApi.input['Back']();
    }

    function contextMenu() {
        xbmcApi.input['ContextMenu']();
    }

};

module.exports = XbmcClient;