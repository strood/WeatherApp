import React from 'react';
import { useGlobalContext } from '../context';
import Loading from './Loading';

export default function Locations() {
  const { loadingLocal, loadingError, loadedLocations } = useGlobalContext();

  if (loadingLocal) {
    return <Loading />;
  }
  if (loadedLocations.length < 1) {
    return (
      <div className='main'>
        <h2>No locations added yet!</h2>
        <h2>Search for a city to add above.</h2>
      </div>
    );
  }
  return (
    <div className='main'>
      {loadingError ? <h1>Error Loading Locations</h1> : null}
      {loadedLocations.map((location) => {
        return <h1 key={location.id}>{location.name}</h1>;
      })}
    </div>
  );
}
