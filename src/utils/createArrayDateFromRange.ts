interface CreateArrayDateFromRange {
  start: number;
  end: number;
  isNeedIgnore?: (date: Date) => boolean;
}

export const createArrayDateFromRange = ({ end, start, isNeedIgnore = () => false }: CreateArrayDateFromRange) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const result: any[] = [];
  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    if (!isNeedIgnore(d)) {
      result.push(new Date(d));
    }
  }
  return result;
};
