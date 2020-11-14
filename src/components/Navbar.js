import React from 'react';
import SearchForm from './SearchForm';

export default function Navbar() {
  return (
    <nav className='navbar'>
      <h1>The Weather Dashboard</h1>
      <SearchForm />
    </nav>
  );
}
