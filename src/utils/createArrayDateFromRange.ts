export const createArrayDateFromRange = (start: number, end: number) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const result: any[] = [];
  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    result.push(new Date(d));
  }
  return result;
};
