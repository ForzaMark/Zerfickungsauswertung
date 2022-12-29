import { FixtureAndEventsResponseModel } from '../api-football/query-api-football';
import { NormalisedTweetResult } from '../twitter/types';
import { Statistic } from './types/types';
import { calculateMinuteOfDecidingGoal } from './util/calculate-minute-of-deciding-goal';
import { isGoalEvent } from './util/is-goal-event';

export function createFastestDecidingGoal(): Statistic {
  return {
    title: 'Community Questions',
    description: 'Schnellste Zerfickung',
    getGame: getFastestDecidingGoal
  };
}

function getFastestDecidingGoal(
  _allTweets: ReadonlyArray<NormalisedTweetResult>,
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
        minuteOfDecidingGoal: minuteValues?.minuteOfDecidingGoal,
        minuteOfFirstGoal: minuteValues?.minuteOfFirstGoal,
        differenceGoalMinutes:
          (minuteValues?.minuteOfDecidingGoal || 0) -
          (minuteValues?.minuteOfFirstGoal || 0),
        fixture: `${fixture.fixture.id}: ${fixture.teams.home.name} ${fixture.score.fulltime.home} : ${fixture.score.fulltime.away} ${fixture.teams.away.name}`
      };

      return result;
    })
    .filter(
      (
        value
      ): value is {
        minuteOfDecidingGoal: number;
        differenceGoalMinutes: number;
        minuteOfFirstGoal: number;
        fixture: string;
      } => value.minuteOfDecidingGoal !== undefined
    );

  const fastestFiltered = result
    .map(({ minuteOfDecidingGoal, fixture }) => ({
      minute: minuteOfDecidingGoal,
      fixture
    }))
    .filter(({ minute }) => minute < 23)
    .sort((a, b) => a.minute - b.minute);

  const latestFitlered = result
    .map(({ minuteOfFirstGoal, fixture }) => ({
      minute: minuteOfFirstGoal,
      fixture
    }))
    .filter(({ minute }) => minute > 55)
    .sort((a, b) => b.minute - a.minute);

  const smallestDifferenceFiltered = result
    .map(({ differenceGoalMinutes, fixture }) => ({
      minute: differenceGoalMinutes,
      fixture
    }))
    .filter(({ minute }) => minute < 15)
    .sort((a, b) => a.minute - b.minute);

  return {
    tweetText: `
            Schnellste Zerfickung: ${fastestFiltered[0].fixture} - Minute: ${fastestFiltered[0].minute}
            Späteste Zerfickung: ${latestFitlered[0].fixture} - Minute : ${fastestFiltered[0].minute}
            Kleinste Differenz: ${smallestDifferenceFiltered[0].fixture} - Minute : ${smallestDifferenceFiltered[0].minute}       
    `,
    additionalInformation: {
      fastestFiltered: fastestFiltered,
      smallestDifferenceFiltered: smallestDifferenceFiltered,
      latestFitlered: latestFitlered
    }
  };
}