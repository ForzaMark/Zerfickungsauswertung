import { NormalisedTweetResult } from './types';

export function getAllTweetDates(
  allTweets: ReadonlyArray<NormalisedTweetResult>
): ReadonlySet<string> {
  const allDays = allTweets.map(({ tweet }) => tweet.created_at.split('T')[0]);
  return new Set(allDays);
}
