import React, { useRef, useEffect, useState } from 'react';
import { useGlobalContext } from '../context';
import { key } from '../config';
import { Spinner } from '@chakra-ui/react';

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

    try {
      const response = await fetch(
        `${url}${searchValue.current.value}${key}&units=metric`,
        {
          code: 'cors',
        }
      );
      const respData = await response.json();

      if (respData.cod === '404') {
        setSearchError('Invalid');
        setLoadingSearch(false);
      }

      if (savedLocations.includes(String(respData.id))) {
        respData.cod = 400;
        setSearchError('Duplicate');
        setLoadingSearch(false);
      }
      if (respData.cod === 200) {
        setLoadedLocations([respData, ...loadedLocations]);
        setSavedLocations([String(respData.id), ...savedLocations]);
      }
      setLoadingSearch(false);
    } catch (error) {
      console.log('Search Error');
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
          {loadingSearch ? <Spinner /> : 'Add'}
        </button>
      </form>
    </div>
  );
}
