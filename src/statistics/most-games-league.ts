import { NormalisedTweetResult, Statistic } from './types';

export function createGetMostGamesLeague(): Statistic {
  return {
    title: 'Das ist respektlos',
    description: 'Liga mit den meisten Zerfickungen',
    getGame: getMostGamesLeague
  };
}

function getMostGamesLeague(allTweets: ReadonlyArray<NormalisedTweetResult>): {
  tweetText: string;
  additionalInformation: unknown
} {
  const leaguesByOccurrence = allTweets.reduce((acc, { tweet }) => {
    const currentLeague = getLeagueFromText(tweet.text);
    const isCurrentLeagueAlreadyDefined = typeof acc[currentLeague] === 'number';

    if (isCurrentLeagueAlreadyDefined) {
      return {
        ...acc,
        [currentLeague]: acc[currentLeague] + 1
      };
    } else {
      return {
        ...acc,
        [currentLeague]: 1
      };
    }
  }, {} as { [league: string]: number });

  const filtered = Object.entries(leaguesByOccurrence)
    .filter(([_league, occurrence]) => occurrence >= 20)
    .sort((a, b) => b[1] - a[1]);

  return { tweetText: filtered[0][0], additionalInformation: filtered };
}

export function getLeagueFromText(tweetText: string): string {
  const splitOnLineBreak = tweetText.split('\n');
  const result = splitOnLineBreak[2];

  if (result) {
    return result.toString();
  }

  throw new Error(`Unable to extract Regex from tweet ${tweetText}`);
}
