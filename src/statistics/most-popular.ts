import { Statistic } from './types/types';

export function createGetMostPopular(): Statistic {
  return {
    title: 'Ricken Lupfen Jetzt',
    description: 'beliebteste Zerfickung',
    getGame: getMostPopular
  };
}

function getMostPopular(): {
  tweetText: string;
  additionalInformation: unknown;
} {
  return  { tweetText: 'Manuell nachschauen über twitter advanced search', additionalInformation: { score: 0, retweets: 130, likes: 4000 } }
  
}
