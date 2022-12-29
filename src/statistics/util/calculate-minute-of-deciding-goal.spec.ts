import { GoalEvent } from '../types/types';
import { calculateMinuteOfDecidingGoal } from './calculate-minute-of-deciding-goal';

interface TestCase {
  input: { events: ReadonlyArray<GoalEvent>; winningSideId: number };
  expected: number;
}

const baseGoalEvent: GoalEvent = {
  detail: 'Normal Goal',
  type: 'Goal',
  time: {
    elapsed: 0
  },
  player: {
    id: 1,
    name: 'testPlayer'
  },
  team: {
    id: 1,
    name: 'testTeam'
  }
};

const testCases: ReadonlyArray<TestCase> = [
  {
    input: {
      winningSideId: 123,
      events: [
        {
          ...baseGoalEvent,
          time: {
            elapsed: 1
          },
          team: {
            id: 123,
            name: 'winnerTeam'
          }
        },
        {
          ...baseGoalEvent,
          time: {
            elapsed: 2
          },
          team: {
            id: 123,
            name: 'winnerTeam'
          }
        },
        {
          ...baseGoalEvent,
          time: {
            elapsed: 3
          },
          team: {
            id: 123,
            name: 'winnerTeam'
          }
        },
        {
          ...baseGoalEvent,
          time: {
            elapsed: 4
          },
          team: {
            id: 123,
            name: 'winnerTeam'
          }
        },
        {
          ...baseGoalEvent,
          time: {
            elapsed: 5
          },
          team: {
            id: 123,
            name: 'winnerTeam'
          }
        },
        {
          ...baseGoalEvent,
          time: {
            elapsed: 6
          },
          team: {
            id: 123,
            name: 'winnerTeam'
          }
        }
      ]
    },
    expected: 6
  },
  {
    input: {
      winningSideId: 123,
      events: [
        {
          ...baseGoalEvent,
          time: {
            elapsed: 1
          },
          team: {
            id: 123,
            name: 'winnerTeam'
          }
        },
        {
          ...baseGoalEvent,
          time: {
            elapsed: 2
          },
          team: {
            id: 123,
            name: 'winnerTeam'
          }
        },
        {
          ...baseGoalEvent,
          time: {
            elapsed: 3
          },
          team: {
            id: 123,
            name: 'winnerTeam'
          }
        },
        {
          ...baseGoalEvent,
          time: {
            elapsed: 4
          },
          team: {
            id: 123,
            name: 'winnerTeam'
          }
        },
        {
          ...baseGoalEvent,
          time: {
            elapsed: 5
          },
          team: {
            id: 123,
            name: 'winnerTeam'
          }
        },
        {
          ...baseGoalEvent,
          time: {
            elapsed: 6
          },
          team: {
            id: 123,
            name: 'winnerTeam'
          }
        },
        {
            ...baseGoalEvent,
            time: {
              elapsed: 7
            },
            team: {
              id: 456,
              name: 'looserTeam'
            }
          },
          {
            ...baseGoalEvent,
            time: {
              elapsed: 8
            },
            team: {
              id: 123,
              name: 'winnerTeam'
            }
          }
      ]
    },
    expected: 8
  }
];

test('tests wins from behind', () => {
  for (const { input, expected } of testCases) {
    const result = calculateMinuteOfDecidingGoal(input.winningSideId, input.events);

    expect(result).toEqual(expected);
  }
});
