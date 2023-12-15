import { FixtureAndEventsResponseModel } from '../api-football/query-api-football';
import { NormalisedTweetResult } from '../twitter/types';
import { Statistic } from './types/types';

export function createGetMostGamesCountry(): Statistic {
  return {
    title: 'Tweet Reply',
    description: 'Land mit den meisten Zerfickungen',
    getGame: getMostGamesCountry
  };
}

function getMostGamesCountry(
  _allTweets: ReadonlyArray<NormalisedTweetResult>,
  allFixturesWithEvents: ReadonlyArray<FixtureAndEventsResponseModel>
): {
  tweetText: string;
  additionalInformation: unknown;
} {
  const countries = allFixturesWithEvents.flatMap((value) =>
    value.fixtures.map(({ fixture }) => fixture.league.country)
  );

  const countriesByOccurrence = countries.reduce((acc, currentCountry) => {
    const isCurrentCountryAlreadyDefined = typeof acc[currentCountry] === 'number';

    if (isCurrentCountryAlreadyDefined) {
      return {
        ...acc,
        [currentCountry]: acc[currentCountry] + 1
      };
    } else {
      return {
        ...acc,
        [currentCountry]: 1
      };
    }
  }, {} as { [league: string]: number });

  const filtered = Object.entries(countriesByOccurrence)
    .filter(([_league, occurrence]) => occurrence > 100)
    .sort((a, b) => b[1] - a[1]);

  return { tweetText: filtered[0][0], additionalInformation: filtered };
}
