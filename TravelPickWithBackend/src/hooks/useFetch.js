import { useState, useEffect } from 'react';
import { fetchUserPlaces } from '../http';

export function useFetch(fetchFn, initialVal) {
    const [isFetching, setIsFetching] = useState();
    const [error, setError] = useState();
    const [fetchedData, setFetchedData] = useState(initialVal);

    useEffect(() => {
        async function fetchPlaces() {
            setIsFetching(true);
            try {
                const data = await fetchFn();
                setFetchedData(data);
            } catch (error) {
                setError({ message: error.message || 'Failed to fetch data.' });
            }
            setIsFetching(false);
        }
    }, [fetchUserPlaces])

    return {
        isFetching,
        fetchedData,
        setFetchedData,
        error,
    }
};
