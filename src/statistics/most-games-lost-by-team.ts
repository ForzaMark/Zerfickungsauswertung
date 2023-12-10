import { NormalisedTweetResult } from '../twitter/types';
import { Statistic } from './types/types';

export function createMostGamesLostByTeam(): Statistic {
  return {
    title: 'Die Zerfickten',
    description: 'Team das am meisten zerfickt wurde',
    getGame: getMostGamesLostByTeam
  };
}

function getMostGamesLostByTeam(allTweets: ReadonlyArray<NormalisedTweetResult>): {
  tweetText: string;
  additionalInformation: unknown;
} {
  const leaguesByOccurrence = allTweets.reduce((acc, { game }) => {
    const { homeScore, awayScore, homeTeam, awayTeam } = game
    const looser = homeScore < awayScore ? homeTeam : awayTeam;
    const isLoserAlredyDefined = typeof acc[looser] === 'number';

    if (isLoserAlredyDefined) {
      return {
        ...acc,
        [looser]: acc[looser] + 1
      };
    } else {
      return {
        ...acc,
        [looser]: 1
      };
    }
  }, {} as { [league: string]: number });

  const filtered = Object.entries(leaguesByOccurrence)
    .filter(([_league, occurrence]) => occurrence > 4)
    .sort((a, b) => b[1] - a[1]);

  return { tweetText: filtered[0][0], additionalInformation: filtered };
}
