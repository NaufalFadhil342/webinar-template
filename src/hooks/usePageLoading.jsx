import { useState, useEffect, useRef, useCallback } from 'react';

const usePageLoading = (options = {}) => {
    const {
        initialDelay = 0,    // Delay before loading release
        minDuration = 300,     // Minimum loading duration showed
        maxDuration = 2000,    // Maximum loading duration
        autoStart = true,      // Auto start loading when component is mounted
        dependencies = []      // Dependencies that trigger loop loading 
    } = options;

    const [isLoading, setIsLoading] = useState(autoStart);
    const [loadingMessage, setLoadingMessage] = useState('');
    const startTimeRef = useRef(null);
    const timeoutRef = useRef(null);
    const isFirstMount = useRef(true);

    // A function for start loading
    const startLoading = useCallback((message = '') => {
        setLoadingMessage(message);
        startTimeRef.current = Date.now();

        // Delay before a loading appear (prevent flash loading)
        timeoutRef.current = setTimeout(() => {
            setIsLoading(true);
        }, initialDelay);
    }, [initialDelay]);

    // A function for stop loading
    const stopLoading = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (startTimeRef.current) {
            const elapsed = Date.now() - startTimeRef.current;
            const remainingTime = Math.max(0, minDuration - elapsed);

            setTimeout(() => {
                setIsLoading(false);
                setLoadingMessage('');
            }, remainingTime);
        } else {
            setIsLoading(false);
            setLoadingMessage('');
        }
    }, [minDuration]);

    // Auto start on mount or dependencies change
    useEffect(() => {
        if (autoStart) {
            if (isFirstMount.current) {
                isFirstMount.current = false;
                // For the first mount, start loading
                startLoading();

                // Default auto stop after delay 
                const autoStopTimer = setTimeout(() => {
                    stopLoading();
                }, maxDuration);

                return () => clearTimeout(autoStopTimer);
            } else if (dependencies.length > 0) {
                // For dependency changes
                startLoading();

                const autoStopTimer = setTimeout(() => {
                    stopLoading();
                }, maxDuration);

                return () => clearTimeout(autoStopTimer);
            }
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [autoStart, dependencies, maxDuration, startLoading, stopLoading]);

    return {
        isLoading,
        loadingMessage,
        startLoading,
        stopLoading
    }
}

export { usePageLoading };