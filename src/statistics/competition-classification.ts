import { FixtureAndEventsResponseModel } from '../api-football/query-api-football';
import { NormalisedTweetResult, Statistic } from './types';
import leagueLookup from '../api-football/api-football-league.lookup.json';

export function createCompetitionClassification(): Statistic {
  return {
    title: 'Allgemein',
    description: 'Anteil verschiedene Wettbewerbe',
    getGame: getCompetitionClassification
  };
}

function getCompetitionClassification(
  _allTweets: ReadonlyArray<NormalisedTweetResult>,
  fixturesWithEvents: ReadonlyArray<FixtureAndEventsResponseModel>
): {
  tweetText: string;
} {
  const allGamesLeagueIds = fixturesWithEvents.flatMap(({ fixtures }) =>
    fixtures.map((fixture) => fixture.fixture.league.id)
  );

  const competitions = allGamesLeagueIds.reduce((acc, curr) => {
    const leagueLookupObject: { [key: string]: string } = leagueLookup;
    const competitionType = leagueLookupObject[`${curr}`];

    if (competitionType) {
      return acc[competitionType]
        ? {
            ...acc,
            [competitionType]: acc[competitionType] + 1
          }
        : { ...acc, [competitionType]: 1 };
    } else {
      console.log('no competition found for league', curr);

      return acc;
    }
  }, {} as { [key: string]: number });

  const filtered = Object.entries(competitions).sort((a, b) => b[1] - a[1]);

  return { tweetText: `by Competition: ${JSON.stringify(filtered)}` };
}
