"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var calculate_minute_of_deciding_goal_1 = require("./calculate-minute-of-deciding-goal");
var testCases = [
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
var _loop_1 = function (input, expected, description) {
    test(description, function () {
        var winningSideId = 1;
        var looserSideId = 2;
        var goalEvents = transformToGoalEvent(input.goalEvents, {
            winningSideId: winningSideId,
            looserSideId: looserSideId
        });
        var result = (0, calculate_minute_of_deciding_goal_1.calculateMinuteOfDecidingGoal)(winningSideId, goalEvents);
        expect(result === null || result === void 0 ? void 0 : result.minuteOfDecidingGoal).toEqual(expected);
    });
};
for (var _i = 0, testCases_1 = testCases; _i < testCases_1.length; _i++) {
    var _a = testCases_1[_i], input = _a.input, expected = _a.expected, description = _a.description;
    _loop_1(input, expected, description);
}
function transformToGoalEvent(input, teamIds) {
    return input.map(function (_a) {
        var timeElapsed = _a.timeElapsed, team = _a.team;
        return ({
            time: {
                elapsed: timeElapsed
            },
            team: {
                id: team === 'winnerTeam' ? teamIds.winningSideId : teamIds.looserSideId,
                name: team
            }
        });
    });
}
