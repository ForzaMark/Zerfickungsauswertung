import { FixtureAndEventsResponseModel } from '../../api-football/query-api-football';
import { FixtureEvent } from '../../api-football/types';
import { NormalisedTweetResult } from '../../twitter/types';
import { PickByDiscriminator } from '../../util/pick-by-discriminator';

export interface Statistic {
  title: string;
  description: string;
  getGame: (
    allGames: ReadonlyArray<NormalisedTweetResult>,
    fixturesWithEvents: ReadonlyArray<FixtureAndEventsResponseModel>
  ) => { tweetText: string; additionalInformation?: unknown };
}

export type GoalEvent = PickByDiscriminator<FixtureEvent, 'type', 'Goal'>