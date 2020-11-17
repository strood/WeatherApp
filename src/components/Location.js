import React from 'react';
import { useGlobalContext } from '../context';

export default function Location({ location }) {
  const {
    savedUnits,
    setSavedLocations,
    savedLocations,
    setLoadedLocations,
    loadedLocations,
  } = useGlobalContext();

  const deleteLocation = (id) => {
    setLoadedLocations(loadedLocations.filter((loc) => loc.id !== id));
    setSavedLocations(savedLocations.filter((loc) => loc !== String(id)));
  };

  return (
    <article className='location'>
      <div className='delDiv' onClick={() => deleteLocation(location.id)}>
        <h2>X</h2>
      </div>
      <img
        className='locationImg'
        src={`https://openweathermap.org/img/wn/${location.weather[0].icon}@2x.png`}
        alt='Clouds'
      />
      <h1>
        {Math.floor(location.main.temp)}
        <span>&#176;</span>
        {String(savedUnits) === 'imperial' ? 'F' : 'C'}
      </h1>
      <h3>- {location.weather[0].description} -</h3>
      <p>{location.name}</p>
    </article>
  );
}
