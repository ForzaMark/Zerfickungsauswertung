import { getLeagueFromText } from "./most-games-league";

const testCases = [
  {
    input:
      '  Zerfickungsalarm 📢\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n🇩🇪 Germany (Bundes  liga 1)\n\n⚽ Borussia Dortmund 6:0 Borussia Monchengladbach',
    expected: '🇩🇪 Germany (Bundes  liga 1)'
  },
  {
    input:
      '📢 Zerfickungsalarm 📢\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n🇸🇪 Sweden (Divi  sion 2 - Norra Svealand)\n\n⚽ Akropolis 0:28 Stocksund',
    expected: '🇸🇪 Sweden (Divi  sion 2 - Norra Svealand)'
  },
];

test('tests extraction', () => {
  for (const { input, expected } of testCases) {
    const result = getLeagueFromText(input);

   expect(result).toEqual(expected)
  }
});
