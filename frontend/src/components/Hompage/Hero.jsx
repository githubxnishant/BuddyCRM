import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="md:px-16 py-12 md:h-[80vh] bg-white overflow-hidden">
            <div className="grid h-full md:grid-cols-2 lg:flex-row items-center justify-between gap-12">
                {/* SVG Pattern Background */}
                <motion.div
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1.05 }}
                    transition={{ duration: 2, ease: 'easeOut' }}
                    className="absolute md:w-full w-[300vw] h-screen left-0 top-3 z-0 overflow-hidden">
                    <svg
                        viewBox="0 0 1440 680"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <path
                            d="M767.616 223.898L852.875 371.753L767.616 519.608H597.097L511.838 371.753L597.097 223.898L767.616 223.898Z"
                            stroke="#D8D8D8"
                            strokeDasharray="12 12"
                        />
                        <path
                            d="M572.721 -113.672L657.981 34.1829L572.721 182.038H402.203L316.943 34.1829L402.203 -113.672L572.721 -113.672Z"
                            stroke="#D8D8D8"
                            strokeDasharray="12 12"
                        />
                        <path
                            d="M257.838 73.8672L556.884 588.477L470.938 736.516H299.045L0 221.906L85.9461 73.8672L257.838 73.8672Z"
                            stroke="#D8D8D8"
                            strokeDasharray="12 12"
                        />
                    </svg>
                </motion.div>

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="text-center lg:text-left relative left-0 md:left-13 w-full z-10"
                >
                    <h1 className="text-5xl md:text-[75px] font-medium leading-tight mb-4">
                        Revoluzioned <br />
                        Customer <br />
                        Relationship
                    </h1>
                    <p className="text-gray-500 text-base sm:text-lg mb-6">
                        Streamline Operations, Boost Efficiency, and Drive Growth
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center z-10 lg:justify-start">
                        <Link to={'/dashboard'}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-black text-white cursor-pointer px-6 py-3 rounded-md hover:bg-gray-800 text-md font-medium"
                            >
                                Get Started
                            </motion.button>
                        </Link>
                        <a href='https://github.com/githubxnishant/BuddyCRM' target='blank'>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="border flex justify-center cursor-pointer items-center gap-3 border-black bg-white text-black px-6 py-3 rounded-md hover:bg-gray-100 text-md font-medium"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                                </svg>
                                Docs
                            </motion.button></a>
                    </div>

                    <p className="text-sm text-gray-500 mt-4">
                        Used and helping over <span className="font-semibold text-black">150+ Users</span> <span className="ml-1">🔍</span>
                    </p>
                </motion.div>

                {/* Right Image */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="hidden md:block w-[100vw] z-10"
                >
                    <img
                        src=".\src\assets\image.png"
                        alt="Dashboard Preview"
                        className=" h-[70vh] rounded-md shadow-sm"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
