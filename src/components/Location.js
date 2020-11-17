import React from 'react';
import { useGlobalContext } from '../context';

export default function Location({ location }) {
  const {
    setSavedLocations,
    savedLocations,
    setLoadedLocations,
    loadedLocations,
  } = useGlobalContext();

  const deleteLocation = (id) => {
    console.log(String(id));
    console.log(loadedLocations);
    console.log(savedLocations);
    setLoadedLocations(loadedLocations.filter((loc) => loc.id !== id));
    setSavedLocations(savedLocations.filter((loc) => loc !== String(id)));
  };

  console.log(location);
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
        <span>&#176;</span>C
      </h1>
      <h3>- {location.weather[0].description} -</h3>
      <p>{location.name}</p>
    </article>
  );
}
