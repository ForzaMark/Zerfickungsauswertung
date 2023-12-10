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
exports.createMostGamesWonByTeam = void 0;
function createMostGamesWonByTeam() {
    return {
        title: 'Die Zerficker',
        description: 'Team das am meisten zerfickt hat',
        getGame: getMostGamesWonByTeam
    };
}
exports.createMostGamesWonByTeam = createMostGamesWonByTeam;
function getMostGamesWonByTeam(allTweets) {
    var leaguesByOccurrence = allTweets.reduce(function (acc, _a) {
        var _b, _c;
        var game = _a.game;
        var homeScore = game.homeScore, awayScore = game.awayScore, homeTeam = game.homeTeam, awayTeam = game.awayTeam;
        var looser = homeScore > awayScore ? homeTeam : awayTeam;
        var isLoserAlredyDefined = typeof acc[looser] === 'number';
        if (isLoserAlredyDefined) {
            return __assign(__assign({}, acc), (_b = {}, _b[looser] = acc[looser] + 1, _b));
        }
        else {
            return __assign(__assign({}, acc), (_c = {}, _c[looser] = 1, _c));
        }
    }, {});
    var filtered = Object.entries(leaguesByOccurrence)
        .filter(function (_a) {
        var _league = _a[0], occurrence = _a[1];
        return occurrence > 3;
    })
        .sort(function (a, b) { return b[1] - a[1]; });
    return { tweetText: filtered[0][0], additionalInformation: filtered };
}
