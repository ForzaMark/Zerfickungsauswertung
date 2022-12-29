import allTweets from './all-tweets.json';

export function getAllTweetDates(): ReadonlySet<string> {
  const allDays = allTweets.map(({ tweet }) => tweet.created_at.split('T')[0]);
  return new Set(allDays);
}
