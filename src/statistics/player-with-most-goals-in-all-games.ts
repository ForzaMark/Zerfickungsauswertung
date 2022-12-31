import { FixtureAndEventsResponseModel } from '../api-football/query-api-football';
import { NormalisedTweetResult } from '../twitter/types';
import { GoalEvent, Statistic } from './types/types';
import { isGoalEvent } from './util/is-goal-event';

export function createGetPlayerWithMostGoalsInAllGames(): Statistic {
  return {
    title: 'Herr Zerficker',
    description: 'Spieler mit den meisten Toren in allen Zerfickung',
    getGame: getPlayerWithMostGoals
  };
}

function getPlayerWithMostGoals(
  _allTweets: ReadonlyArray<NormalisedTweetResult>,
  allFixturesWithEvents: ReadonlyArray<FixtureAndEventsResponseModel>
): {
  tweetText: string;
  additionalInformation: unknown;
} {
  const allGoalScorer = allFixturesWithEvents.flatMap((fixturesAndEvents) =>
    fixturesAndEvents.fixtures.flatMap(({ fixture, events }) => {
      if (fixture.score.fulltime.home > fixture.score.fulltime.away) {
        return events
          .filter(isGoalEvent)
          .filter((event) => isTeamEvent(event, fixture.teams.home.id))
          .map((event) => `${event.player.name}-${event.player.id}-${event.team.name}`);
      } else {
        return events
          .filter(isGoalEvent)
          .filter((event) => isTeamEvent(event, fixture.teams.away.id))
          .map((event) => `${event.player.name}-${event.player.id}-${event.team.name}`);
      }
    })
  );

  const goalScorersByCount = allGoalScorer.reduce((acc, curr) => {
    return acc[curr]
      ? {
          ...acc,
          [curr]: acc[curr] + 1
        }
      : {
          ...acc,
          [curr]: 1
        };
  }, {} as { [key: string]: number });

  const filtered = Object.entries(goalScorersByCount)
    .filter(([_key, value]) => value > 15)
    .sort((a, b) => b[1] - a[1]);

  return {
    tweetText: `Der Zerficker: ${filtered[0][0]}`,
    additionalInformation: filtered
  };
}

function isTeamEvent(goalEvent: GoalEvent, teamId: number) {
  return goalEvent.team.id === teamId;
}
