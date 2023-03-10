import { getLeagueFromText } from './get-league-from-text';

const testCases = [
  {
    input:
      '  Zerfickungsalarm π’\nβ―β―β―β―β―β―β―β―β―β―β―β―β―β―β―β―β―\nπ©πͺ Germany (Bundes  liga 1)\n\nβ½ Borussia Dortmund 6:0 Borussia Monchengladbach',
    expected: 'π©πͺ Germany (Bundes  liga 1)'
  },
  {
    input:
      'π’ Zerfickungsalarm π’\nβ―β―β―β―β―β―β―β―β―β―β―β―β―β―β―β―β―\nπΈπͺ Sweden (Divi  sion 2 - Norra Svealand)\n\nβ½ Akropolis 0:28 Stocksund',
    expected: 'πΈπͺ Sweden (Divi  sion 2 - Norra Svealand)'
  }
];

test('tests extraction', () => {
  for (const { input, expected } of testCases) {
    const result = getLeagueFromText(input);

    expect(result).toEqual(expected);
  }
});
