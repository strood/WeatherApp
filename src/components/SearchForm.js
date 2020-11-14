import React, { useRef, useEffect } from 'react';
import { useGlobalContext } from '../context';

export default function SearchForm() {
  const { setSearchTerm } = useGlobalContext();

  const searchValue = useRef('');

  useEffect(() => {
    searchValue.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchValue.current.value);
  };

  return (
    <div className='searchDiv'>
      <form onSubmit={handleSubmit} className='searchForm'>
        <label htmlFor='location'>Location:</label>
        <input
          className='locationInput'
          type='text'
          id='location'
          ref={searchValue}
        />
        <button className='btn' type='submit'>
          Add
        </button>
      </form>
    </div>
  );
}
