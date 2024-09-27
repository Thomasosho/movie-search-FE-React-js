import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../config/config.json';


function MovieSearch() {
    const [searchTitle, setSearchTitle] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const navigate = useNavigate();
    const apiUrl = api.apiUrl;

    const fetchSearchHistory = async () => {
        try {
            const response = await axios.get(`${apiUrl}/history`);
            console.log('response.data', response.data, showHistory);
            setSearchHistory(response.data);
        } catch (err) {
            console.error('Error fetching search history', err);
        }
    };

    useEffect(() => {
        fetchSearchHistory();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTitle) return;
        setLoading(true);
        setError('');
        setShowHistory(false);

        try {
            const response = await axios.get(`${apiUrl}/search`, {
                params: { title: searchTitle, page: 1 },
            });
            setMovies(response.data.Search || []);
        } catch (err) {
            setError('Error fetching data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleMovieClick = (imdbID) => {
        navigate(`/movie/${imdbID}`);
    };

    const handleHistoryClick = (title) => {
        setSearchTitle(title);
        setShowHistory(false);
        handleSearch(new Event('submit'));
    };

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mt-10">
                    <h1 className="text-3xl font-bold text-center mb-4">Search Movie</h1>
                    <form className="flex items-center mb-4" onSubmit={handleSearch}>
                        <input
                            type="text"
                            className="flex-grow p-2 border border-gray-800 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                            placeholder="Search for a movie..."
                            value={searchTitle}
                            onChange={(e) => setSearchTitle(e.target.value)}
                            onFocus={() => setShowHistory(true)}
                        />
                        <button
                            type="submit"
                            className="bg-gray-800 text-white p-2 rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            Search
                        </button>

                    </form>
                    {showHistory && searchHistory.length > 0 && (
                        <div className=" top-full left-0 w-full bg-white shadow-lg mt-1 rounded-lg z-10">
                            <ul>
                                {searchHistory.map((historyItem, index) => (
                                    <li
                                        key={index}
                                        className="cursor-pointer p-2 hover:bg-gray-100"
                                        onClick={() => handleHistoryClick(historyItem)}
                                    >
                                        {historyItem}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {loading && <p className="text-center text-gray-800">Loading...</p>}

                    {error && <p className="text-center text-red-500">{error}</p>}
                    {
                        movies.length >= 1 &&
                        <div className='font-bold mb-4'>
                            Movie Results:
                        </div>
                    }
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {movies.map((movie) => (
                            <div
                                key={movie.imdbID}
                                className="bg-gray-200 p-4 rounded-lg shadow-md cursor-pointer"
                                onClick={() => handleMovieClick(movie.imdbID)}
                            >
                                <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover rounded-lg mb-2" />
                                <h2 className="text-xl font-bold">{movie.Title}</h2>
                                <p>{movie.Year}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MovieSearch;
