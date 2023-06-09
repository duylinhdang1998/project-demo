export const dateClamp = (timestamp: number, start: number, end: number) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const checkDate = new Date(timestamp);

  // Remove time components from dates
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);
  checkDate.setHours(0, 0, 0, 0);

  return checkDate >= startDate && checkDate <= endDate;
};
