import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Transition } from '@headlessui/react';
import { useTheme } from 'next-themes';
import Logo from './Logo';

const Navbar = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;
    const currentTheme = theme === 'system' ? systemTheme : theme;
    
    if (currentTheme === 'dark') {
        return (
            <button 
                className='w-8 h-8 p-1 rounded-md hover:bg-gray-200 dark:hover:bg-space-light transition-colors focus:outline-none' 
                onClick={() => setTheme('light')}
                aria-label="Switch to Light Mode"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            </button>
        )
    } else {
        return (
            <button 
                className='w-8 h-8 p-1 rounded-md hover:bg-gray-200 dark:hover:bg-space-light transition-colors focus:outline-none' 
                onClick={() => setTheme('dark')}
                aria-label="Switch to Dark Mode"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-space-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            </button>
        )
    }
  };

  return (
    <div>
        <nav className='fixed w-full h-20 z-50 bg-white/80 dark:bg-space-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-space-light transition-colors duration-300'>
            <div className='w-full h-full'>
                <div className='flex items-center justify-between h-full px-8 max-w-7xl mx-auto'>
                    <div className='flex-shrink-0 flex items-center'>
                        <Link href='/' className='flex items-center gap-2 text-2xl font-bold text-teal-600 dark:text-space-neon dark:neon-text transition-colors duration-300'>
                            <Logo />
                            <span className="hidden sm:block">Flogert Bardhi</span>
                        </Link>
                    </div>
                    <div className='hidden md:block'>
                        <div className='ml-10 flex items-center space-x-8'>
                            {renderThemeChanger()}
                            <Link 
                                href='/' 
                                className='text-gray-600 dark:text-space-accent hover:text-teal-600 dark:hover:text-space-neon dark:hover:neon-text px-3 py-2 rounded-md text-sm font-medium transition-all duration-300'
                            >
                                HOME
                            </Link>
                            <Link 
                                href='#projects'  
                                scroll={false}
                                className='text-gray-600 dark:text-space-accent hover:text-teal-600 dark:hover:text-space-neon dark:hover:neon-text px-3 py-2 rounded-md text-sm font-medium transition-all duration-300'
                            >
                                PROJECTS
                            </Link>
                            <Link 
                                href='#art'  
                                scroll={false}
                                className='text-gray-600 dark:text-space-accent hover:text-teal-600 dark:hover:text-space-neon dark:hover:neon-text px-3 py-2 rounded-md text-sm font-medium transition-all duration-300'
                            >
                                ART
                            </Link>
                            <Link 
                                href='#poems'  
                                scroll={false}
                                className='text-gray-600 dark:text-space-accent hover:text-teal-600 dark:hover:text-space-neon dark:hover:neon-text px-3 py-2 rounded-md text-sm font-medium transition-all duration-300'
                            >
                                POEMS
                            </Link>
                            <Link 
                                href='#contact'  
                                scroll={false}
                                className='text-gray-600 dark:text-space-accent hover:text-teal-600 dark:hover:text-space-neon dark:hover:neon-text px-3 py-2 rounded-md text-sm font-medium transition-all duration-300'
                            >
                                CONTACT
                            </Link>               
                        </div>
                    </div>
                    <div className='flex md:hidden items-center gap-4'>
                        {renderThemeChanger()}
                        <button onClick={() =>setIsOpen(!isOpen)} 
                            type='button' 
                            className='bg-gray-200 dark:bg-space-light inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-space-accent hover:text-white hover:bg-teal-600 dark:hover:bg-space-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-space-dark focus:ring-white'
                            aria-controls='mobile-menu'
                            aria-expanded='false'
                        >
                            <span className='sr-only'>Open main menu</span>
                            {!isOpen ? (
                                <svg 
                                    className='block h-6 w-6' 
                                    xmlns='http://www.w3.org/2000/svg' 
                                    fill='none' viewBox='0 0 24 24' 
                                    stroke='currentColor'
                                    aria-hidden='true'
                                >
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16'></path>
                                </svg> ) : (
                                <svg 
                                    className='flex h-6 w-6' 
                                    xmlns='http://www.w3.org/2000/svg' 
                                    fill='none' viewBox='0 0 24 24' 
                                    stroke='currentColor'
                                    aria-hidden='true'
                                >
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <Transition 
                show={isOpen}
                enter="transition ease-out duration-100 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                {(ref) => (
                    <div className="md:hidden" id="mobile-menu">
                        <div
                            ref={ref}
                            className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-space-light border-b border-gray-200 dark:border-space-purple"
                        >
                            <Link
                                href="/"
                                className="text-gray-600 dark:text-space-accent hover:bg-teal-50 dark:hover:bg-space-purple hover:text-teal-600 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                            >
                                Home
                            </Link>
                            <Link
                                href="#projects"
                                className="text-gray-600 dark:text-space-accent hover:bg-teal-50 dark:hover:bg-space-purple hover:text-teal-600 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                            >
                                Projects
                            </Link>
                            <Link
                                href="#art"
                                className="text-gray-600 dark:text-space-accent hover:bg-teal-50 dark:hover:bg-space-purple hover:text-teal-600 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                            >
                                Art
                            </Link>
                            <Link
                                href="#poems"
                                className="text-gray-600 dark:text-space-accent hover:bg-teal-50 dark:hover:bg-space-purple hover:text-teal-600 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                            >
                                Poems
                            </Link>
                            <Link
                                href="#contact"
                                className="text-gray-600 dark:text-space-accent hover:bg-teal-50 dark:hover:bg-space-purple hover:text-teal-600 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                            >
                                Contact
                            </Link>
                        </div>
					</div>
                )}
            </Transition>
        </nav>
    </div>
  )
}

export default Navbar