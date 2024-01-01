import { getAllStatistics } from "./statistics/get-all-statistics";
import { cloneApiFootballDataToFile } from "./api-football/clone-api-football-data-to-file";
import { readApiFootballData } from "./api-football/read-api-football-data";
import chalk from "chalk";
import { getAllDatesOfYear } from "./util/get-all-dates-of-year";

const API_FOOTBALL_API_KEY = process.env.API_FOOTBALL_KEY;
const CURRENT_YEAR = Number(process.env.CURRENT_YEAR);
const EXECUTION_MODE = process.argv[2];

export async function main() {
  if (API_FOOTBALL_API_KEY && CURRENT_YEAR) {
    
    if (EXECUTION_MODE === 'fetch') {
      await cloneDataToFile(API_FOOTBALL_API_KEY);      
    }

    const statistics = getAllStatistics();

    const apiFootballData = readApiFootballData();

    for (const { title, description, getGame } of statistics) {
      const { tweetText, additionalInformation } = getGame(apiFootballData);
      printResult({ title, description, tweetText, additionalInformation });
    }
  } else {
    console.error(
      "Unable to start application because api keys or year were not provided"
    );
  }
}

main();

async function cloneDataToFile(apiFootballApiKey: string) {
  await cloneApiFootballDataToFile(
    getAllDatesOfYear(CURRENT_YEAR, new Date(2023, 2, 10)),
    apiFootballApiKey
  );
}

function printResult({
  title,
  description,
  tweetText,
  additionalInformation,
}: {
  title: string;
  description: string;
  tweetText: string;
  additionalInformation: unknown;
}) {
  console.log("-".repeat(process.stdout.columns));
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
