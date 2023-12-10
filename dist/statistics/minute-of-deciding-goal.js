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
exports.createMinuteOfDecidingGoal = void 0;
var calculate_minute_of_deciding_goal_1 = require("./util/calculate-minute-of-deciding-goal");
var is_goal_event_1 = require("./util/is-goal-event");
function createMinuteOfDecidingGoal() {
    return {
        title: 'Community Questions',
        description: 'Minute des Zerfickungstores',
        getGame: getMinuteOfDecidingGoal
    };
}
exports.createMinuteOfDecidingGoal = createMinuteOfDecidingGoal;
function getMinuteOfDecidingGoal(_allTweets, allFixturesWithEvents) {
    var minuteOfDeciding = allFixturesWithEvents
        .flatMap(function (value) { return value.fixtures; })
        .map(function (_a) {
        var _b;
        var fixture = _a.fixture, events = _a.events;
        var winningTeamId = fixture.score.fulltime.home > fixture.score.fulltime.away
            ? fixture.teams.home.id
            : fixture.teams.away.id;
        var goalEvents = events.filter(is_goal_event_1.isGoalEvent);
        return (_b = (0, calculate_minute_of_deciding_goal_1.calculateMinuteOfDecidingGoal)(winningTeamId, goalEvents)) === null || _b === void 0 ? void 0 : _b.minuteOfDecidingGoal;
    })
        .filter(function (value) { return value !== undefined; });
    var avg = minuteOfDeciding.reduce(function (acc, curr) { return acc + curr; }, 0) / minuteOfDeciding.length;
    var detailedCalculations = minuteOfDeciding.reduce(function (acc, curr) {
        var _a;
        var slice = Math.floor(curr / 10) * 10;
        return __assign(__assign({}, acc), (_a = {}, _a[slice] = acc[slice] + 1, _a));
    }, {
        0: 0,
        10: 0,
        20: 0,
        30: 0,
        40: 0,
        50: 0,
        60: 0,
        70: 0,
        80: 0,
        90: 0,
        100: 0
    });
    return {
        tweetText: "Durchschnittliche Minute: ".concat(avg),
        additionalInformation: {
            avg: avg,
            detailedCalculations: detailedCalculations
        }
    };
}
