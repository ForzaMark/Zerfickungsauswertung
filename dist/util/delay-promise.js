"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delayPromise = void 0;
function delayPromise(ms) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, ms);
    });
}
exports.delayPromise = delayPromise;
