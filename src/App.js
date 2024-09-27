import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieSearch from './screens/Home';
import MovieDetails from './screens/MovieDetails';
import Navigation from './components/Navigation';
import Error from './screens/Error';

function App() {
  return (
    <>
      <Navigation />
      <Router>
        <Routes>
          <Route path="/" element={<MovieSearch />} />
          <Route path="/movie/:imdbID" element={<MovieDetails />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
