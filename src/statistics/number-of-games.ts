import { NormalisedTweetResult } from '../twitter/types';
import { Statistic } from './types/types';

export function createGetNumberOfGames(): Statistic {
  return {
    title: 'Allgemein',
    description: 'Anzahl Zerfickungen',
    getGame: getNumberOfGames
  };
}

function getNumberOfGames(allTweets: ReadonlyArray<NormalisedTweetResult>): {
  tweetText: string;
} {
  return {
    tweetText: `${allTweets.length}`
  };
}
