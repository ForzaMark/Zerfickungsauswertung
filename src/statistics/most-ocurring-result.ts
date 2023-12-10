import { NormalisedTweetResult } from '../twitter/types';
import { Statistic } from './types/types';

export function createGetMostOccurringResults(): Statistic {
  return {
    title: 'Allgemein',
    description: 'Häufigstes Ergebniss',
    getGame: getMostOccurringResult
  };
}

function getMostOccurringResult(allTweets: ReadonlyArray<NormalisedTweetResult>): {
  tweetText: string;
  additionalInformation: unknown;
} {
  const results = allTweets.map(({ game }) =>
    game.homeScore > game.awayScore
      ? `${game.homeScore}:${game.awayScore}`
      : `${game.awayScore}:${game.homeScore}`
  );

  const numberOfDates = results.reduce(
    (acc, curr) => {
      const isResultAlreadyDefined = typeof acc[curr] === 'number';

      if (isResultAlreadyDefined) {
        return {
          ...acc,
          [curr]: acc[curr] + 1
        };
      } else {
        return {
          ...acc,
          [curr]: 1
        };
      }
    },

    {} as { [result: string]: number }
  );

  const filtered = Object.entries(numberOfDates)
    .filter(([_key, value]) => value > 100)
    .sort((a, b) => b[1] - a[1]);

  return {
    tweetText: `Most occurring result: ${filtered[0][0]}`,
    additionalInformation: filtered
  };
}
