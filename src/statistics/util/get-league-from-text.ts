export function getLeagueFromText(tweetText: string): string {
  const splitOnLineBreak = tweetText.split('\n');
  const result = splitOnLineBreak[2];

  if (result) {
    return result.toString();
  }

  throw new Error(`Unable to extract Regex from tweet ${tweetText}`);
}
