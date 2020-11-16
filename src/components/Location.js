import React from 'react';

export default function Location({ location }) {
  console.log(location);
  return (
    <sl-card className='location'>
      <h1 slot='header'>{location.name}</h1>
      <h3>
        {Math.floor(location.main.temp)}
        <span>&#176;</span>C
      </h3>
    </sl-card>
  );
}
