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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompetitionClassification = void 0;
var api_football_league_lookup_json_1 = __importDefault(require("../api-football/api-football-league.lookup.json"));
function createCompetitionClassification() {
    return {
        title: 'Allgemein',
        description: 'Anteil verschiedene Wettbewerbe',
        getGame: getCompetitionClassification
    };
}
exports.createCompetitionClassification = createCompetitionClassification;
function getCompetitionClassification(_allTweets, fixturesWithEvents) {
    var allGamesLeagueIds = fixturesWithEvents.flatMap(function (_a) {
        var fixtures = _a.fixtures;
        return fixtures.map(function (fixture) { return fixture.fixture.league.id; });
    });
    var competitions = allGamesLeagueIds.reduce(function (acc, curr) {
        var _a, _b;
        var leagueLookupObject = api_football_league_lookup_json_1.default;
        var competitionType = leagueLookupObject["".concat(curr)];
        if (competitionType) {
            return acc[competitionType]
                ? __assign(__assign({}, acc), (_a = {}, _a[competitionType] = acc[competitionType] + 1, _a)) : __assign(__assign({}, acc), (_b = {}, _b[competitionType] = 1, _b));
        }
        else {
            console.log('no competition found for league', curr);
            return acc;
        }
    }, {});
    var filtered = Object.entries(competitions).sort(function (a, b) { return b[1] - a[1]; });
    return { tweetText: "by Competition: ".concat(JSON.stringify(filtered)) };
}
