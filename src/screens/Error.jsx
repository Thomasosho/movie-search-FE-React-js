import React from 'react';
import { useNavigate } from 'react-router-dom';

function Error() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
                <p className="text-gray-600 mb-6">
                    Oops! The page you are looking for does not exist.
                </p>
                <button
                    onClick={handleGoBack}
                    className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                    Go Back Home
                </button>
            </div>
        </div>
    );
}

export default Error;
