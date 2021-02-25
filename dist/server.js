"use strict";
let Stream = require('node-rtsp-stream');
var stream = new Stream({
    name: 'name',
    streamUrl: 'rtsp://192.168.1.64:554/11',
    wsPort: 9999,
    ffmpegOptions: {
        '-stats': '',
        '-r': 30 // options with required values specify the value after the key
    }
});
//# sourceMappingURL=server.js.map