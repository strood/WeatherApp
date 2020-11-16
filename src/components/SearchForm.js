import React, { useRef, useEffect, useState } from 'react';
import { useGlobalContext } from '../context';
import { key } from '../config';

const url = 'https://api.openweathermap.org/data/2.5/weather?q=';

export default function SearchForm() {
  const {
    setSavedLocations,
    savedLocations,
    setLoadedLocations,
    loadedLocations,
  } = useGlobalContext();

  const [searchError, setSearchError] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const searchValue = useRef('');

  const fetchLocation = async () => {
    setLoadingSearch(true);
    console.log(searchValue.current.value);
    try {
      const response = await fetch(`${url}${searchValue.current.value}${key}`, {
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

      if (savedLocations.includes(String(respData.id))) {
        respData.cod = 400;
        setSearchError('Duplicate');
        setLoadingSearch(false);
      }
      if (respData.cod === 200) {
        console.log(`Valid Search^`);
        console.log(respData);
        setLoadedLocations([...loadedLocations, respData]);
        setSavedLocations([...savedLocations, String(respData.id)]);
      }
      setLoadingSearch(false);
    } catch (error) {
      console.log('Search Error');
      console.log(error);
      setSearchError('Error');
      setLoadingSearch(false);
    }
  };

  useEffect(() => {
    searchValue.current.focus();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchError(false);
    if (searchValue.current.value.length > 1) {
      fetchLocation();
      searchValue.current.value = '';
    }
  };

  return (
    <div className='searchDiv'>
      <form onSubmit={handleSubmit} className='searchForm'>
        <label htmlFor='location'>Location:</label>
        <input
          placeholder={searchError ? `${searchError} Search Error` : null}
          className='locationInput'
          type='text'
          id='location'
          ref={searchValue}
        />
        <button className='btn' type='submit'>
          {loadingSearch ? '...' : 'Add'}
        </button>
      </form>
    </div>
  );
}
