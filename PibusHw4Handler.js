// This is to signal wake state for my TJA2010
var Gpio = require('onoff').Gpio;

var GPIO_NSLP_CTL = 22;
var GPIO_PIN17_CTL = 23
var GPIO_LED_CTL = 24
var GPIO_RELAY_CTL = 27

var gpioCtrl = new Gpio(22, 'out');

// send wake signal HIGH to pin 22
gpioCtrl.write(1);