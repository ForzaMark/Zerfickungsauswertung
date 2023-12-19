import { FixtureEventResponseModel, FixturesResponseModel } from "./types";
import fetch from "node-fetch";

export interface FixtureAndEventsResponseModel {
  date: string;
  fixtures: Array<{
    fixture: FixturesResponseModel["response"][number];
    events: FixtureEventResponseModel["response"];
  }>;
}

export async function getEventsOfAllFixturesOfDate(
  date: Date,
  apiKey: string
): Promise<FixtureAndEventsResponseModel> {
  const requestDate = date.toISOString().split("T")[0];


  // perhabs use agent for timeout problem: https://stackoverflow.com/questions/62500011/reuse-tcp-connection-with-node-fetch-in-node-js
  // or timeout property, whatever it means

  const fixtures: FixturesResponseModel = await (await queryFixturesByDate(requestDate, apiKey)).json();
  const filterIsZerfickung = fixtures.response.filter(
    ({ score }) =>
      score.fulltime.home - score.fulltime.away >= 6 ||
      score.fulltime.away - score.fulltime.home >= 6
  );

  const fixtureEvents: Array<{
    fixture: FixturesResponseModel["response"][number];
    events: FixtureEventResponseModel["response"];
  }> = [];

  for (const fixture of filterIsZerfickung) {
    const fixtureEvent: FixtureEventResponseModel = await (
      await queryEventsOfFixture(fixture.fixture.id, apiKey)
    ).json();

    fixtureEvents.push({ fixture, events: fixtureEvent.response });
  }

  return { date: date.toString(), fixtures: fixtureEvents };
}

function queryFixturesByDate(date: string, apiKey: string) {
  const response = fetch(
    `https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${date}`,
    {
      method: "get",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    }
  );

  return response;
} 

function queryEventsOfFixture(fixtureId: number, apiKey: string) {


  const response = fetch(
    `https://api-football-v1.p.rapidapi.com/v3/fixtures/events??fixture=${fixtureId}`,
    {
      method: "get",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    }
  );

  return response;
}
