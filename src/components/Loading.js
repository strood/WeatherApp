import React from 'react';
import { Spinner } from '@chakra-ui/react';

export default function Loading() {
  return (
    <div className='main'>
      <Spinner />
      <h1>Loading...</h1>
    </div>
  );
}
