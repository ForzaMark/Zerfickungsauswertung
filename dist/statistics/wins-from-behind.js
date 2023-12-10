"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWinsFromBehind = void 0;
var is_goal_event_1 = require("./util/is-goal-event");
var is_win_from_behind_1 = require("./util/is-win-from-behind");
function createWinsFromBehind() {
    return {
        title: 'Community Questions',
        description: 'Zerfickung nach Rückstand',
        getGame: getGameWithWinFromBehind
    };
}
exports.createWinsFromBehind = createWinsFromBehind;
function getGameWithWinFromBehind(_allTweets, allFixturesWithEvents) {
    var winsFromBehind = allFixturesWithEvents
        .flatMap(function (fixturesAndEvents) { return fixturesAndEvents.fixtures; })
        .filter(function (fixture) {
        var winningSideId = fixture.fixture.score.fulltime.home > fixture.fixture.score.fulltime.away
            ? fixture.fixture.teams.home.id
            : fixture.fixture.teams.away.id;
        var goalEvents = fixture.events.filter(is_goal_event_1.isGoalEvent);
        return (0, is_win_from_behind_1.isWinFromBehind)(goalEvents, winningSideId);
    });
    return {
        tweetText: "Anzahl Zerfickungen nach R\u00FCckstand: ".concat(winsFromBehind.length)
    };
}
