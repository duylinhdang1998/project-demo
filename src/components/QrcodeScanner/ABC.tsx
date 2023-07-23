import QrScanner from 'qr-scanner';
import React, { useEffect, useRef, useState } from 'react';

export default function QRCodeScanner() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const scannerRef = useRef<QrScanner | null>(null);
  const onResult = (result: QrScanner.ScanResult) => {
    if (result.data) {
      scannerRef?.current?.stop();
      scannerRef?.current?.destroy();
    }
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
          alert("You don't have camera");
        }
      });
      return () => {
        scannerRef?.current?.destroy();
        scannerRef?.current?.stop();
        videoRef.current = null;
      };
    }
  }, []);

  return (
    <div
      id="video-container"
      style={{
        width: 'max-content',
        height: 'max-content',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <video id="qr-video" ref={videoRef}></video>
    </div>
  );
}
