import { NormalisedTweetResult } from '../twitter/types';
import { Statistic } from './types/types';

export function createGetHighestAway(): Statistic {
  return {
    title: 'Füße geblutet',
    description: 'höchste Auswärtszerfickung',
    getGame: getHighestAway
  };
}

function getHighestAway(allTweets: ReadonlyArray<NormalisedTweetResult>): {
  tweetText: string;
} {
  return allTweets.reduce(
    (acc, { tweet, game }) => {
      if (game.homeScore > game.awayScore) {
        return acc;
      } else {
        const currentDifference = game.awayScore - game.homeScore;

        return currentDifference > acc.difference
          ? { difference: currentDifference, tweetText: tweet.text }
          : acc;
      }
    },
    { difference: 0, tweetText: 'initial' }
  );
}
