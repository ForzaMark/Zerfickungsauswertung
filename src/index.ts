import { getAllStatistics } from './statistics/get-all-statistics';
import { cloneApiFootballDataToFile } from './api-football/clone-api-football-data-to-file';
import { getAllTweetDates } from './twitter/get-all-tweet-dates';
import { cloneTwitterDataToFile } from './twitter/clone-twitter-data-to-file';
import { readTwitterData } from './twitter/read-twitter-data';
import { readApiFootballData } from './api-football/read-api-football-data';
import chalk from 'chalk';

const API_FOOTBALL_API_KEY = process.env.API_FOOTBALL_KEY;
const TWITTER_API_KEY = process.env.TWITTER_API_KEY;

export async function main() {
  await cloneDataToFile();

  const statistics = getAllStatistics();

  const tweets = readTwitterData();
  const apiFootballData = readApiFootballData();

  for (const { title, description, getGame } of statistics) {
    const { tweetText, additionalInformation } = getGame(tweets, apiFootballData);
    printResult({ title, description, tweetText, additionalInformation });
  }
}

main();

async function cloneDataToFile() {
  const executionMode = process.argv[2];

  if (executionMode === 'fetchAll' || executionMode === 'fetchTwitter') {
    console.log('FETCH TWITTER');
    if (TWITTER_API_KEY) {
      await cloneTwitterDataToFile(TWITTER_API_KEY);
    } else {
      console.error('Unable to clone twitter data. Twitter Api Token was not provided.');
    }
  }

  if (executionMode === 'fetchAll' || executionMode === 'fetchApiFootball') {
    console.log('FETCH API-FOOTBALL');
    if (API_FOOTBALL_API_KEY) {
      await cloneApiFootballDataToFile(getAllTweetDates(), API_FOOTBALL_API_KEY);
    } else {
      console.error('Unable to clone api football data. ApiKey was not provided');
    }
  }
}

function printResult({
  title,
  description,
  tweetText,
  additionalInformation
}: {
  title: string;
  description: string;
  tweetText: string;
  additionalInformation: unknown;
}) {
  console.log('-'.repeat(process.stdout.columns));
  console.log(chalk.yellowBright(`Title: ${title}`));
  console.log(
    `
      Description: ${description}
      Text: ${tweetText}
      ${
        additionalInformation
          ? `Additional info: ${JSON.stringify(additionalInformation, null, 4)}`
          : ``
      }
  `
  );
}
