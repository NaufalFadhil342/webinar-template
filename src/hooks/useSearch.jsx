import { useCallback, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';

export const useSearch = (options = {}) => {
    const [searchInput, setSearchInput] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const {
        resultPath = '/result',
        preserveOtherParams = true,
        redirectOnSearch = true
    } = options;

    useEffect(() => {
        const searchFromURL = searchParams.get('search') || '';

        setSearchInput(searchFromURL);
    }, [searchParams]);

    const handleSearchChange = useCallback((e) => {
        setSearchInput(e.target.value);
    }, []);

    const handleSearchSubmit = useCallback(() => {
        if (searchInput.trim()) {
            const newSearchParams = preserveOtherParams
                ? new URLSearchParams(searchParams)
                : new URLSearchParams()

            newSearchParams.set('search', searchInput.trim());

            if (redirectOnSearch) {
                navigate({
                    pathname: resultPath,
                    search: newSearchParams.toString()
                })
            } else {
                setSearchParams(newSearchParams)
            }
        } else {
            const newSearchParams = new URLSearchParams(searchParams);

            newSearchParams.delete('search');
            setSearchParams(newSearchParams);
        }

    }, [navigate, preserveOtherParams, redirectOnSearch, searchInput, searchParams, setSearchParams, resultPath]);

    const handleSearchKeydown = useCallback((e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearchSubmit()
        }
    }, [handleSearchSubmit]);

    const currentSearchTerm = searchParams.get('search') || '';

    return {
        searchInput,
        currentSearchTerm,
        handleSearchChange,
        handleSearchSubmit,
        handleSearchKeydown,
        setSearchInput
    }
}
