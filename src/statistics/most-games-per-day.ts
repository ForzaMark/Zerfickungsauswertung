import { NormalisedTweetResult } from '../twitter/types';
import { Statistic } from './types/types';

export function createMostGamesPerDay(): Statistic {
  return {
    title: 'Allgemein',
    description: 'Zerfickungstag',
    getGame: getMostGamesPerDay
  };
}

function getMostGamesPerDay(allTweets: ReadonlyArray<NormalisedTweetResult>): {
  tweetText: string;
  additionalInformation: unknown;
} {
  const results = allTweets.map(({ tweet }) => tweet.created_at.split('T')[0]);

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
    .filter(([_key, value]) => value > 20)
    .sort((a, b) => b[1] - a[1]);

  return {
    tweetText: `Most Games by Day: ${filtered[0][0]}`,
    additionalInformation: filtered
  };
}
