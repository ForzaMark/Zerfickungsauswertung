"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createZeroGoalsAgainst = void 0;
function createZeroGoalsAgainst() {
    return {
        title: 'Allgemein',
        description: 'Anzahl Zerfickungen',
        getGame: getZeroGoalsAgainst
    };
}
exports.createZeroGoalsAgainst = createZeroGoalsAgainst;
function getZeroGoalsAgainst(allTweets) {
    var allZeroGoalAgainstGames = allTweets
        .map(function (_a) {
        var game = _a.game;
        return game.homeScore > game.awayScore ? game.awayScore : game.homeScore;
    })
        .filter(function (value) { return value === 0; }).length;
    return { tweetText: "Anteil zu Null Zerfickungen: ".concat(allZeroGoalAgainstGames / allTweets.length * 100, " %") };
}
