"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGetMostLoserGoals = void 0;
function createGetMostLoserGoals() {
    return {
        title: 'Woran hats gelegen',
        description: 'Zerfickung mit den meisten Toren des unterlegenen Teams',
        getGame: getMostLoserGoals
    };
}
exports.createGetMostLoserGoals = createGetMostLoserGoals;
function getMostLoserGoals(allTweets) {
    return allTweets.reduce(function (acc, _a) {
        var tweet = _a.tweet, game = _a.game;
        var loserGoals = game.homeScore > game.awayScore ? game.awayScore : game.homeScore;
        return acc.loserGoals < loserGoals ? { loserGoals: loserGoals, tweetText: tweet.text } : acc;
    }, { loserGoals: 0, tweetText: 'initial' });
}
