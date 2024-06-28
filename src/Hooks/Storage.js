import { useState, useEffect} from 'react';

export function useLocalStorage(key) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error(error);
            return null;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        function handleStorageChange(event) {
            if (event.key === key) {
                try {
                    const item = event.newValue ? JSON.parse(event.newValue) : null;
                    setStoredValue(item);
                } catch (error) {
                    console.error(error);
                }
            }
        }

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [key]);

    return [storedValue, setValue];
}