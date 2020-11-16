import React, { useRef, useEffect } from 'react';
import { useGlobalContext } from '../context';

export default function SearchForm() {
  const { setSearchTerm, searchError, loadingSearch } = useGlobalContext();

  const searchValue = useRef('');

  useEffect(() => {
    searchValue.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.current.value.length > 1) {
      setSearchTerm(searchValue.current.value);
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
