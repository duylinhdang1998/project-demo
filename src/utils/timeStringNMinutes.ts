import dayjs from 'dayjs';

export function timeStringToMinutes(timeString: string): number {
  const timeRegex = /([01]?[0-9]|2[0-3]):[0-5][0-9]/;
  if (!timeRegex.test(timeString)) {
    console.warn("Invalid time string format. Expected format: 'HH:mm'.");
    return 0;
  }
  const timeParts = timeString.split(':');
  const hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);
  const totalMinutes = hours * 60 + minutes;
  return totalMinutes;
}

export function minutesToTimeString(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const minutesMod60 = minutes % 60;
  const timeString = dayjs().hour(hours).minute(minutesMod60).format('HH:mm');

  return timeString;
}
