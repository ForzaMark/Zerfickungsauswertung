import { NormalisedTweetResult, Statistic } from './types';

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
