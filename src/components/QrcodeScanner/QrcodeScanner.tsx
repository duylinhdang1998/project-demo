import { Html5QrcodeScanner } from 'html5-qrcode';
import React, { useEffect } from 'react';

const qrcodeRegionId = 'html5qr-code-full-region';

export default function QrcodeScanner() {
  const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    console.log(decodedText, decodedResult);
  };

  const qrCodeErrorCallback = () => {
    console.log('error');
  };

  useEffect(() => {
    const html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      {
        fps: 60,
        qrbox: 250,
        aspectRatio: 1.0,
        disableFlip: true,
        showTorchButtonIfSupported: true,
        experimentalFeatures: {
          useBarCodeDetectorIfSupported: true,
        },
      },
      true,
    );
    html5QrcodeScanner.render(qrCodeSuccessCallback, qrCodeErrorCallback);
    return () => {
      html5QrcodeScanner.clear().catch(error => {
        console.error('Failed to clear html5QrcodeScanner. ', error);
      });
    };
  }, []);
  return <div id={qrcodeRegionId} />;
}
