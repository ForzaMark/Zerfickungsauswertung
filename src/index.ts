import { getAllStatistics } from './statistics/get-all-statistics';
import { cloneApiFootballDataToFile } from './api-football/clone-api-football-data-to-file';
import { getAllTweetDates } from './twitter/get-all-tweet-dates';
import { cloneTwitterDataToFile } from './twitter/clone-twitter-data-to-file';
import { readTwitterData } from './twitter/read-twitter-data';
import { readApiFootballData } from './api-football/read-api-football-data';
import chalk from 'chalk';
import { getAllDatesOfYear } from './util/get-all-dates-of-year';

const API_FOOTBALL_API_KEY = process.env.API_FOOTBALL_KEY;
const TWITTER_API_KEY = process.env.TWITTER_API_KEY;
const CURRENT_YEAR = Number(process.env.YEAR);

export async function main() {
  if (API_FOOTBALL_API_KEY && TWITTER_API_KEY) {
    await cloneDataToFile(TWITTER_API_KEY, API_FOOTBALL_API_KEY);

    const statistics = getAllStatistics();

    const tweets = readTwitterData();
    const apiFootballData = readApiFootballData();

    for (const { title, description, getGame } of statistics) {
      const { tweetText, additionalInformation } = getGame(tweets, apiFootballData);
      printResult({ title, description, tweetText, additionalInformation });
    }
  } else {
    console.error('Unable to start application because api keys are not provided');
  }
}

main();

async function cloneDataToFile(twitterApiKey: string, apiFootballApiKey: string) {

  const executionMode = process.argv[2];

  switch (executionMode) {
    case 'fetchTwitter':
      await cloneTwitterDataToFile(twitterApiKey, CURRENT_YEAR);
      break;

    case 'fetchApiFootball':
      await cloneApiFootballDataToFile(getAllDatesOfYear(CURRENT_YEAR), apiFootballApiKey);
      break;

    case 'fetchAll':
      const allTweets = await cloneTwitterDataToFile(twitterApiKey, CURRENT_YEAR);
      await cloneApiFootballDataToFile(getAllTweetDates(allTweets), apiFootballApiKey);
      break;

    default:
      break;
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
