import { getI18n } from 'react-i18next';

export function formatDuration(minutes: number) {
  console.log(111, minutes);
  const i18n = getI18n();
  const hours = Math.floor(minutes / 60);
  const minutesMod60 = minutes % 60;
  if (hours > 1 && minutesMod60 > 1) {
    return i18n.t('translation:hours_and_minutes', { hours, minutes: minutesMod60 });
  }
  if (hours > 1 && minutesMod60 == 1) {
    return i18n.t('translation:hours_and_minute', { hours, minutes: minutesMod60 });
  }
  if (hours > 1 && minutesMod60 == 0) {
    return i18n.t('translation:hours_and_0minute', { hours, minutes: minutesMod60 });
  }
  if (hours <= 1 && minutesMod60 > 1) {
    return i18n.t('translation:hour_and_minutes', { hours, minutes: minutesMod60 });
  }
  if (hours <= 1 && minutesMod60 == 1) {
    return i18n.t('translation:hour_and_minute', { hours, minutes: minutesMod60 });
  }
  if (hours <= 1 && minutesMod60 == 0) {
    return i18n.t('translation:hour_and_0minute', { hours, minutes: minutesMod60 });
  }
}
