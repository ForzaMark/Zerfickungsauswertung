"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeToFile = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
function writeToFile(data, fileName) {
    var path = (0, path_1.join)(__dirname, "../../data-files/".concat(fileName));
    (0, fs_1.writeFileSync)(path, JSON.stringify(data), {
        flag: 'w'
    });
}
exports.writeToFile = writeToFile;
