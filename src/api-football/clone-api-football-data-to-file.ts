import { delayPromise } from "../util/delay-promise";
import { writeToFile } from "../util/write-to-file";
import {
  FixtureAndEventsResponseModel,
  getEventsOfAllFixturesOfDate,
} from "./query-api-football";

export async function cloneApiFootballDataToFile(
  allDates: ReadonlySet<string>,
  apiKey: string
) {
  console.log("FETCH API-FOOTBALL");

  const result: Array<FixtureAndEventsResponseModel> = [];
  const errors: Array<any> = [];

  let requestRateLimit = 0;
  let currentRequestNumber = 0;

  for (const day of Array.from(allDates)) {
    let withEvents:
      | { hasError: true; day: any }
      | { hasError: false; response: FixtureAndEventsResponseModel };

    if (requestRateLimit > 250) {
      writeToFile(result, `temp-data/${currentRequestNumber}.json`);
      const delay = delayPromise(60000);
      withEvents = await delay.then(() =>
        getEventsOfAllFixturesOfDate(new Date(day), apiKey)
          .then((response) => ({ hasError: false, response } as const))
          .catch(() => ({ hasError: true, day }))
      );
      requestRateLimit = 0;
    } else {
      withEvents = await getEventsOfAllFixturesOfDate(new Date(day), apiKey)
        .then((response) => ({ hasError: false, response } as const))
        .catch(() => ({ hasError: true, day }));
    }

    requestRateLimit = requestRateLimit + ((!withEvents.hasError ? withEvents.response.fixtures.length : 30) + 1);
    currentRequestNumber =
      currentRequestNumber + ((!withEvents.hasError ? withEvents.response.fixtures.length : 30) + 1);

    console.log("status: ", `${(currentRequestNumber / 3500) * 100} %`);

    if (!withEvents.hasError) {
      result.push(withEvents.response);      
    } else {
      errors.push(JSON.stringify(withEvents))
    }
  }

  writeToFile(errors, "errors.txt")
  writeToFile(result, "all-fixtures-and-events.json");
}
