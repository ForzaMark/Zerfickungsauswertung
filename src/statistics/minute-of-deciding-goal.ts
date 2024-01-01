import { FixtureAndEventsResponseModel } from '../api-football/query-api-football';
import { Statistic } from './types/types';
import { calculateMinuteOfDecidingGoal } from './util/calculate-minute-of-deciding-goal';
import { isGoalEvent } from './util/is-goal-event';



export function createMinuteOfDecidingGoal(): Statistic {
  return {
    title: 'Community Questions',
    description: 'Minute des Zerfickungstores',
    getGame: getMinuteOfDecidingGoal
  };
}

function getMinuteOfDecidingGoal(
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
