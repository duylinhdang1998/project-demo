import QrScanner from 'qr-scanner';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  onScanQR?: (result: QrScanner.ScanResult) => void;
}

export default function QRCodeScanner({ onScanQR }: Props) {
  const { t } = useTranslation(['message_error']);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const scannerRef = useRef<QrScanner | null>(null);
  const onResult = (result: QrScanner.ScanResult) => {
    onScanQR?.(result);
  };

  useEffect(() => {
    if (!!videoRef.current) {
      scannerRef.current = new QrScanner(videoRef.current, result => onResult(result), {
        highlightScanRegion: true,
        highlightCodeOutline: true,
        preferredCamera: 'environment',
        returnDetailedScanResult: true,
      });
      QrScanner.hasCamera().then(hasCamera => {
        if (hasCamera) {
          scannerRef?.current?.start();
        } else {
          alert(t('message_error:camera_accessing'));
        }
      });
      return () => {
        scannerRef?.current?.destroy();
        scannerRef?.current?.stop();
        videoRef.current = null;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      id="video-container"
      style={{
        overflow: 'hidden',
        position: 'relative',
        paddingRight: '4px',
      }}
    >
      <video id="qr-video" ref={videoRef} style={{ maxWidth: '100%' }}></video>
    </div>
  );
}
