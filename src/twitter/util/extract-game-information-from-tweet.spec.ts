import { extractGameInformationFromTweet } from './extract-game-information-from-tweet';

const tweetStart =
  '📢 Zerfickungsalarm 📢\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n🇬🇧 Scotland (FA Cup)\n\n⚽ ';

const testCases = [
  {
    inputString: 'Sporting CP 6:0 Farense',
    expected: {
      homeScore: 6,
      awayScore: 0
    }
  },
  {
    inputString: 'Sporting CP 0:6 Farense',
    expected: {
      homeScore: 0,
      awayScore: 6
    }
  },
  {
    inputString: 'Sporting CP 12:6 Farense',
    expected: {
      homeScore: 12,
      awayScore: 6
    }
  },
  {
    inputString: 'Sporting CP 0:12 Farense',
    expected: {
      homeScore: 0,
      awayScore: 12
    }
  },
  {
    inputString: 'Sporting CP U 21 6:0 Farense',
    expected: {
      homeScore: 6,
      awayScore: 0
    }
  },
  {
    inputString: 'Sporting CP 0:6 Farense U 21',
    expected: {
      homeScore: 0,
      awayScore: 6
    }
  },
  {
    inputString: `IA Akranes 0:6 Stjarnan`,
    customTweetStart: `📢 Zerfickungsalarm 📢\n ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n 🇮🇸 Iceland (https://t.co/35B2DnzwYj Cup A)\n\n ⚽ IA Akranes 0:6 Stjarnan`,
    expected: {
      homeScore: 0,
      awayScore: 6
    }
  }
];

test('tests extraction', () => {
  for (const { inputString, customTweetStart, expected } of testCases) {
    const input = `${customTweetStart || tweetStart} ${inputString}`;
    const result = extractGameInformationFromTweet(input);

    if (typeof result !== 'string') {
      expect(result.homeScore).toEqual(expected.homeScore);
      expect(result.awayScore).toEqual(expected.awayScore);
    } else {
      expect(true).toEqual(false);
    }
  }
});
