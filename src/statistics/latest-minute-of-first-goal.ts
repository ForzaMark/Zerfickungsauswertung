import { FixtureAndEventsResponseModel } from '../api-football/query-api-football';
import { Statistic } from './types/types';
import { calculateMinuteOfDecidingGoal } from './util/calculate-minute-of-deciding-goal';
import { isGoalEvent } from './util/is-goal-event';

export function createLatestMinuteOfFirstGoal(): Statistic {
  return {
    title: 'Community Questions',
    description: 'Späteste Zerfickung',
    getGame: getLatestMinuteOfFirstGoal
  };
}

function getLatestMinuteOfFirstGoal(
  allFixturesWithEvents: ReadonlyArray<FixtureAndEventsResponseModel>
): {
  tweetText: string;
  additionalInformation: unknown;
} {
  const result = allFixturesWithEvents
    .flatMap((value) => value.fixtures)
    .map(({ fixture, events }) => {
      const winningTeamId =
        fixture.score.fulltime.home > fixture.score.fulltime.away
          ? fixture.teams.home.id
          : fixture.teams.away.id;

      const goalEvents = events.filter(isGoalEvent);

      const minuteValues = calculateMinuteOfDecidingGoal(winningTeamId, goalEvents);

      const result = {
        minuteOfFirstGoal: minuteValues?.minuteOfFirstGoal,
        fixture: `${fixture.fixture.id}: ${fixture.teams.home.name} ${fixture.score.fulltime.home} : ${fixture.score.fulltime.away} ${fixture.teams.away.name}`
      };

      return result;
    })
    .filter(
      (
        value
      ): value is {
        minuteOfFirstGoal: number;
        fixture: string;
      } => value.minuteOfFirstGoal !== undefined
    );

  const filtered = result
    .map(({ minuteOfFirstGoal, fixture }) => ({
      minuteOfFirstGoal,
      fixture
    }))
    .filter(({ minuteOfFirstGoal }) => minuteOfFirstGoal > 55)
    .sort((a, b) => b.minuteOfFirstGoal - a.minuteOfFirstGoal);

  return {
    tweetText: `Späteste Zerfickung: ${filtered[0].fixture} - Minute : ${filtered[0].minuteOfFirstGoal}`,
    additionalInformation: filtered
  };
}
