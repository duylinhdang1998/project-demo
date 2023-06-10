export const dayInYearBuilder = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const isTimestampEqualDayInYear = (a: number, b: number) => {
  const dateA = dayInYearBuilder(a);
  const dateB = dayInYearBuilder(b);
  return dateA === dateB;
};

// Uniq theo ngày tháng năm + setHours(12) => Những cái chỉ sử dụng ngày / tháng / năm như Route & Staff => setHour về 12
export const uniqArrayTimestampWithDayInYearNSetHours12 = (timestamps: number[]) => {
  return [...new Set(timestamps.map(dayInYearBuilder))].map(item => new Date(item).setHours(12));
};
