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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // const [savedLocations, setSavedLocations] = useState(getLocalLocations());
  const [savedLocations, setSavedLocations] = useState(['5913490', '5419384']);
  const [loadedLocations, setLoadedLocations] = useState([]);

  // Grab and load saved locations, set loadedLocations
  const fetchSavedLocations = useCallback(async () => {
    setLoading(true);
    try {
      console.log(`${groupUrl}${savedLocations.toString()}${key}`);
      const response = await fetch(
        `${groupUrl}${savedLocations.toString()}${key}`,
        {
          mode: 'cors',
        }
      );
      const respData = await response.json();
      console.log(respData.list);
      setLoadedLocations(respData.list);
      console.log(respData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  }, [savedLocations]);

  // Initial page load get saved locations.
  useEffect(() => {
    fetchSavedLocations();
  }, [fetchSavedLocations]);

  const fetchLocation = useCallback(async () => {
    try {
      const response = await fetch(`${url}${searchTerm}${key}`, {
        code: 'cors',
      });
      const respData = await response.json();
      console.log('no error');
      console.log(respData);
      if (respData.cod === '404') {
        console.log(error);
      }
    } catch (error) {
      console.log('error');
      console.log(error);
      setError(true);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchLocation();
  }, [searchTerm, fetchLocation]);

  // const fetchLocation = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(`${url}${searchTerm}${key}`);
  //     const data = await response.json();
  //     console.log(data);
  //     // const { location } = data;
  //     // if (location) {

  //     // }
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // }, [searchTerm]);

  return (
    <AppContext.Provider
      value={{ loadedLocations, savedLocations, loading, error, setSearchTerm }}
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
