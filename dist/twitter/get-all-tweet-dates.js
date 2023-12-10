"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTweetDates = void 0;
function getAllTweetDates(allTweets) {
    var allDays = allTweets.map(function (_a) {
        var tweet = _a.tweet;
        return tweet.created_at.split('T')[0];
    });
    return new Set(allDays);
}
exports.getAllTweetDates = getAllTweetDates;
