"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLowestTimeDifferenceBetweenGoals = void 0;
var calculate_minute_of_deciding_goal_1 = require("./util/calculate-minute-of-deciding-goal");
var is_goal_event_1 = require("./util/is-goal-event");
function createLowestTimeDifferenceBetweenGoals() {
    return {
        title: 'Community Questions',
        description: 'Kleinste Zeitdifferenz zwischen erstem und entscheidendem Tor',
        getGame: getLowestTimeDifferenceBetweenGoals
    };
}
exports.createLowestTimeDifferenceBetweenGoals = createLowestTimeDifferenceBetweenGoals;
function getLowestTimeDifferenceBetweenGoals(_allTweets, allFixturesWithEvents) {
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
            differenceGoalMinutes: ((minuteValues === null || minuteValues === void 0 ? void 0 : minuteValues.minuteOfDecidingGoal) || 0) -
                ((minuteValues === null || minuteValues === void 0 ? void 0 : minuteValues.minuteOfFirstGoal) || 0),
            fixture: "".concat(fixture.fixture.id, ": ").concat(fixture.teams.home.name, " ").concat(fixture.score.fulltime.home, " : ").concat(fixture.score.fulltime.away, " ").concat(fixture.teams.away.name)
        };
        return result;
    })
        .filter(function (value) { return value.differenceGoalMinutes !== undefined && value.differenceGoalMinutes !== 0; });
    var filtered = result
        .filter(function (_a) {
        var differenceGoalMinutes = _a.differenceGoalMinutes;
        return differenceGoalMinutes < 13;
    })
        .sort(function (a, b) { return a.differenceGoalMinutes - b.differenceGoalMinutes; });
    return {
        tweetText: "".concat(filtered[0].fixture, " - Minute : ").concat(filtered[0].differenceGoalMinutes),
        additionalInformation: filtered
    };
}
