try {
    var PibusHw4Handler = require('./src/adapters/PibusHw4Handler.js')
} catch (e) {
    log.info('Raspberry pi not found..', e);
}