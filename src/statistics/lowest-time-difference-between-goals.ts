import { FixtureAndEventsResponseModel } from '../api-football/query-api-football';
import { NormalisedTweetResult } from '../twitter/types';
import { Statistic } from './types/types';
import { calculateMinuteOfDecidingGoal } from './util/calculate-minute-of-deciding-goal';
import { isGoalEvent } from './util/is-goal-event';

export function createLowestTimeDifferenceBetweenGoals(): Statistic {
  return {
    title: 'Community Questions',
    description: 'Kleinste Zeitdifferenz zwischen erstem und entscheidendem Tor',
    getGame: getLowestTimeDifferenceBetweenGoals
  };
}

function getLowestTimeDifferenceBetweenGoals(
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
        differenceGoalMinutes: number;
        fixture: string;
      } => value.differenceGoalMinutes !== undefined && value.differenceGoalMinutes !== 0
    );

  const filtered = result
    .filter(({ differenceGoalMinutes }) => differenceGoalMinutes < 17)
    .sort((a, b) => a.differenceGoalMinutes - b.differenceGoalMinutes);

  return {
    tweetText: `${filtered[0].fixture} - Minute : ${filtered[0].differenceGoalMinutes}`,
    additionalInformation: filtered
  };
}