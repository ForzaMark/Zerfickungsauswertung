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

export function createWinsFromBehind(): Statistic {
  return {
    title: 'Community Questions',
    description: 'Zerfickung nach Rückstand',
    getGame: getGameWithWinFromBehind
  };
}

function getGameWithWinFromBehind(
  _allTweets: ReadonlyArray<NormalisedTweetResult>,
  allFixturesWithEvents: ReadonlyArray<FixtureAndEventsResponseModel>
): {
  tweetText: string;
} {
  const winsFromBehind = allFixturesWithEvents
    .flatMap((fixturesAndEvents) => fixturesAndEvents.fixtures)
    .filter((fixture) => isWinFromBehind(fixture));

  return {
    tweetText: `Anzahl Zerfickungen nach Rückstand: ${winsFromBehind.length}`
  };
}

function isGoalEvent(event: FixtureEvent): event is GoalEvent {
  return event.type === 'Goal';
}

export function isWinFromBehind(
  event: FixtureAndEventsResponseModel['fixtures'][number]
): boolean {
  const winningSideTeamId =
    event.fixture.score.fulltime.home > event.fixture.score.fulltime.away
      ? event.fixture.teams.home.id
      : event.fixture.teams.away.id;

  const subResults = event.events.filter(isGoalEvent).reduce(
    (acc, curr) => {
      if (!acc.isWinFromBehind) {
        const isWinningTeamGoal = curr.team.id === winningSideTeamId;

        const currentDifference = isWinningTeamGoal
          ? acc.currentDifference + 1
          : acc.currentDifference - 1;

        return { currentDifference, isWinFromBehind: currentDifference < 0 };
      } else {
        return { currentDifference: 0, isWinFromBehind: true };
      }
    },
    { currentDifference: 0, isWinFromBehind: false }
  );

  return subResults.isWinFromBehind;
}
