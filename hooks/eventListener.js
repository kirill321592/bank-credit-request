// libraries
import { useRef, useEffect } from 'react';

const useEventListener = (eventName, handler, element = window) => {
    // Create a ref that stores handler
    const savedHandler = useRef(null);

    // Update ref.current value if handler changes.
    // This allows our effect below to always get latest handler without us needing to pass it in effect deps array
    // and potentially cause effect to re-run every render.
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(
        () => {
            const isEventListenerSupported = element && element.addEventListener;

            if (!isEventListenerSupported) {
                return null;
            }

            const eventListener = event => savedHandler.current(event);

            element.addEventListener(eventName, eventListener);

            return () => {
                element.removeEventListener(eventName, eventListener);
            };
        },
        [eventName, element],
    );
};

export default useEventListener;
