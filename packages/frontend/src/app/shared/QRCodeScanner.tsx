import styled from '@emotion/styled';
import { Html5Qrcode } from 'html5-qrcode';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { CloseIcon } from 'ui/CloseIcon';
import { IconButton } from 'ui/IconButton';

type Context = {
  scanning?: boolean;
  cameraId?: string;
  onScan?: (value: string) => void;
  onDismiss?: () => void;
};

const context = createContext<Context>({});

const Modal = styled.div`
  display: 'block';
  position: 'absolute';
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;

const Reader = styled.div`
  z-index: 100;
`;

type ProviderProps = {
  onScan: (value: string) => void;
  onDismiss: () => void;
  scanning?: boolean;
};
export const QRCodeScannerProvider = ({
  children,
  onScan,
  scanning,
  onDismiss,
}: ProviderProps & PropsWithChildren) => {
  const [cameraId, setCameraId] = useState<string>();

  useEffect(() => {
    if (scanning) {
      Html5Qrcode.getCameras()
        .then((devices) => {
          if (devices && devices.length) {
            const cameraId = devices[0].id;
            if (cameraId) {
              setCameraId(cameraId);
            }
          }
        })
        .catch((err) => {
          // handle err
        });
    }
  }, [scanning, cameraId, setCameraId]);

  return (
    <context.Provider value={{ scanning, cameraId, onScan, onDismiss }}>
      <>
        {cameraId && <QrCodeScannerModal />}
        {children}
      </>
    </context.Provider>
  );
};

export const useQrCodeScannerContext = () => useContext(context);

const QrCodeScannerModal = () => {
  const { scanning, cameraId, onScan, onDismiss } = useQrCodeScannerContext();
  const qrScanRef = useRef<Html5Qrcode | null>(null);
  const qrScanRefObj = qrScanRef.current;
  const [postScanning, setPostScanning] = useState(scanning);

  const startScanning = useCallback(
    (_qrScan: Html5Qrcode, _cameraId: string) => {
      try {
        _qrScan
          .start(
            _cameraId,
            {
              fps: 10, // Optional, frame per seconds for qr code scanning
              qrbox: { width: 250, height: 250 }, // Optional, if you want bounded box UI
            },
            (decodedText, decodedResult) => {
              if (onScan) {
                onScan(decodedText);
              }
            },
            (errorMessage) => {
              console.error(errorMessage);
            }
          )
          .catch((err) => {
            console.error(err);
          });
      } catch (e) {
        console.log(e);
      }
    },
    [onScan]
  );
  const stopScanning = useCallback((_qrScan: Html5Qrcode) => {
    _qrScan.stop();
  }, []);

  useEffect(() => {
    if (!scanning && postScanning && qrScanRefObj) {
      setTimeout(() => {
        setPostScanning(false);
      });
    } else if (scanning && !postScanning && qrScanRefObj) {
      setPostScanning(true);
    }
  }, [scanning, qrScanRefObj, stopScanning, postScanning]);

  useEffect(() => {
    return () => {
      if (qrScanRefObj) {
        if (qrScanRefObj.isScanning) {
          stopScanning(qrScanRefObj);
        }
      }
    };
  }, [qrScanRefObj, stopScanning]);

  useEffect(() => {
    if (!qrScanRef.current) {
      qrScanRef.current = new Html5Qrcode('reader');
    }
    if (scanning) {
      if (!qrScanRef.current.isScanning && cameraId) {
        startScanning(qrScanRef.current, cameraId);
      }
    } else {
      if (qrScanRef.current.isScanning) {
        stopScanning(qrScanRef.current);
      }
    }
  }, [scanning, startScanning, stopScanning, cameraId]);

  return (
    <Modal style={{ display: postScanning ? 'block' : 'none' }}>
      <IconButton
        style={{
          width: 32,
          position: 'absolute',
          top: 20,
          right: 20,
          zIndex: 101,
        }}
        onClick={onDismiss}
      >
        <CloseIcon />
      </IconButton>
      <Reader id="reader" style={{ flex: 1, width: '100%' }} />
    </Modal>
  );
};
