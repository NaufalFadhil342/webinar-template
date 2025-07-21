import { useCallback, useMemo } from "react";

export const useLanguageSelection = (
    languages = [],
    selectedLanguages = { selected: ['all'], isAllSelected: true, selectedCount: 1 },
    onLanguageChange
) => {

    const formatNumber = useMemo(() => {
        const formatter = new Intl.NumberFormat('en-US');
        return (number) => {
            try {
                const num = typeof number === 'number' ? number : parseInt(number) || 0;
                return formatter.format(num);
            } catch (error) {
                console.warn('Error formatting number:', error);
                return number?.toString() || '0';
            }
        };
    }, []);

    const processedLanguages = useMemo(() => {
        if (!Array.isArray(languages)) {
            console.warn('Languages prop should be an array, received:', typeof languages, languages);
            return [];
        }

        return languages
            .filter(lang => {
                if (!lang) return false;
                if (typeof lang.code !== 'string') return false;
                if (typeof lang.nativeName !== 'string') return false;
                return true;
            })
            .sort((a, b) => {
                return a.nativeName.localeCompare(b.nativeName, undefined, {
                    numeric: true,
                    sensitivity: 'base'
                });
            });
    }, [languages]);

    const totalAmount = useMemo(() => {
        return processedLanguages.reduce((total, lang) => {
            const amount = typeof lang.amount === 'number' ? lang.amount : parseInt(lang.amount) || 0;
            return total + amount;
        }, 0);
    }, [processedLanguages]);

    const handleLanguageToggle = useCallback((languageCode) => {
        if (!onLanguageChange) return;

        const isAllLanguages = languageCode === 'all';

        if (isAllLanguages) {
            // If "All Languages" clicked - always set to all
            const newSelection = {
                selected: ['all'],
                isAllSelected: true,
                selectedCount: 1
            };
            onLanguageChange(newSelection);
        } else {
            // If specific language clicked
            let newSelected = [...selectedLanguages.selected];

            // Remove 'all' if exists while selecting specific language
            if (newSelected.includes('all')) {
                newSelected = newSelected.filter(code => code !== 'all');
            }

            // Toggle specific language
            if (newSelected.includes(languageCode)) {
                newSelected = newSelected.filter(code => code !== languageCode);
            } else {
                newSelected.push(languageCode);
            }

            // If there's no selected language, return to "All Languages"
            if (newSelected.length === 0) {
                newSelected = ['all'];
            }

            const newSelection = {
                selected: newSelected,
                isAllSelected: newSelected.includes('all'),
                selectedCount: newSelected.length
            };

            onLanguageChange(newSelection);
        }
    }, [onLanguageChange, selectedLanguages]);

    const isLanguageSelected = useCallback((languageCode) => {
        if (languageCode === 'all') {
            return selectedLanguages.isAllSelected || selectedLanguages.selected.includes('all');
        }

        if (selectedLanguages.isAllSelected || selectedLanguages.selected.includes('all')) {
            return false;
        }

        return selectedLanguages.selected.includes(languageCode);
    }, [selectedLanguages]);

    const getDisplayText = useMemo(() => {
        // If the user not selecting language, "All Languages" is checked
        if (selectedLanguages.isAllSelected || selectedLanguages.selected.includes('all')) {
            return 'All Languages';
        }

        // If the user not selecting the spesific language, display "Languages"
        if (selectedLanguages.selectedCount === 0) {
            return 'Languages';
        }

        // If the user selecting the spesific language, display selected language
        if (selectedLanguages.selectedCount === 1) {
            const selectedCode = selectedLanguages.selected[0];
            const selectedLang = processedLanguages.find(lang => lang.code === selectedCode);
            return selectedLang ? selectedLang.nativeName : 'Languages';
        }

        return `Languages (${selectedLanguages.selectedCount})`;
    }, [selectedLanguages, processedLanguages]);

    return {
        processedLanguages,
        totalAmount,
        formatNumber,
        handleLanguageToggle,
        isLanguageSelected,
        getDisplayText
    };
};