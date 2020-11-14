import React, { useState, useContext, useEffect } from 'react';
import { useCallback } from 'react';

const AppContext = React.createContext();

const url = 'https://api.openweathermap.org/data/2.5/weather?q=';
const groupUrl = 'https://api.openweathermap.org/data/2.5/group?id=';

const key = '&appid=49e43d92bfec88b92b6ce180b0da4d88';

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
  // const [locations, setLocations] = useState(getLocalLocations());
  const [locations, setLocations] = useState(['5913490', '5419384']);

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

  const fetchSavedLocations = () => {
    setLoading(true);
    try {
      console.log(`${groupUrl}${locations.toString()}${key}`);
      fetch(`${groupUrl}${locations.toString()}${key}`, {
        mode: 'cors',
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          console.log(response);
        });
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    fetchSavedLocations();
  }, []);

  return (
    <AppContext.Provider value={{ locations, loading, error, setSearchTerm }}>
      {children}
    </AppContext.Provider>
  );
};

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
