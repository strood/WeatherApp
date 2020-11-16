import React, { useState, useContext, useEffect } from 'react';
import { useCallback } from 'react';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { key } from './config';

const AppContext = React.createContext();

const groupUrl = 'https://api.openweathermap.org/data/2.5/group?id=';

const getLocalLocations = () => {
  let loc = localStorage.getItem('Locations');
  if (loc) {
    return JSON.parse(loc);
  } else {
    return [];
  }
};

const AppProvider = ({ children }) => {
  const [loadingLocal, setLoadingLocal] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  // const [savedLocations, setSavedLocations] = useState(getLocalLocations());
  const [savedLocations, setSavedLocations] = useState(['5913490', '5419384']);
  const [loadedLocations, setLoadedLocations] = useState([]);

  // Grab and load saved locations, set loadedLocations
  const fetchSavedLocations = async () => {
    setLoadingLocal(true);
    try {
      console.log(`${groupUrl}${savedLocations.toString()}${key}`);
      const response = await fetch(
        `${groupUrl}${savedLocations.toString()}${key}`,
        {
          mode: 'cors',
        }
      );
      const respData = await response.json();
      setLoadedLocations(respData.list);
      setLoadingLocal(false);
    } catch (error) {
      console.log(`Load Error: ${error}`);
      setLoadingError(true);
      setLoadingLocal(false);
    }
  };

  useEffect(() => {
    localStorage.setItem('Locations', JSON.stringify(savedLocations));
  }, [savedLocations]);

  useEffect(() => {
    fetchSavedLocations();
  }, []);

  return (
    <AppContext.Provider
      value={{
        loadedLocations,
        setLoadedLocations,
        savedLocations,
        setSavedLocations,
        loadingLocal,
        loadingError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
