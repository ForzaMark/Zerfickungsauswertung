"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMinuteOfDecidingGoal = void 0;
function calculateMinuteOfDecidingGoal(winningTeamId, events) {
    var result = events.reduce(function (_a, curr) {
        var currentDifference = _a.currentDifference, minuteOfDecidingGoal = _a.minuteOfDecidingGoal, minuteOfFirstGoal = _a.minuteOfFirstGoal;
        var isWinningTeamGoal = curr.team.id === winningTeamId;
        var updatedCurrentDifference = isWinningTeamGoal
            ? currentDifference + 1
            : currentDifference - 1;
        return {
            currentDifference: updatedCurrentDifference,
            minuteOfDecidingGoal: updatedCurrentDifference === 6 ? curr.time.elapsed : minuteOfDecidingGoal,
            minuteOfFirstGoal: minuteOfFirstGoal || curr.time.elapsed
        };
    }, {
        minuteOfDecidingGoal: undefined,
        minuteOfFirstGoal: undefined,
        currentDifference: 0
    });
    return result.minuteOfDecidingGoal && result.minuteOfFirstGoal
        ? {
            minuteOfDecidingGoal: result.minuteOfDecidingGoal,
            minuteOfFirstGoal: result.minuteOfFirstGoal
        }
        : undefined;
}
exports.calculateMinuteOfDecidingGoal = calculateMinuteOfDecidingGoal;
