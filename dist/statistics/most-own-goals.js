"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGetMostOwnGoals = void 0;
function createGetMostOwnGoals() {
    return {
        title: 'Brudah, Ich schlag den Ball lang',
        description: 'Zerfickung mit den meisten Eigentoren',
        getGame: getGameWithMostOwnGoals
    };
}
exports.createGetMostOwnGoals = createGetMostOwnGoals;
function getGameWithMostOwnGoals(_allTweets, allFixturesWithEvents) {
    var fixtureWithOwnGoals = allFixturesWithEvents.flatMap(function (fixturesAndEvents) {
        return fixturesAndEvents.fixtures.flatMap(function (_a) {
            var fixture = _a.fixture, events = _a.events;
            var ownGoals = events.filter(isOwnGoalEvent).length;
            return {
                fixture: {
                    homeTeam: fixture.teams.home.name,
                    awayTeam: fixture.teams.away.name,
                    homeScore: fixture.score.fulltime.home,
                    awayScore: fixture.score.fulltime.away
                },
                ownGoals: ownGoals
            };
        });
    });
    var filtered = Object.entries(fixtureWithOwnGoals)
        .filter(function (_a) {
        var _key = _a[0], ownGoals = _a[1].ownGoals;
        return ownGoals > 2;
    })
        .sort(function (a, b) { return b[1].ownGoals - a[1].ownGoals; });
    return {
        tweetText: "Der Zerficker: ".concat(filtered[0][0]),
        additionalInformation: filtered
    };
}
function isOwnGoalEvent(event) {
    return event.type === 'Goal' && event.detail === 'Own Goal';
}
