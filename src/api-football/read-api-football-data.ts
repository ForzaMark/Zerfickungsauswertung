import { readFileSync } from 'fs';
import { join } from 'path';
import { FixtureAndEventsResponseModel } from './query-api-football';

export function readApiFootballData(): ReadonlyArray<FixtureAndEventsResponseModel> {
  return readFixturesWithEvents();
}

function readFixturesWithEvents() {
  const path = join(__dirname, '../../data-files/all-fixtures-and-events.json');

  return JSON.parse(readFileSync(path, 'utf-8'));
}
