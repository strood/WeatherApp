import React, { useState, useContext, useEffect } from 'react';
import { useCallback } from 'react';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { key } from './config';

const AppContext = React.createContext();

const url = 'https://api.openweathermap.org/data/2.5/weather?q=';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingLocal, setLoadingLocal] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [searchError, setSearchError] = useState(false);
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
  // const fetchSavedLocations = useCallback(async () => {
  //   setLoadingLocal(true);
  //   try {
  //     console.log(`${groupUrl}${savedLocations.toString()}${key}`);
  //     const response = await fetch(
  //       `${groupUrl}${savedLocations.toString()}${key}`,
  //       {
  //         mode: 'cors',
  //       }
  //     );
  //     const respData = await response.json();
  //     setLoadedLocations(respData.list);
  //     setLoadingLocal(false);
  //   } catch (error) {
  //     console.log(`Load Error: ${error}`);
  //     setLoadingError(true);
  //     setLoadingLocal(false);
  //   }
  // }, [savedLocations]);

  // // Initial page load get saved locations.
  // useEffect(() => {
  //   fetchSavedLocations();
  // }, [fetchSavedLocations]);

  // Grab location on search, add to saved if valid
  const fetchLocation = useCallback(async () => {
    setLoadingSearch(true);
    try {
      const response = await fetch(`${url}${searchTerm}${key}`, {
        code: 'cors',
      });
      const respData = await response.json();
      console.log(respData);
      if (respData.cod === '404') {
        console.log(`Invalid Search: ${respData}`);
        setSearchError('Invalid');
        setLoadingSearch(false);
      }
      console.log(respData.id);
      console.log(savedLocations);
      if (savedLocations.includes(String(respData.id))) {
        respData.cod = 400;
        setSearchError('Duplicate');
        setLoadingSearch(false);
      }
      if (respData.cod === 200) {
        console.log(`Valid Search^`);

        console.log(loadedLocations);
        setLoadedLocations([...loadedLocations, respData]);
        // setSavedLocations([...savedLocations, )
      }
      setLoadingSearch(false);
    } catch (error) {
      console.log('Search Error');
      console.log(error);
      setSearchError('Error');
      setLoadingSearch(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchLocation();
  }, [searchTerm, fetchLocation]);

  return (
    <AppContext.Provider
      value={{
        loadedLocations,
        savedLocations,
        loadingLocal,
        loadingError,
        searchError,
        loadingSearch,
        setSearchTerm,
        setLoadingSearch,
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
