import React from 'react';
import { useGlobalContext } from '../context';
import Loading from './Loading';

export default function Locations() {
  const { loading, error, locations } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <h1>Error!</h1>;
  }
  console.log(locations);
  if (locations.length < 1) {
    return (
      <div className='main'>
        <h2>No locations added yet!</h2>
        <h2>Search for a city to add above.</h2>
      </div>
    );
  }
  return (
    <div className='main'>
      {locations.map((location) => {
        return <h1>location.name</h1>;
      })}
    </div>
  );
}
