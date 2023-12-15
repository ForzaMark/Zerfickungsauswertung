import { delayPromise } from '../util/delay-promise';
import { writeToFile } from '../util/write-to-file';
import {
  FixtureAndEventsResponseModel,
  getEventsOfAllFixturesOfDate
} from './query-api-football';

export async function cloneApiFootballDataToFile(allDates: ReadonlySet<string>, apiKey: string) {
  console.log('FETCH API-FOOTBALL');
  
  const result: Array<FixtureAndEventsResponseModel> = [];

  let requestRateLimit = 0;
  let currentRequestNumber = 0;

  for (const day of Array.from(allDates)) {
    let withEvents: FixtureAndEventsResponseModel;

    if (requestRateLimit > 250) {
      writeToFile(result, `temp-data/${currentRequestNumber}.json`);
      const delay = delayPromise(60000);
      withEvents = await delay.then(() =>
        getEventsOfAllFixturesOfDate(new Date(day), apiKey)
      );
      requestRateLimit = 0;
    } else {
      withEvents = await getEventsOfAllFixturesOfDate(new Date(day), apiKey);
    }

    requestRateLimit = requestRateLimit + (withEvents.fixtures.length + 1);
    currentRequestNumber = currentRequestNumber + (withEvents.fixtures.length + 1);

    console.log('status: ', `${(currentRequestNumber / 3500) * 100} %`);

    result.push(withEvents);
  }

  writeToFile(result, 'all-fixtures-and-events.json');
}
