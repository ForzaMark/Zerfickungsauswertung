import { NormalisedTweetResult } from '../twitter/types';
import { Statistic } from './types/types';

export function createGetHighestGame(): Statistic {
  return {
    title: 'Doch das Loch bleibt',
    description: 'höchste Zerfickung',
    getGame: getHighestGame
  };
}

function getHighestGame(allTweets: ReadonlyArray<NormalisedTweetResult>): {
  tweetText: string;
} {
  return allTweets.reduce(
    (acc, { game, tweet }) => {
      const currentDifference =
        game.homeScore > game.awayScore
          ? game.homeScore - game.awayScore
          : game.awayScore - game.homeScore;

      return currentDifference > acc.difference
        ? { difference: currentDifference, tweetText: tweet.text }
        : acc;
    },
    { difference: 0, tweetText: 'initial' }
  );
}
