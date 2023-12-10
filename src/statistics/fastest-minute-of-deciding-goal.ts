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
        fixture: `${fixture.fixture.id}: ${fixture.teams.home.name} ${fixture.score.fulltime.home} : ${fixture.score.fulltime.away} ${fixture.teams.away.name}`
      };

      return result;
    })
    .filter(
      (
        value
      ): value is {
        minuteOfDecidingGoal: number;
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

  return {
    tweetText: `Schnellste Zerfickung: ${fastestFiltered[0].fixture} - Minute: ${fastestFiltered[0].minute}`,
    additionalInformation: fastestFiltered
  };
}