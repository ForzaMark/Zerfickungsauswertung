import { NormalisedTweetResult } from '../twitter/types';
import { Statistic } from './types';

export function createGetMostLoserGoals(): Statistic {
  return {
    title: 'Woran hats gelegen',
    description: 'Zerfickung mit den meisten Toren des unterlegenen Teams',
    getGame: getMostLoserGoals
  };
}

function getMostLoserGoals(allTweets: ReadonlyArray<NormalisedTweetResult>): {
  tweetText: string;
} {
  return allTweets.reduce(
    (acc, { tweet, game }) => {
      const loserGoals =
        game.homeScore > game.awayScore ? game.awayScore : game.homeScore;

      return acc.loserGoals < loserGoals ? { loserGoals, tweetText: tweet.text } : acc;
    },
    { loserGoals: 0, tweetText: 'initial' }
  );
}
