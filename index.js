'use strict';

var throttle = require('throttleit');

function requestProgress(emitter, options) {
    var reporter;
    var delayTimer;
    var totalSize;
    var previousReceivedSize;
    var receivedSize = 0;
    var state = {};

    options = options || {};
    options.throttle = options.throttle == null ? 3000 : options.throttle;
    options.delay = options.delay == null ? 10000 : options.delay;

    emitter.on('response', function (response) {
        state.total = totalSize = Number(response.headers['content-length']);

        // Check if there's no total size or is invalid (NaN)
        if (!totalSize) {
            return;
        }

        // Throttle the function
        reporter = throttle(function () {
            // If there received size is the same, abort
            if (previousReceivedSize === receivedSize) {
                return;
            }

            state.received = previousReceivedSize = receivedSize;
            state.percent = Math.round(receivedSize / totalSize * 100);
            emitter.emit('progress', state);
        }, options.throttle);

        // Delay the progress report
        delayTimer = setTimeout(function () {
            emitter.on('data', function (data) {
                receivedSize += data.length;
                reporter();
            });
        }, options.delay);
    });

    return emitter;
}

module.exports = requestProgress;
