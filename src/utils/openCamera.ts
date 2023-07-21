import { getI18n } from 'react-i18next';

export async function openCamera() {
  const i18n = getI18n();
  try {
    await navigator.mediaDevices.getUserMedia({ video: true });
  } catch (error) {
    alert(i18n.t('common:camera_accessing'));
  }
}
