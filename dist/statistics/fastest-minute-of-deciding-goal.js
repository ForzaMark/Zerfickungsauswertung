"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFastestDecidingGoal = void 0;
var calculate_minute_of_deciding_goal_1 = require("./util/calculate-minute-of-deciding-goal");
var is_goal_event_1 = require("./util/is-goal-event");
function createFastestDecidingGoal() {
    return {
        title: 'Community Questions',
        description: 'Schnellste Zerfickung',
        getGame: getFastestDecidingGoal
    };
}
exports.createFastestDecidingGoal = createFastestDecidingGoal;
function getFastestDecidingGoal(_allTweets, allFixturesWithEvents) {
    var result = allFixturesWithEvents
        .flatMap(function (value) { return value.fixtures; })
        .map(function (_a) {
        var fixture = _a.fixture, events = _a.events;
        var winningTeamId = fixture.score.fulltime.home > fixture.score.fulltime.away
            ? fixture.teams.home.id
            : fixture.teams.away.id;
        var goalEvents = events.filter(is_goal_event_1.isGoalEvent);
        var minuteValues = (0, calculate_minute_of_deciding_goal_1.calculateMinuteOfDecidingGoal)(winningTeamId, goalEvents);
        var result = {
            minuteOfDecidingGoal: minuteValues === null || minuteValues === void 0 ? void 0 : minuteValues.minuteOfDecidingGoal,
            fixture: "".concat(fixture.fixture.id, ": ").concat(fixture.teams.home.name, " ").concat(fixture.score.fulltime.home, " : ").concat(fixture.score.fulltime.away, " ").concat(fixture.teams.away.name)
        };
        return result;
    })
        .filter(function (value) { return value.minuteOfDecidingGoal !== undefined; });
    var fastestFiltered = result
        .map(function (_a) {
        var minuteOfDecidingGoal = _a.minuteOfDecidingGoal, fixture = _a.fixture;
        return ({
            minute: minuteOfDecidingGoal,
            fixture: fixture
        });
    })
        .filter(function (_a) {
        var minute = _a.minute;
        return minute < 23;
    })
        .sort(function (a, b) { return a.minute - b.minute; });
    return {
        tweetText: "Schnellste Zerfickung: ".concat(fastestFiltered[0].fixture, " - Minute: ").concat(fastestFiltered[0].minute),
        additionalInformation: fastestFiltered
    };
}
