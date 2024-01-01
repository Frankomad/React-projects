import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [appData, setAppData] = useState(() => {
        // Try to get data from localStorage on component mount
        const storedData = localStorage.getItem('appData');
        return storedData ? JSON.parse(storedData) : null;
    });

    const setGlobalData = useCallback((newData) => {
        setAppData(newData);
    }, []);

    // Use useEffect to store the data in localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('appData', JSON.stringify(appData));
    }, [appData]);

    const contextValue = useMemo(() => ({ appData, setGlobalData }), [appData, setGlobalData]);

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    );
};

DataProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);
