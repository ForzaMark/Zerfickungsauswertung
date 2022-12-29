import { NormalisedTweetResult } from '../twitter/types';
import { Statistic } from './types/types';

export function createGetMonthWithMostGames(): Statistic {
  return {
    title: 'Allgemein',
    description: 'Monat mit meisten',
    getGame: getNumberOfGames
  };
}

function getNumberOfGames(allTweets: ReadonlyArray<NormalisedTweetResult>): {
  tweetText: string;
  additionalInformation: unknown;
} {
  const months = allTweets.map(({ tweet }) => new Date(tweet.created_at).getMonth());

  const numberOfDates = months.reduce(
    (acc, curr) => {
      const isMonthAlreadyDefined = typeof acc[curr] === 'number';

      if (isMonthAlreadyDefined) {
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

    {} as { [month: number]: number }
  );

  const filtered = Object.entries(numberOfDates)
    .filter(([_key, value]) => value > 200)
    .sort((a, b) => b[1] - a[1]);

  return {
    tweetText: `Months are zero based, month with most: ${filtered[0][0]}`,
    additionalInformation: filtered
  };
}
