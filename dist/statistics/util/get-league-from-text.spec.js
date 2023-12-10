"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_league_from_text_1 = require("./get-league-from-text");
var testCases = [
    {
        input: '  Zerfickungsalarm 📢\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n🇩🇪 Germany (Bundes  liga 1)\n\n⚽ Borussia Dortmund 6:0 Borussia Monchengladbach',
        expected: '🇩🇪 Germany (Bundes  liga 1)'
    },
    {
        input: '📢 Zerfickungsalarm 📢\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n🇸🇪 Sweden (Divi  sion 2 - Norra Svealand)\n\n⚽ Akropolis 0:28 Stocksund',
        expected: '🇸🇪 Sweden (Divi  sion 2 - Norra Svealand)'
    }
];
test('tests extraction', function () {
    for (var _i = 0, testCases_1 = testCases; _i < testCases_1.length; _i++) {
        var _a = testCases_1[_i], input = _a.input, expected = _a.expected;
        var result = (0, get_league_from_text_1.getLeagueFromText)(input);
        expect(result).toEqual(expected);
    }
});
