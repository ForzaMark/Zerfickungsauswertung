"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWinFromBehind = void 0;
function isWinFromBehind(goalEvents, winningSideTeamId) {
    var subResults = goalEvents.reduce(function (acc, _a) {
        var team = _a.team;
        if (!acc.isWinFromBehind) {
            var isWinningTeamGoal = team.id === winningSideTeamId;
            var currentDifference = isWinningTeamGoal
                ? acc.currentDifference + 1
                : acc.currentDifference - 1;
            return { currentDifference: currentDifference, isWinFromBehind: currentDifference < 0 };
        }
        else {
            return { currentDifference: 0, isWinFromBehind: true };
        }
    }, { currentDifference: 0, isWinFromBehind: false });
    return subResults.isWinFromBehind;
}
exports.isWinFromBehind = isWinFromBehind;
