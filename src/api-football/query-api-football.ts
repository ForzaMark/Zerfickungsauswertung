import { FixtureEventResponseModel, FixturesResponseModel } from './types';
import axios from 'axios';

export interface FixtureAndEventsResponseModel {
  date: string;
  fixtures: Array<{
    fixture: FixturesResponseModel['response'][number];
    events: FixtureEventResponseModel['response'];
  }>;
}

export async function getEventsOfAllFixturesOfDate(
  date: Date,
  apiKey: string
): Promise<FixtureAndEventsResponseModel> {
  const requestDate = date.toISOString().split('T')[0];

  const fixtures: FixturesResponseModel = (await queryFixturesByDate(requestDate, apiKey))
    .data;

  const filterIsZerfickung = fixtures.response.filter(
    ({ score }) =>
      score.fulltime.home - score.fulltime.away >= 6 ||
      score.fulltime.away - score.fulltime.home >= 6
  );

  const fixtureEvents: Array<{
    fixture: FixturesResponseModel['response'][number];
    events: FixtureEventResponseModel['response'];
  }> = [];

  for (const fixture of filterIsZerfickung) {
    const fixtureEvent: FixtureEventResponseModel = (
      await queryEventsOfFixture(fixture.fixture.id, apiKey)
    ).data;

    fixtureEvents.push({ fixture, events: fixtureEvent.response });
  }

  return { date: date.toString(), fixtures: fixtureEvents };
}

function queryFixturesByDate(date: string, apiKey: string) {
  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
    params: { date },
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  } as const;

  return axios.request<FixturesResponseModel>(options);
}

function queryEventsOfFixture(fixtureId: number, apiKey: string) {
  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures/events',
    params: { fixture: fixtureId },
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  } as const;

  return axios.request<FixtureEventResponseModel>(options);
}
