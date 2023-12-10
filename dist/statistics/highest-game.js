"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGetHighestGame = void 0;
function createGetHighestGame() {
    return {
        title: 'Doch das Loch bleibt',
        description: 'höchste Zerfickung',
        getGame: getHighestGame
    };
}
exports.createGetHighestGame = createGetHighestGame;
function getHighestGame(allTweets) {
    return allTweets.reduce(function (acc, _a) {
        var game = _a.game, tweet = _a.tweet;
        var currentDifference = game.homeScore > game.awayScore
            ? game.homeScore - game.awayScore
            : game.awayScore - game.homeScore;
        return currentDifference > acc.difference
            ? { difference: currentDifference, tweetText: tweet.text }
            : acc;
    }, { difference: 0, tweetText: 'initial' });
}
