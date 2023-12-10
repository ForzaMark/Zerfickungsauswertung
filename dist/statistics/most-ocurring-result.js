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
exports.createGetMostOccurringResults = void 0;
function createGetMostOccurringResults() {
    return {
        title: 'Allgemein',
        description: 'Häufigstes Ergebniss',
        getGame: getMostOccurringResult
    };
}
exports.createGetMostOccurringResults = createGetMostOccurringResults;
function getMostOccurringResult(allTweets) {
    var results = allTweets.map(function (_a) {
        var game = _a.game;
        return game.homeScore > game.awayScore
            ? "".concat(game.homeScore, ":").concat(game.awayScore)
            : "".concat(game.awayScore, ":").concat(game.homeScore);
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
        return value > 100;
    })
        .sort(function (a, b) { return b[1] - a[1]; });
    return {
        tweetText: "Most occurring result: ".concat(filtered[0][0]),
        additionalInformation: filtered
    };
}
