import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.nav
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="bg-transparent px-6 py-4 relative z-50">
            <div className="flex items-center justify-between">
                {/* Logo */}
                {/* <button className="bg-black text-white hidden md:flex cursor-pointer text-sm font-medium px-4 py-2 rounded hover:bg-gray-900">
                    Docs
                </button> */}

                {/* Desktop Menu */}
                {/* <ul className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
                    <li className="hover:text-black cursor-pointer">About</li>
                    <li className="hover:text-black cursor-pointer">Features</li>
                    <li className="hover:text-black cursor-pointer">Pricing</li>
                    <li className="hover:text-black cursor-pointer">Blog</li>
                </ul> */}
                <div className="flex md:items-center items-between space-x-2">
                    <Link to={'/'}>
                        <span className="md:text-2xl text-xl z-10 font-bold flex items-center cursor-pointer">
                            {/* <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                        </svg> */}
                            <span className='text-2xl md:text-4xl pr-2'>⌘</span> BuddyCRM
                        </span>
                    </Link>
                </div>

                {/* Buttons */}
                <div className="hidden md:flex items-center space-x-4">
                    {/* <Link to={'/login'}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-sm font-medium text-gray-700 cursor-pointer hover:text-black">Log in</motion.button>
                    </Link> */}
                    <Link to={'/signup'}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }} className="bg-black text-white text-sm font-medium px-4 cursor-pointer py-2 rounded hover:bg-gray-900">
                            Sign up
                        </motion.button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Animated Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="md:hidden mt-4 space-y-2 text-sm font-medium text-gray-700"
                    >
                        {/* <a href="#" className="block hover:text-black">About</a>
                        <a href="#" className="block hover:text-black">Features</a>
                        <a href="#" className="block hover:text-black">Pricing</a>
                        <a href="#" className="block hover:text-black">Blog</a> */}
                        <div className="pt-3 flex justify-center items-center gap-3 border-t">
                            <Link to={'/login'}>
                                <button className="border w-full border-black bg-white text-black cursor-pointer px-6 py-3 rounded-md hover:bg-gray-100 text-sm font-medium">Log in</button>
                            </Link>
                            <Link to={'/signup'}>
                                <button className="block w-full bg-black text-white px-6 cursor-pointer py-3 rounded hover:bg-gray-900">Sign up</button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
