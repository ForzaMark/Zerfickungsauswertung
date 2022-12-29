import { FixtureAndEventsResponseModel } from '../api-football/query-api-football';
import { NormalisedTweetResult } from '../twitter/types';

export interface Statistic {
  title: string;
  description: string;
  getGame: (
    allGames: ReadonlyArray<NormalisedTweetResult>,
    fixturesWithEvents: ReadonlyArray<FixtureAndEventsResponseModel>
  ) => { tweetText: string; additionalInformation?: unknown };
}
