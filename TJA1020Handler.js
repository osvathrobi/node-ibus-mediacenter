// This is to signal wake state for my TJA2010
var Gpio = require('onoff').Gpio;

var GPIO_NSLP_CTL = 22;

var gpioCtrl = new Gpio(22, 'out');

// send wake signal HIGH to pin 22
gpioCtrl.write(1);