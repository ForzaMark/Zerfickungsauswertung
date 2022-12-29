import { extractGameInformationFromTweet } from '../support/extract-game-information-from-tweet';
import { NormalisedTweetResult, Statistic } from './types';

export function createMostGamesLostByTeam(): Statistic {
  return {
    title: 'Die Zerfickten',
    description: 'Team das am meisten zerfickt wurde',
    getGame: getMostGamesLostByTeam
  };
}

function getMostGamesLostByTeam(allTweets: ReadonlyArray<NormalisedTweetResult>): {
  tweetText: string;
  addtionalInformation: unknown;
} {
  const leaguesByOccurrence = allTweets.reduce((acc, { tweet }) => {
    const { homeScore, awayScore, homeTeam, awayTeam } = extractGameInformationFromTweet(
      tweet.text
    );
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

  return { tweetText: filtered[0][0], addtionalInformation: filtered };
}
