import { getI18n } from 'react-i18next';

export async function openCamera() {
  const i18n = getI18n();
  try {
    await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
  } catch (error) {
    alert(i18n.t('message_error:camera_accessing'));
  }
}
