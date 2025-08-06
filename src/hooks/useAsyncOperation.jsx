import { useCallback } from "react";
import { usePageLoading } from "./usePageLoading";

export const useAsyncOperation = (options = {}) => {
    const { startLoading, stopLoading } = usePageLoading({
        autoStart: false,
        ...options
    })

    const executeAsync = useCallback(async (asyncFn, loadingMessage = 'Loading...') => {
        try {
            startLoading(loadingMessage)
            const result = await asyncFn()
            return result
        } catch (error) {
            console.error('Async operation failed', error);
            throw error;
        } finally {
            stopLoading()
        }
    }, [startLoading, stopLoading])

    return { executeAsync };
}