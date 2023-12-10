"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLatestMinuteOfFirstGoal = void 0;
var calculate_minute_of_deciding_goal_1 = require("./util/calculate-minute-of-deciding-goal");
var is_goal_event_1 = require("./util/is-goal-event");
function createLatestMinuteOfFirstGoal() {
    return {
        title: 'Community Questions',
        description: 'Späteste Zerfickung',
        getGame: getLatestMinuteOfFirstGoal
    };
}
exports.createLatestMinuteOfFirstGoal = createLatestMinuteOfFirstGoal;
function getLatestMinuteOfFirstGoal(_allTweets, allFixturesWithEvents) {
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
            minuteOfFirstGoal: minuteValues === null || minuteValues === void 0 ? void 0 : minuteValues.minuteOfFirstGoal,
            fixture: "".concat(fixture.fixture.id, ": ").concat(fixture.teams.home.name, " ").concat(fixture.score.fulltime.home, " : ").concat(fixture.score.fulltime.away, " ").concat(fixture.teams.away.name)
        };
        return result;
    })
        .filter(function (value) { return value.minuteOfFirstGoal !== undefined; });
    var filtered = result
        .map(function (_a) {
        var minuteOfFirstGoal = _a.minuteOfFirstGoal, fixture = _a.fixture;
        return ({
            minuteOfFirstGoal: minuteOfFirstGoal,
            fixture: fixture
        });
    })
        .filter(function (_a) {
        var minuteOfFirstGoal = _a.minuteOfFirstGoal;
        return minuteOfFirstGoal > 55;
    })
        .sort(function (a, b) { return b.minuteOfFirstGoal - a.minuteOfFirstGoal; });
    return {
        tweetText: "Sp\u00E4teste Zerfickung: ".concat(filtered[0].fixture, " - Minute : ").concat(filtered[0].minuteOfFirstGoal),
        additionalInformation: filtered
    };
}
