import React from 'react';
import SearchForm from './SearchForm';
import { FormControl, FormLabel, Switch } from '@chakra-ui/react';
import { useGlobalContext } from '../context';

export default function Navbar() {
  const { savedUnits, setSavedUnits } = useGlobalContext();

  const checked = String(savedUnits) === 'imperial' ? true : false;

  const toggleSavedUnits = (e) => {
    const newUnits = String(savedUnits) === 'imperial' ? 'metric' : 'imperial';
    setSavedUnits(newUnits);
  };

  return (
    <nav className='navbar'>
      <div className='titleDiv'>
        <h1 className='navTitle'>The Weather Dashboard</h1>
        <FormControl className='toggleDiv'>
          <FormLabel>
            <span>&#176;</span> C
          </FormLabel>
          <div>
            <Switch
              colorScheme='white'
              onChange={(e) => toggleSavedUnits(e)}
              defaultIsChecked={checked}
            />
          </div>
          <FormLabel>
            <span> </span> <span>&#176;</span> F
          </FormLabel>
        </FormControl>
      </div>
      <SearchForm />
    </nav>
  );
}
