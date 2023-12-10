import { GoalEvent } from '../types/types';
import { calculateMinuteOfDecidingGoal } from './calculate-minute-of-deciding-goal';

interface TestGoalEvent {
  timeElapsed: number;
  team: 'winnerTeam' | 'looserTeam';
}

interface TestCase {
  description: string;
  input: {
    goalEvents: ReadonlyArray<TestGoalEvent>;
  };
  expected: number;
}

const testCases: ReadonlyArray<TestCase> = [
  {
    description: 'gets correct time after deciding goal',
    input: {
      goalEvents: [
        {
          timeElapsed: 1,
          team: 'winnerTeam'
        },
        {
          timeElapsed: 2,
          team: 'winnerTeam'
        },
        {
          timeElapsed: 3,
          team: 'winnerTeam'
        },
        {
          timeElapsed: 4,
          team: 'winnerTeam'
        },
        {
          timeElapsed: 5,
          team: 'winnerTeam'
        },
        {
          timeElapsed: 6,
          team: 'winnerTeam'
        }
      ]
    },
    expected: 6
  },
  {
    description: 'gets correct time when opponent scores in between',
    input: {
      goalEvents: [
        {
          timeElapsed: 1,
          team: 'winnerTeam'
        },
        {
          timeElapsed: 2,
          team: 'winnerTeam'
        },
        {
          timeElapsed: 3,
          team: 'winnerTeam'
        },
        {
          timeElapsed: 4,
          team: 'winnerTeam'
        },
        {
          timeElapsed: 5,
          team: 'winnerTeam'
        },
        {
          timeElapsed: 6,
          team: 'winnerTeam'
        },
        {
          timeElapsed: 7,
          team: 'looserTeam'
        },
        {
          timeElapsed: 8,
          team: 'winnerTeam'
        }
      ]
    },
    expected: 8
  }
];
for (const { input, expected, description } of testCases) {
  test(description, () => {
    const winningSideId = 1;
    const looserSideId = 2;

    const goalEvents = transformToGoalEvent(input.goalEvents, {
      winningSideId,
      looserSideId
    });

    const result = calculateMinuteOfDecidingGoal(winningSideId, goalEvents);

    expect(result?.minuteOfDecidingGoal).toEqual(expected);
  });
}

function transformToGoalEvent(
  input: ReadonlyArray<TestGoalEvent>,
  teamIds: { winningSideId: number; looserSideId: number }
): ReadonlyArray<Pick<GoalEvent, 'time' | 'team'>> {
  return input.map(({ timeElapsed, team }) => ({
    time: {
      elapsed: timeElapsed
    },
    team: {
      id: team === 'winnerTeam' ? teamIds.winningSideId : teamIds.looserSideId,
      name: team
    }
  }));
}
