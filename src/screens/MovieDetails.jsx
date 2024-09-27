import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../config/config.json';

function MovieDetails() {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apiUrl = api.apiUrl;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}/${imdbID}`);
        setMovie(response.data);
      } catch (err) {
        setError('Error fetching movie details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  if (loading) return <p className="text-center text-gray-800">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!movie) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full md:w-1/3 h-auto rounded-lg shadow-lg mb-4 md:mb-0 md:mr-6"
          />
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">
              {movie.Title}
              <span className="text-lg text-gray-600"> ({movie.Year})</span>
            </h1>
            <p className="text-lg text-gray-600 mb-4">{movie.Genre}</p>
            <p className="text-sm text-gray-500">
              {movie.Runtime} | {movie.Rated} | Released: {movie.Released}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Plot</h2>
          <p className="text-gray-700 mb-6 text-justify">{movie.Plot}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Director</h3>
              <p className="text-gray-700">{movie.Director}</p>

              <h3 className="text-xl font-semibold mt-4 mb-2">Writers</h3>
              <p className="text-gray-700">{movie.Writer}</p>

              <h3 className="text-xl font-semibold mt-4 mb-2">Actors</h3>
              <p className="text-gray-700">{movie.Actors}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Language</h3>
              <p className="text-gray-700">{movie.Language}</p>

              <h3 className="text-xl font-semibold mt-4 mb-2">Country</h3>
              <p className="text-gray-700">{movie.Country}</p>

              <h3 className="text-xl font-semibold mt-4 mb-2">Awards</h3>
              <p className="text-gray-700">{movie.Awards}</p>

              <h3 className="text-xl font-semibold mt-4 mb-2">Box Office</h3>
              <p className="text-gray-700">{movie.BoxOffice}</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Ratings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {movie.Ratings.map((rating, index) => (
              <div key={index} className="bg-gray-200 p-4 rounded-lg shadow-md text-center content-center">
                <h3 className="text-lg font-bold">{rating.Source}</h3>
                <p className="text-xl font-semibold">{rating.Value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">IMDb Rating</h2>
          <p className="text-xl font-bold text-yellow-500">{movie.imdbRating} / 10</p>
          <p className="text-gray-600">{movie.imdbVotes} votes</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
