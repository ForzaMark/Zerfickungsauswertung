import { FixtureAndEventsResponseModel } from '../api-football/query-api-football';
import { FixtureEvent } from '../api-football/types';
import { NormalisedTweetResult } from '../twitter/types';
import { Statistic } from './types';

export interface GoalEvent {
  time: {
    elapsed: number;
  };
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

export function createMinuteOfDecidingGoal(): Statistic {
  return {
    title: 'Community Questions',
    description: 'Minute des Zerfickungstores',
    getGame: getMinuteOfDecidingGoal
  };
}

function getMinuteOfDecidingGoal(
  _allTweets: ReadonlyArray<NormalisedTweetResult>,
  allFixturesWithEvents: ReadonlyArray<FixtureAndEventsResponseModel>
): {
  tweetText: string;
  additionalInformation: unknown;
} {
  const minuteOfDeciding = allFixturesWithEvents
    .flatMap((value) => value.fixtures)
    .map(({ fixture, events }) => {
      const winningTeamId =
        fixture.score.fulltime.home > fixture.score.fulltime.away
          ? fixture.teams.home.id
          : fixture.teams.away.id;

      const goalEvents = events.filter(isGoalEvent);

      return calculateMinuteOfDecidingGoal(winningTeamId, goalEvents)
        ?.minuteOfDecidingGoal;
    })
    .filter((value): value is number => value !== undefined);

  const avg =
    minuteOfDeciding.reduce((acc, curr) => acc + curr, 0) / minuteOfDeciding.length;

  const detailedCalculations = minuteOfDeciding.reduce(
    (acc, curr) => {
      const slice = Math.floor(curr / 10) * 10;

      return {
        ...acc,
        [slice]: acc[slice] + 1
      };
    },
    {
      0: 0,
      10: 0,
      20: 0,
      30: 0,
      40: 0,
      50: 0,
      60: 0,
      70: 0,
      80: 0,
      90: 0,
      100: 0
    } as { [key: number]: number }
  );

  return {
    tweetText: `Durchschnittliche Minute: ${avg}`,
    additionalInformation: {
      avg,
      detailedCalculations
    }
  };
}

function isGoalEvent(event: FixtureEvent): event is GoalEvent {
  return event.type === 'Goal';
}

export function calculateMinuteOfDecidingGoal(
  winningTeamId: number,
  events: ReadonlyArray<GoalEvent>
): { minuteOfDecidingGoal: number; minuteOfFirstGoal: number } | undefined {
  const result = events.reduce(
    ({ currentDifference, minuteOfDecidingGoal, minuteOfFirstGoal }, curr) => {
      const isWinningTeamGoal = curr.team.id === winningTeamId;

      const updatedCurrentDifference = isWinningTeamGoal
        ? currentDifference + 1
        : currentDifference - 1;

      return {
        currentDifference: updatedCurrentDifference,
        minuteOfDecidingGoal:
          updatedCurrentDifference === 6 ? curr.time.elapsed : minuteOfDecidingGoal,
        minuteOfFirstGoal: minuteOfFirstGoal || curr.time.elapsed
      };
    },
    {
      minuteOfDecidingGoal: undefined,
      minuteOfFirstGoal: undefined,
      currentDifference: 0
    } as {
      currentDifference: number;
      minuteOfDecidingGoal: number | undefined;
      minuteOfFirstGoal: number | undefined;
    }
  );

  return result.minuteOfDecidingGoal && result.minuteOfFirstGoal
    ? {
        minuteOfDecidingGoal: result.minuteOfDecidingGoal,
        minuteOfFirstGoal: result.minuteOfFirstGoal
      }
    : undefined;
}
