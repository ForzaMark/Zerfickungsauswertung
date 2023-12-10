"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMostGamesPerDay = void 0;
function createMostGamesPerDay() {
    return {
        title: 'Allgemein',
        description: 'Zerfickungstag',
        getGame: getMostGamesPerDay
    };
}
exports.createMostGamesPerDay = createMostGamesPerDay;
function getMostGamesPerDay(allTweets) {
    var results = allTweets.map(function (_a) {
        var tweet = _a.tweet;
        return tweet.created_at.split('T')[0];
    });
    var numberOfDates = results.reduce(function (acc, curr) {
        var _a, _b;
        var isResultAlreadyDefined = typeof acc[curr] === 'number';
        if (isResultAlreadyDefined) {
            return __assign(__assign({}, acc), (_a = {}, _a[curr] = acc[curr] + 1, _a));
        }
        else {
            return __assign(__assign({}, acc), (_b = {}, _b[curr] = 1, _b));
        }
    }, {});
    var filtered = Object.entries(numberOfDates)
        .filter(function (_a) {
        var _key = _a[0], value = _a[1];
        return value > 20;
    })
        .sort(function (a, b) { return b[1] - a[1]; });
    return {
        tweetText: "Most Games by Day: ".concat(filtered[0][0]),
        additionalInformation: filtered
    };
}
