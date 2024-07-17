import React, { useEffect } from 'react';
import XMark from '@/public/icon/XMark.svg'

interface ImagePreviewProps {
    src: string;
    onClose?: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ src, onClose }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleContainerClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if ((event.target as HTMLElement).tagName.toLowerCase() === 'div') {
            onClose?.();
        }
    };

  return (
    <div onClick={handleContainerClick} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex items-center justify-center z-50 overflow-auto">
        <span className="fixed top-0 right-0 m-4 text-white cursor-pointer" onClick={onClose}>
            <XMark className="h-8 w-8" fill='white' />
        </span>
        <div className="relative">
            <img src={src} alt="Preview" className="max-h-[90vh]" />
        </div>
    </div>
  );
};

export default ImagePreview;
