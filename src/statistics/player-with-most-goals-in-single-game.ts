import { FixtureAndEventsResponseModel } from '../api-football/query-api-football';
import { FixtureEvent } from '../api-football/types';
import { NormalisedTweetResult, Statistic } from './types';

interface GoalEvent {
  player: {
    id: number;
    name: string;
  };
  team: {
    id: number;
    name: string;
  };
  type: 'Goal';
  detail: 'Normal Goal' | 'Own Goal';
}

export function createGetPlayerWithMostGoalsInSingleGame(): Statistic {
  return {
    title: 'Herr Zerficker II',
    description: 'Spieler mit den meisten Toren in einer Zerfickung',
    getGame: getPlayerWithMostGoalsInSingleGame
  };
}

function getPlayerWithMostGoalsInSingleGame(
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
          .filter((event) => !!event.player.name)
          .map(
            (event) =>
              `${event.player.name}-${event.player.id}-${event.team.name}-${fixture.fixture.id}`
          );
      } else {
        return events
          .filter(isGoalEvent)
          .filter((event) => isTeamEvent(event, fixture.teams.away.id))
          .filter((event) => !!event.player.name)
          .map(
            (event) =>
              `${event.player.name}-${event.player.id}-${event.team.name}-${fixture.fixture.id}`
          );
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
    .filter(([_key, value]) => value >= 6)
    .sort((a, b) => b[1] - a[1]);

  return {
    tweetText: `Der single Zerficker: ${filtered[0][0]} + Fenna Kalma bei den Frauen mit 6 Toren`,
    additionalInformation: filtered
  };
}

function isGoalEvent(event: FixtureEvent): event is GoalEvent {
  return event.type === 'Goal';
}

function isTeamEvent(goalEvent: GoalEvent, teamId: number) {
  return goalEvent.team.id === teamId;
}
