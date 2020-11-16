import './styles/index.scss';

//React based imports below
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AppProvider } from './context';
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
