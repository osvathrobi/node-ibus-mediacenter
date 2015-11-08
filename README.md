# node-ibus-mediacenter

{6, "\xF0\x05\xFF\x47\x00\x38\x75", "info", NULL, KEY_I},	
{6, "\xF0\x04\x3B\x48\x05\x82", "enter", NULL, KEY_ENTER},
{7, "\xF0\x05\xFF\x47\x00\x0F\x42", "sel", NULL, KEY_TAB},
{4, "\xF0\x04\x3B\x49", "rotary", NULL, 0, ibus_handle_rotary},
{6, "\xF0\x04\x68\x48\x40\x94", "FF", NULL, KEY_RIGHT|_CTRL_BIT},
{6, "\xF0\x04\x68\x48\x50\x84", "RR", NULL, KEY_LEFT|_CTRL_BIT},
{6, "\xF0\x04\x68\x48\x11\xC5", "1", NULL, KEY_ESC},
{6, "\xF0\x04\x68\x48\x01\xD5", "2", NULL, KEY_SPACE},
{6, "\xF0\x04\x68\x48\x12\xC6", "3", NULL, KEY_Z},
{6, "\xF0\x04\x68\x48\x02\xD6", "4", NULL, KEY_X},
{6, "\xF0\x04\x68\x48\x13\xC7", "5", NULL, KEY_LEFT},
{6, "\xF0\x04\x68\x48\x03\xD7", "6", NULL, KEY_RIGHT}, 

{6, "\xF0\x04\x68\x48\x10\xC4", "cd-prev", NULL, KEY_COMMA, cdchanger_handle_start},
{6, "\xF0\x04\x68\x48\x00\xD4", "cd-next", NULL, KEY_DOT, cdchanger_handle_start},
// steering wheel
{6, "\x50\x04\x68\x3B\x08\x0F", "cd-prev", NULL, KEY_COMMA, cdchanger_handle_start},
{6, "\x50\x04\x68\x3B\x01\x06", "cd-next", NULL, KEY_DOT, cdchanger_handle_start}, 

{4, "\x80\x06\xBF\x19", "coolant-temp", NULL, 0, ibus_handle_coolant_temp},
{4, "\x80\x09\xFF\x24", "fuel-consumption", NULL, 0, ibus_handle_fc},
{4, "\x80\x0A\xFF\x24", "outside-temp", NULL, 0, ibus_handle_outside_temp},
{4, "\x7F\x20\x3F\xA0", "battery-voltage", NULL, 0, ibus_handle_battery_voltage},
{5, "\x7F\x03\x3F\xA1\xE2", "re-battery-voltage", NULL, 0, ibus_request_battery_voltage2},