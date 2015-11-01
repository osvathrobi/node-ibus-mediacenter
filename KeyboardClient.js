var keypress = require('keypress');

var KeyboardClient = function(mpc) {
    // make `process.stdin` begin emitting "keypress" events
    keypress(process.stdin);

    // listen for the "keypress" event
    process.stdin.on('keypress', function(ch, key) {
        //console.log('got "keypress"',ch, key);

        if (key && key.ctrl && key.name == 'c') {
            process.emit('SIGINT');
        }

		if(key.name === 'x') {
        	mpc.play();
        }

        if(key.name === 'v') {
        	mpc.stop();
        }

        if(key.name === 'c') {
        	mpc.pause();
        }

        if(key.name === 'b') {
        	mpc.next();
        	mpc.info();
        }

        if(key.name === 'z') {
        	mpc.previous();
        	mpc.info();
        }

        if(key.name === 'i') {
        	mpc.info();
        }


    });

    process.stdin.setRawMode(true);
    process.stdin.resume();
}

module.exports = KeyboardClient;