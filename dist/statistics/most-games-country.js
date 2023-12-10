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
exports.createGetMostGamesCountry = void 0;
function createGetMostGamesCountry() {
    return {
        title: 'Tweet Reply',
        description: 'Land mit den meisten Zerfickungen',
        getGame: getMostGamesCountry
    };
}
exports.createGetMostGamesCountry = createGetMostGamesCountry;
function getMostGamesCountry(_allTweets, allFixturesWithEvents) {
    var countries = allFixturesWithEvents.flatMap(function (value) {
        return value.fixtures.map(function (_a) {
            var fixture = _a.fixture;
            return fixture.league.country;
        });
    });
    var countriesByOccurrence = countries.reduce(function (acc, currentCountry) {
        var _a, _b;
        var isCurrentCountryAlreadyDefined = typeof acc[currentCountry] === 'number';
        if (isCurrentCountryAlreadyDefined) {
            return __assign(__assign({}, acc), (_a = {}, _a[currentCountry] = acc[currentCountry] + 1, _a));
        }
        else {
            return __assign(__assign({}, acc), (_b = {}, _b[currentCountry] = 1, _b));
        }
    }, {});
    var filtered = Object.entries(countriesByOccurrence)
        .filter(function (_a) {
        var _league = _a[0], occurrence = _a[1];
        return occurrence >= 20;
    })
        .sort(function (a, b) { return b[1] - a[1]; });
    return { tweetText: filtered[0][0], additionalInformation: filtered };
}
