import React, { useEffect } from 'react';

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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </span>
        <div className="relative">
            <img src={src} alt="Preview" className="max-h-[90vh]" />
        </div>
    </div>
  );
};

export default ImagePreview;
