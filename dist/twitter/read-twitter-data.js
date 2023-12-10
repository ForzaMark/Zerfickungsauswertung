"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readTwitterData = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
function readTwitterData() {
    return readAllTweets();
}
exports.readTwitterData = readTwitterData;
function readAllTweets() {
    var path = (0, path_1.join)(__dirname, '../../data-files/all-tweets.json');
    return JSON.parse((0, fs_1.readFileSync)(path, 'utf-8'));
}
