"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDatesOfYear = void 0;
function getAllDatesOfYear(year) {
    var dates = [];
    for (var month = 0; month < 12; month++) {
        for (var day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
            dates.push(new Date(year, month, day));
        }
    }
    return new Set(dates.map(function (date) { return date.toString().split('T')[0]; }));
}
exports.getAllDatesOfYear = getAllDatesOfYear;
