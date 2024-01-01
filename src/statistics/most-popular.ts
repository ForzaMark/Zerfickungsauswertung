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
} {
  // But all statistics are potentially possible except popular but I can look it up manually
  // easier done as well with twitter advanced search
  // https://tweetdelete.net/resources/how-to-see-your-most-liked-tweet/
  return {
    tweetText: `Diese Statistik muss manuell nachgeschaut werden, da Twitterdaten nichtmehr abgefragt werden können 
                        (eventuell könnten die daten aus dem DataSheet extrahiert werden dass man sich zuschicken lassen kann).
                        Nachschauen ist am einfachsten möglich über advanced-search https://twitter.com/search-advanced`,
  };
}
