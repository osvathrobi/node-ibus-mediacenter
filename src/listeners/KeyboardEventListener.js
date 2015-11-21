var keypress = require('keypress');

var KeyboardClient = function(remoteControlClient, ibusDebugger) {
    // make `process.stdin` begin emitting "keypress" events
    keypress(process.stdin);

    // listen for the "keypress" event
    process.stdin.on('keypress', function(ch, key) {
        //console.log('got "keypress"',ch, key);

        if (key && key.ctrl && key.name == 'c') {
            process.emit('SIGINT');
        }

        
        if(key.name === 'w') {
            ibusDebugger.up();
        }

        if(key.name === 'a') {
            ibusDebugger.left();
        }

        if(key.name === 's') {
            ibusDebugger.down();
        }

        if(key.name === 'd') {
            ibusDebugger.right();
        }

        if(key.name === 'q') {
            ibusDebugger.back();
        }

        if(key.name === 'e') {
            ibusDebugger.select();
        }
        

        if(key.name === 'up') {
            remoteControlClient.up();
        }
        if(key.name === 'down') {
            remoteControlClient.down();
        }
        if(key.name === 'left') {
            remoteControlClient.left();
        }
        if(key.name === 'right') {
            remoteControlClient.right();
        }
        if(key.name === 'return') {
            remoteControlClient.select();
        }
        if(key.name === 'escape') {
            remoteControlClient.back();
        }
        if(key.name === 'i') {
            remoteControlClient.contextMenu();
        }

    });

    process.stdin.setRawMode(true);
    process.stdin.resume();
}

module.exports = KeyboardClient;