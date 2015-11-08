var keypress = require('keypress');

var KeyboardClient = function(remoteControlClient) {
    // make `process.stdin` begin emitting "keypress" events
    keypress(process.stdin);

    // listen for the "keypress" event
    process.stdin.on('keypress', function(ch, key) {
        //console.log('got "keypress"',ch, key);

        if (key && key.ctrl && key.name == 'c') {
            process.emit('SIGINT');
        }

        /*
		if(key.name === 'x') {
        	remoteControlClient.play();
        }

        if(key.name === 'v') {
        	remoteControlClient.stop();
        }

        if(key.name === 'c') {
        	remoteControlClient.pause();
        }

        if(key.name === 'b') {
        	remoteControlClient.next();
        }

        if(key.name === 'z') {
        	remoteControlClient.previous();
        }

        if(key.name === 'i') {
        	remoteControlClient.info();
        }
        */

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