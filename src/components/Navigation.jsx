import React, { useState } from 'react';

function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800 fixed w-screen">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                <div className="text-white text-2xl font-bold"><a href="/">Movie search by Osho</a></div>
                <div className="hidden md:block">
                    <ul className="flex space-x-4">
                        <li>
                            <a href="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/anything here" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
                                Error Screen
                            </a>
                        </li>
                    </ul>
                </div>
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={toggleMenu}
                >
                    {isOpen ? (
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    )}
                </button>
            </div>

            {isOpen && (
                <div className="md:hidden">
                    <ul className="bg-gray-700 space-y-2 px-4 py-2">
                        <li>
                            <a href="/" className="text-white hover:bg-gray-600 block px-3 py-2 rounded">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/anything here" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
                                Error Screen
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default Navigation;
