// import { useEffect, useRef } from 'react';
// import { Html5QrcodeScanner } from 'html5-qrcode';
import { useCallback, useMemo } from 'react';
import QrReader from 'react-qr-reader';

export const Reader = ({
  onRead,
  onDismiss,
}: {
  onDismiss: () => void;
  onRead: (data: string) => void;
}) => {
  const handleScan = useCallback(
    (data: string | null) => {
      if (data) {
        onRead(data);
      }
    },
    [onRead]
  );

  const handleError = useCallback(() => {
    /* noop */
  }, []);

  const style = useMemo(
    () => ({
      width: 400,
      height: 400,
    }),
    []
  );

  return (
    <QrReader
      style={style}
      onScan={handleScan}
      onError={handleError}
      delay={500}
    />
  );
};
