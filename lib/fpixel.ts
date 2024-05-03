export const FB_PIXEL_ID = 1733154043759153;

export const pageview = () => {
    // @ts-ignore
    window.fbq("track", "PageView");
};

// @ts-ignore
export const event = (name, options = {}) => {
    // @ts-ignore
    window.fbq("track", name, options);
};