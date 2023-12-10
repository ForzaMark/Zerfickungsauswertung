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
exports.createGetMonthWithMostGames = void 0;
function createGetMonthWithMostGames() {
    return {
        title: 'Allgemein',
        description: 'Monat mit meisten',
        getGame: getNumberOfGames
    };
}
exports.createGetMonthWithMostGames = createGetMonthWithMostGames;
function getNumberOfGames(allTweets) {
    var months = allTweets.map(function (_a) {
        var tweet = _a.tweet;
        return new Date(tweet.created_at).getMonth();
    });
    var numberOfDates = months.reduce(function (acc, curr) {
        var _a, _b;
        var isMonthAlreadyDefined = typeof acc[curr] === 'number';
        if (isMonthAlreadyDefined) {
            return __assign(__assign({}, acc), (_a = {}, _a[curr] = acc[curr] + 1, _a));
        }
        else {
            return __assign(__assign({}, acc), (_b = {}, _b[curr] = 1, _b));
        }
    }, {});
    var filtered = Object.entries(numberOfDates)
        .filter(function (_a) {
        var _key = _a[0], value = _a[1];
        return value > 200;
    })
        .sort(function (a, b) { return b[1] - a[1]; });
    return {
        tweetText: "Months are zero based, month with most: ".concat(filtered[0][0]),
        additionalInformation: filtered
    };
}
