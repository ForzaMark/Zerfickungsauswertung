"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readApiFootballData = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
function readApiFootballData() {
    return readFixturesWithEvents();
}
exports.readApiFootballData = readApiFootballData;
function readFixturesWithEvents() {
    var path = (0, path_1.join)(__dirname, '../../data-files/all-fixtures-and-events.json');
    return JSON.parse((0, fs_1.readFileSync)(path, 'utf-8'));
}
