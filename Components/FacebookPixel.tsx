"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import React from "react";
import { useEffect, useState } from "react";

export const FB_PIXEL_ID = "1733154043759153";

export const pageview = () => {
    (window as any).fbq("track", "PageView");
};

export const event = (name: any, options = {}) => {
    (window as any).fbq("track", name, options);
};

const FacebookPixel = () => {
    const [loaded, setLoaded] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (!loaded) return;

        pageview();
    }, [pathname, loaded]);

    return (
        <div>
            <Script
                id="fb-pixel"
                src="/scripts/pixel.js"
                strategy="afterInteractive"
                onLoad={() => setLoaded(true)}
                data-pixel-id={FB_PIXEL_ID}
            />
        </div>
    );
};

export default FacebookPixel;