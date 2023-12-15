export function getAllDatesOfYear(year: number): ReadonlySet<string> {
  const dates: Date[] = [];

  for (let month = 0; month < 12; month++) {
    for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
      dates.push(new Date(year, month, day));
    }
  }

  return new Set(dates.map((date) => date.toString().split('T')[0]));
}
