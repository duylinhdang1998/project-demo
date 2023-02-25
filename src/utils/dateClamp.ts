export const dateClamp = (timestamp: number, start: number, end: number) => {
  return timestamp > start && timestamp < end;
};
