import { writeToFile } from '../util/write-to-file';
import { QueryTweetsHelper } from './query-tweets-helper';

export async function cloneTwitterDataToFile(apiToken: string) {
  const queryHelper = new QueryTweetsHelper();
  const allGames = await queryHelper.queryAllTweets(apiToken);

  writeToFile(JSON.stringify(allGames), './all-tweets.json');
}
