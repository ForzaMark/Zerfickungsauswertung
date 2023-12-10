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
exports.createGetMostGamesLeague = void 0;
var get_league_from_text_1 = require("./util/get-league-from-text");
function createGetMostGamesLeague() {
    return {
        title: 'Das ist respektlos',
        description: 'Liga mit den meisten Zerfickungen',
        getGame: getMostGamesLeague
    };
}
exports.createGetMostGamesLeague = createGetMostGamesLeague;
function getMostGamesLeague(allTweets) {
    var leaguesByOccurrence = allTweets.reduce(function (acc, _a) {
        var _b, _c;
        var tweet = _a.tweet;
        var currentLeague = (0, get_league_from_text_1.getLeagueFromText)(tweet.text);
        var isCurrentLeagueAlreadyDefined = typeof acc[currentLeague] === 'number';
        if (isCurrentLeagueAlreadyDefined) {
            return __assign(__assign({}, acc), (_b = {}, _b[currentLeague] = acc[currentLeague] + 1, _b));
        }
        else {
            return __assign(__assign({}, acc), (_c = {}, _c[currentLeague] = 1, _c));
        }
    }, {});
    var filtered = Object.entries(leaguesByOccurrence)
        .filter(function (_a) {
        var _league = _a[0], occurrence = _a[1];
        return occurrence >= 20;
    })
        .sort(function (a, b) { return b[1] - a[1]; });
    return { tweetText: filtered[0][0], additionalInformation: filtered };
}
