import React from 'react';

// import components
import Navbar from './components/Navbar';
import Locations from './components/Locations';

function App() {
  return (
    <>
      <Navbar />
      <Locations />
      <footer>
        <p>
          Created by <a href='www.github.com/strood'>Strood</a>
        </p>
      </footer>
    </>
  );
}

export default App;
