"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_win_from_behind_1 = require("./is-win-from-behind");
var testCases = [
    {
        description: 'not win from behind when no looser team goals',
        input: {
            goalEvents: [
                'winningTeamGoal',
                'winningTeamGoal',
                'winningTeamGoal',
                'winningTeamGoal',
                'winningTeamGoal',
                'winningTeamGoal',
                'winningTeamGoal'
            ]
        },
        expected: false
    },
    {
        description: 'not win from behind when looser never lead',
        input: {
            goalEvents: [
                'winningTeamGoal',
                'winningTeamGoal',
                'winningTeamGoal',
                'looserTeamGoal',
                'looserTeamGoal',
                'winningTeamGoal',
                'winningTeamGoal'
            ]
        },
        expected: false
    },
    {
        description: 'win from behind',
        input: {
            goalEvents: [
                'looserTeamGoal',
                'winningTeamGoal',
                'winningTeamGoal',
                'winningTeamGoal',
                'winningTeamGoal'
            ]
        },
        expected: true
    }
];
var _loop_1 = function (input, expected, description) {
    test(description, function () {
        var winningSideId = 1;
        var goalEvents = transformToGoalEvents(input.goalEvents, winningSideId);
        var result = (0, is_win_from_behind_1.isWinFromBehind)(goalEvents, winningSideId);
        expect(result).toEqual(expected);
    });
};
for (var _i = 0, testCases_1 = testCases; _i < testCases_1.length; _i++) {
    var _a = testCases_1[_i], input = _a.input, expected = _a.expected, description = _a.description;
    _loop_1(input, expected, description);
}
function transformToGoalEvents(goalEvents, winningSideId) {
    return goalEvents.map(function (event) {
        return event === 'winningTeamGoal'
            ? {
                team: {
                    id: winningSideId,
                    name: 'winnner'
                }
            }
            : {
                team: {
                    id: 2,
                    name: 'looser'
                }
            };
    });
}
