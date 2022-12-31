import { FixtureAndEventsResponseModel } from '../api-football/query-api-football';
import { FixtureEvent } from '../api-football/types';
import { NormalisedTweetResult } from '../twitter/types';
import { GoalEvent, Statistic } from './types/types';

export function createGetMostOwnGoals(): Statistic {
  return {
    title: 'Brudah, Ich schlag den Ball lang',
    description: 'Zerfickung mit den meisten Eigentoren',
    getGame: getGameWithMostOwnGoals
  };
}

function getGameWithMostOwnGoals(
  _allTweets: ReadonlyArray<NormalisedTweetResult>,
  allFixturesWithEvents: ReadonlyArray<FixtureAndEventsResponseModel>
): {
  tweetText: string;
  additionalInformation: unknown;
} {
  const fixtureWithOwnGoals = allFixturesWithEvents.flatMap((fixturesAndEvents) =>
    fixturesAndEvents.fixtures.flatMap(({ fixture, events }) => {
      const ownGoals = events.filter(isOwnGoalEvent).length;

      return {
        fixture: {
          homeTeam: fixture.teams.home.name,
          awayTeam: fixture.teams.away.name,
          homeScore: fixture.score.fulltime.home,
          awayScore: fixture.score.fulltime.away
        },
        ownGoals
      };
    })
  );

  const filtered = Object.entries(fixtureWithOwnGoals)
    .filter(([_key, { ownGoals }]) => ownGoals > 2)
    .sort((a, b) => b[1].ownGoals - a[1].ownGoals);

  return {
    tweetText: `Der Zerficker: ${filtered[0][0]}`,
    additionalInformation: filtered
  };
}

function isOwnGoalEvent(event: FixtureEvent): event is GoalEvent {
  return event.type === 'Goal' && event.detail === 'Own Goal';
}
