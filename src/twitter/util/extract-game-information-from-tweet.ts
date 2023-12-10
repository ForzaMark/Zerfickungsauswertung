export function extractGameInformationFromTweet(tweetText: string): {
  homeTeam: string;
  homeScore: number;
  awayTeam: string;
  awayScore: number;
} {
  const gameResultString = tweetText.split('⚽')[1];

  const [homeText, awayText] = gameResultString.split(':');

  const homeTextSplitted = homeText.split(' ');
  const awayTextSplitted = awayText.split(' ');

  const homeTeamString = homeTextSplitted.slice(0, -1).join(' ');
  const homeScoreString = homeTextSplitted[homeTextSplitted.length - 1];
  const awayTeamString = awayTextSplitted.slice(1).join(' ');
  const awayScoreString = awayTextSplitted[0];

  if (
    typeof homeTeamString !== 'string' ||
    typeof homeScoreString !== 'string' ||
    typeof awayTeamString !== 'string' ||
    typeof awayScoreString !== 'string'
  ) {
    throw new Error(`some regex could not be evaluated: ${tweetText}`);
  }

  const homeScore = Number(homeScoreString);
  const awayScore = Number(awayScoreString);

  return { homeScore, awayScore, homeTeam: homeTeamString, awayTeam: awayTeamString };
}
