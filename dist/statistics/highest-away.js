"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGetHighestAway = void 0;
function createGetHighestAway() {
    return {
        title: 'Füße geblutet',
        description: 'höchste Auswärtszerfickung',
        getGame: getHighestAway
    };
}
exports.createGetHighestAway = createGetHighestAway;
function getHighestAway(allTweets) {
    return allTweets.reduce(function (acc, _a) {
        var tweet = _a.tweet, game = _a.game;
        if (game.homeScore > game.awayScore) {
            return acc;
        }
        else {
            var currentDifference = game.awayScore - game.homeScore;
            return currentDifference > acc.difference
                ? { difference: currentDifference, tweetText: tweet.text }
                : acc;
        }
    }, { difference: 0, tweetText: 'initial' });
}
