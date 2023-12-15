import { NormalisedTweetResult } from '../twitter/types';
import { Statistic } from './types/types';

export function createGetMostPopular(): Statistic {
  return {
    title: 'Ricken Lupfen Jetzt',
    description: 'beliebteste Zerfickung',
    getGame: getMostPopular
  };
}

function getMostPopular(allTweets: ReadonlyArray<NormalisedTweetResult>): {
  tweetText: string;
  additionalInformation: unknown;
} {
  return allTweets.reduce(
    (acc, { tweet }) => {
      const retweetScore =
        tweet.public_metrics.retweet_count + tweet.public_metrics.quote_count;
      const likeScore = tweet.public_metrics.like_count;

      const currentScore = retweetScore * 5 + likeScore;

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
    },
    { tweetText: 'initial', additionalInformation: { score: 0, retweets: 0, likes: 0 } }
  );
}
