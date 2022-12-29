import { FixtureAndEventsResponseModel } from '../api-football/query-api-football';
import { isWinFromBehind } from './wins-from-behind';

interface TestCase {
  input: FixtureAndEventsResponseModel['fixtures'][number];
  expected: boolean;
}

const data: FixtureAndEventsResponseModel['fixtures'][number] = {
  fixture: {
    fixture: {
      id: 824046
    },
    league: {
      id: 815
    },
    teams: {
      home: {
        id: 827,
        name: 'IA Akranes'
      },
      away: {
        id: 275,
        name: 'Stjarnan'
      }
    },
    score: {
      fulltime: {
        home: 0,
        away: 6
      }
    }
  },
  events: [
    {
      team: {
        id: 275,
        name: 'Stjarnan'
      },
      player: {
        name: 'E. Atlason'
      },
      type: 'Goal',
      detail: 'Normal Goal'
    },
    {
      team: {
        id: 275,
        name: 'Stjarnan'
      },
      player: {
        name: 'O. Orn'
      },
      type: 'Goal',
      detail: 'Normal Goal'
    },
    {
      team: {
        id: 275,
        name: 'Stjarnan'
      },
      player: {
        name: 'I. A. Sigurgeirsson'
      },
      type: 'Goal',
      detail: 'Normal Goal'
    },
    {
      team: {
        id: 275,
        name: 'Stjarnan'
      },
      player: {
        name: null
      },
      type: 'Goal',
      detail: 'Normal Goal'
    },
    {
      team: {
        id: 275,
        name: 'Stjarnan'
      },
      player: {
        name: 'E. A. Gudmundsson'
      },
      type: 'Goal',
      detail: 'Normal Goal'
    },
    {
      team: {
        id: 275,
        name: 'Stjarnan'
      },
      player: {
        name: 'J. Laxdal'
      },
      type: 'Goal',
      detail: 'Normal Goal'
    }
  ]
};

const testCases: ReadonlyArray<TestCase> = [
  {
    input: data,
    expected: false
  }
];

test('tests wins from behind', () => {
  for (const { input, expected } of testCases) {
    const result = isWinFromBehind(input);

    expect(result).toEqual(expected);
  }
});
