import { writeToFile } from '../util/write-to-file';
import { QueryTweetsHelper } from './query-tweets-helper';

export async function cloneTwitterDataToFile(apiToken: string, year: number) {
  console.log('FETCH TWITTER')
  const queryHelper = new QueryTweetsHelper();
  const allGames = await queryHelper.queryAllTweets(apiToken, year);

  writeToFile(allGames, 'all-tweets.json');

  return allGames;
}
