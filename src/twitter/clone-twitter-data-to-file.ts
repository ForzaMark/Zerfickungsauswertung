import { writeToFile } from '../util/write-to-file';
import { QueryTweetsHelper } from './query-tweets-helper';

export async function cloneTwitterDataToFile(apiToken: string) {
  console.log('FETCH TWITTER')
  const queryHelper = new QueryTweetsHelper();
  const allGames = await queryHelper.queryAllTweets(apiToken);

  writeToFile(allGames, 'all-tweets.json');

  return allGames;
}
