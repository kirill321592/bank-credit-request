import { cookies } from 'core-front';

export const sendJuicyScoreEvent = () => {
    if (window.jslabApi) {
        window.jslabApi.manuallyStopPing.dispatchEvent(new Event('click'));
    }
};

export const getUserBrowserData = isJuicyScoreAble =>
    isJuicyScoreAble
        ? {
            juicyScore: {
                userAgent: navigator.userAgent,
                plugins: Object.entries(navigator.plugins).map(item => item[1].name).join(' | '),
                screenHeight: window.screen.height,
                screenWidth: window.screen.width,
                clientColors: window.screen.colorDepth,
                timeZone: Math.abs(new Date().getTimezoneOffset() / 60),
                referrer: document.referrer ? document.referrer : window.location.href,
                externalToken: cookies.getCookie('jslbrc')
            }
        }
        : {};