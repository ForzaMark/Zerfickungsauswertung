import { FixtureAndEventsResponseModel } from '../api-football/query-api-football';
import { NormalisedTweetResult } from '../twitter/types';
import { Statistic } from './types/types';
import { isGoalEvent } from './util/is-goal-event';
import { isWinFromBehind } from './util/is-win-from-behind';

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
    .filter((fixture) => {
      const winningSideId =
        fixture.fixture.score.fulltime.home > fixture.fixture.score.fulltime.away
          ? fixture.fixture.teams.home.id
          : fixture.fixture.teams.away.id;

      const goalEvents = fixture.events.filter(isGoalEvent);

      return isWinFromBehind(goalEvents, winningSideId);
    });

  return {
    tweetText: `Anzahl Zerfickungen nach Rückstand: ${winsFromBehind.length}`
  };
}
