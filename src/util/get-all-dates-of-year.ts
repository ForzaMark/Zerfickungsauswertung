export function getAllDatesOfYear(year: number, modifiedStartDate?: Date): ReadonlySet<string> {
  const startDate = new Date(year, 0, 1) || modifiedStartDate;
  const endDate = new Date(year, 11, 31);

  const allDates = new Array<string>();

  for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
    const currentDateClone = new Date(currentDate);
    allDates.push(currentDateClone.toISOString().split('T')[0]);
  }

  return new Set(allDates);
}
