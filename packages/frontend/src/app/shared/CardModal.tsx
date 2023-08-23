import { useUnionCardSvg } from 'frontend/shared/useUnionCardSvg';
import mini from 'mini-svg-data-uri';
import { PrimaryButton } from 'ui/PrimaryButton';
import tobuf from 'data-uri-to-buffer';
export const CardModal = ({
  open,
  onDismiss,
  onDownloaded,
  name,
  password,
}: {
  open: boolean;
  onDismiss: () => void;
  onDownloaded: () => void;
  name: string;
  password: string;
}) => {
  const __html = useUnionCardSvg({ name, password });

  const src = mini(__html);

  const onDownload = () => {
    const blob = tobuf(src);
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Membership.svg`);

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode?.removeChild(link);
    onDownloaded();
  };

  if (!open) {
    return null;
  }
  return (
    <div
      style={{
        position: 'absolute',
        height: '100vh',
        width: '100vw',
        background: 'rgba(0,0,0,0.4)',
        top: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99,
      }}
      onClick={() => onDismiss()}
    >
      <div
        style={{
          width: 320,
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <img width="320" height="auto" src={src} alt="" />
        <PrimaryButton onClick={onDownload}>
          Download Membership Card
        </PrimaryButton>
      </div>
    </div>
  );
};
