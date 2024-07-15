import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

const ImageWithLoading = ({ src, alt, width, height, className, onClick }: {src: string, alt: string, width: string, height: string, className?: string, onClick?: (e: any) => void}) => {
    const [isLoading, setLoading] = useState(true);

    return (
        <div className="relative">
            <div style={{height: `${height}`}}>
            {isLoading && <LoadingSpinner />}
            <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={className}
                onClick={onClick}
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
                style={isLoading ? { display: 'none' } : {}}
            />
            </div>
        </div>
    );
};

export default ImageWithLoading