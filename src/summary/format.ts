
export const SUMMARY_FORMAT = {
  general1: {
    generateText: (
      year: number,
      numberOfGames: number,
      month: { monthName: string; gamesPerMonth: number },
      dayWithMostGames: { day: string; gamesPerDay: number }
    ) => {
      return `Das Jahr ${year} ist mit insgesamt ${numberOfGames} Zerfickungen zu Ende gegangen. 
                    Damit ist die Zahl der Zerfickungen im Vergleich zum Vorjahr (...) <gestiegen|gefallen>.
                    Mit ${month.gamesPerMonth} Zerfickungen ist der ${month.monthName} der Zerfickungsmonat ${year}. 
            Der Zerfickungstag war der ${dayWithMostGames.day} mit ${dayWithMostGames.gamesPerDay} Zerfickungen.`;
    },
  },
  general2: {
    generateText: (
      mostResult: {
        resultString: string;
        numberOfGames: number;
        percentageOfAllGames: number;
      },
      secondPlace: string,
      thirdPlace: string
    ) => {
      if (mostResult.resultString !== "6:0") {
        throw new Error("6:0 not most !");
      }

      return `Das häufigste Ergebniss war wie in den Vorjahren das klassische 6:0 bzw. 0:6 mit ${mostResult.numberOfGames} Zerfickungen 
              und damit etwa ${mostResult.percentageOfAllGames} aller Zerfickungen. 
              Platz zwei geht an ${secondPlace} und Platz drei an ${thirdPlace}.`;
    },
  },
  highestGame: {
    generateText: (league: string, game: string) => {
      return `
        Der "Doch das Loch bleibt"-Preis für die höchste Zerfickung in 2023 geht an: 

        ${league}
        ${game}
    `;
    },
  },
} as const;
