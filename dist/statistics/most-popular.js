"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGetMostPopular = void 0;
function createGetMostPopular() {
    return {
        title: 'Ricken Lupfen Jetzt',
        description: 'beliebteste Zerfickung',
        getGame: getMostPopular
    };
}
exports.createGetMostPopular = createGetMostPopular;
function getMostPopular(allTweets) {
    return allTweets.reduce(function (acc, _a) {
        var tweet = _a.tweet;
        var retweetScore = tweet.public_metrics.retweet_count + tweet.public_metrics.quote_count;
        var likeScore = tweet.public_metrics.like_count;
        var currentScore = retweetScore * 5 + likeScore;
        return currentScore > acc.additionalInformation.score
            ? {
                tweetText: tweet.text,
                additionalInformation: {
                    score: currentScore,
                    retweets: retweetScore,
                    likes: likeScore
                }
            }
            : acc;
    }, { tweetText: 'initial', additionalInformation: { score: 0, retweets: 0, likes: 0 } });
}
