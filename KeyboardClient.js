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

        if(key.name === 'n') {
        	mpc.next();
        	setTimeout(mpc.info, 100);
        }

        if(key.name === 'p') {
        	mpc.previous();
        	setTimeout(mpc.info, 100);
        }

        if(key.name === 'i') {
        	mpc.info();
        }


    });

    process.stdin.setRawMode(true);
    process.stdin.resume();
}

module.exports = KeyboardClient;