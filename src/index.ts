import allTweets from './twitter/all-tweets.json';
import { getAllStatistics } from './statistics/get-all-statistics';
import { QueryTweetsHelper } from './twitter/query-tweets-helper';
import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import {
  FixtureAndEventsResponseModel,
  getEventsOfAllFixturesOfDate
} from './api-football/query-api-football';
import { delayPromise } from './util/delay-promise';

const API_FOOTBALL_API_KEY = process.env.API_FOOTBALL_KEY;
const TWITTER_API_KEY = process.env.TWITTER_API_KEY;

async function writeAllTweetsToFile(apiToken: string) {
  const queryHelper = new QueryTweetsHelper();
  const allGames = await queryHelper.queryAllTweets(apiToken);

  const path = join(__dirname, '../src/twitter/all-tweets.json');

  writeFileSync(path, JSON.stringify(allGames), {
    flag: 'w'
  });
}

export async function main() {
  const executionMode = process.argv[2];

  if (executionMode === 'fetchAll' || executionMode === 'fetchTwitter') {
    console.log('FETCH TWITTER');
    if (TWITTER_API_KEY) {
      await writeAllTweetsToFile(TWITTER_API_KEY);
    } else {
      console.error('Unable to query twitter data. Twitter Api Token was not provided.')
    }
  }

  if (executionMode === 'fetchAll' || executionMode === 'fetchApiFootball') {
    console.log('FETCH API-FOOTBALL');
    if (API_FOOTBALL_API_KEY) {
      await writeAllApiFootballDataToFile(API_FOOTBALL_API_KEY);
    } else {
      console.error('Unable to query api football data. ApiKey was not provided');
    }
  }

  const statistics = getAllStatistics();
  const allFixturesWithEvents = readFixturesWithEvents();

  for (const { title, description, getGame } of statistics) {
    const { tweetText, additionalInformation } = getGame(
      allTweets,
      allFixturesWithEvents
    );
    console.log(`
    ---------------------------------
    Title: ${title}
    Description: ${description}
    Game: ${JSON.stringify(tweetText)}
    ${
      additionalInformation
        ? `Additional info: ${JSON.stringify(additionalInformation)}`
        : ``
    }
    `);
  }
}

async function writeAllApiFootballDataToFile(apiKey: string) {
  const allDays = getAllDates();

  const result: Array<FixtureAndEventsResponseModel> = [];

  let requestRateLimit = 0;
  let currentRequestNumber = 0;

  for (const day of Array.from(allDays)) {
    let withEvents: FixtureAndEventsResponseModel;

    if (requestRateLimit > 250) {
      writeToFile(result, { mode: 'backup', number: currentRequestNumber });
      const delay = delayPromise(60000);
      withEvents = await delay.then(() =>
        getEventsOfAllFixturesOfDate(new Date(day), apiKey)
      );
      requestRateLimit = 0;
    } else {
      withEvents = await getEventsOfAllFixturesOfDate(
        new Date(day),
        apiKey
      );
    }

    requestRateLimit = requestRateLimit + (withEvents.fixtures.length + 1);
    currentRequestNumber = currentRequestNumber + (withEvents.fixtures.length + 1);

    console.log('status: ', `${(currentRequestNumber / 3500) * 100} %`);

    result.push(withEvents);
  }

  writeToFile(result, { mode: 'final' });
}

function getAllDates() {
  const allDays = allTweets.map(({ tweet }) => tweet.created_at.split('T')[0]);
  return new Set(allDays);
}

function writeToFile(
  fixturesAndEventsByDays: Array<FixtureAndEventsResponseModel>,
  options:
    | {
        mode: 'final';
      }
    | {
        mode: 'backup';
        number: number;
      }
) {
  if (options.mode === 'final') {
    const path = join(__dirname, '../src/api-football/all-fixtures-and-events.json');

    writeFileSync(path, JSON.stringify(fixturesAndEventsByDays), {
      flag: 'w'
    });
  } else {
    const path = join(__dirname, `../src/api-football/temp-data/${options.number}.json`);

    writeFileSync(path, JSON.stringify(fixturesAndEventsByDays), {
      flag: 'w'
    });
  }
}

function readFixturesWithEvents() {
  const path = join(__dirname, '../src/api-football/all-fixtures-and-events.json');

  return JSON.parse(readFileSync(path, 'utf-8'));
}

main();
