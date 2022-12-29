import { NormalisedTweetResult } from '../twitter/types';
import { Statistic } from './types/types';

export function createZeroGoalsAgainst(): Statistic {
  return {
    title: 'Allgemein',
    description: 'Anzahl Zerfickungen',
    getGame: getZeroGoalsAgainst
  };
}

function getZeroGoalsAgainst(allTweets: ReadonlyArray<NormalisedTweetResult>): {
  tweetText: string;
} {
  const allZeroGoalAgainstGames = allTweets
    .map(({ game }) =>
      game.homeScore > game.awayScore ? game.awayScore : game.homeScore
    )
    .filter((value) => value === 0).length;

  return {tweetText: `Anteil zu Null Zerfickungen: ${allZeroGoalAgainstGames / allTweets.length * 100} %`}
}
