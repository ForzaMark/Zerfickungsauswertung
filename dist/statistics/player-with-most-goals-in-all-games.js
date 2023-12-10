"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGetPlayerWithMostGoalsInAllGames = void 0;
var is_goal_event_1 = require("./util/is-goal-event");
function createGetPlayerWithMostGoalsInAllGames() {
    return {
        title: 'Herr Zerficker',
        description: 'Spieler mit den meisten Toren in allen Zerfickung',
        getGame: getPlayerWithMostGoals
    };
}
exports.createGetPlayerWithMostGoalsInAllGames = createGetPlayerWithMostGoalsInAllGames;
function getPlayerWithMostGoals(_allTweets, allFixturesWithEvents) {
    var allGoalScorer = allFixturesWithEvents.flatMap(function (fixturesAndEvents) {
        return fixturesAndEvents.fixtures.flatMap(function (_a) {
            var fixture = _a.fixture, events = _a.events;
            if (fixture.score.fulltime.home > fixture.score.fulltime.away) {
                return events
                    .filter(is_goal_event_1.isGoalEvent)
                    .filter(function (event) { return isTeamEvent(event, fixture.teams.home.id); })
                    .map(function (event) { return "".concat(event.player.name, "-").concat(event.player.id, "-").concat(event.team.name); });
            }
            else {
                return events
                    .filter(is_goal_event_1.isGoalEvent)
                    .filter(function (event) { return isTeamEvent(event, fixture.teams.away.id); })
                    .map(function (event) { return "".concat(event.player.name, "-").concat(event.player.id, "-").concat(event.team.name); });
            }
        });
    });
    var goalScorersByCount = allGoalScorer.reduce(function (acc, curr) {
        var _a, _b;
        return acc[curr]
            ? __assign(__assign({}, acc), (_a = {}, _a[curr] = acc[curr] + 1, _a)) : __assign(__assign({}, acc), (_b = {}, _b[curr] = 1, _b));
    }, {});
    var filtered = Object.entries(goalScorersByCount)
        .filter(function (_a) {
        var _key = _a[0], value = _a[1];
        return value > 15;
    })
        .sort(function (a, b) { return b[1] - a[1]; });
    return {
        tweetText: "Der Zerficker: ".concat(filtered[0][0]),
        additionalInformation: filtered
    };
}
function isTeamEvent(goalEvent, teamId) {
    return goalEvent.team.id === teamId;
}
