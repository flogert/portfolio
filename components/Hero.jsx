import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Typewriter from 'typewriter-effect'
import { motion } from 'framer-motion'

const Hero = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen pt-20'>
      <div className='flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl px-4'>
        
        {/* Social Links - Left Side (Desktop) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className={`hidden lg:flex flex-col fixed top-1/2 transform -translate-y-1/2 z-10 transition-all duration-500 ease-in-out ${
          isScrolled ? 'left-0 gap-2' : 'left-8 gap-4'
        }`}>
          <Link href='https://github.com/Flogert' target='_blank' title='Github Portfolio'>
            <div className={`bg-white dark:bg-space-light border border-teal-500 dark:border-space-neon hover:bg-teal-500 dark:hover:bg-space-neon hover:text-white dark:hover:text-space-dark transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${
              isScrolled ? 'p-1.5 w-10 h-10 rounded-r-lg rounded-l-none border-l-0 shadow-md' : 'p-2 w-12 h-12 rounded-full'
            }`}>
              <Image src="/github.svg" width={isScrolled ? 20 : 24} height={isScrolled ? 20 : 24} alt="GitHub" className="filter dark:invert" />
            </div>
          </Link>
          <Link href='https://www.linkedin.com/in/flogertbardhi/' target='_blank' title='LinkedIn Profile'>
            <div className={`bg-white dark:bg-space-light border border-teal-500 dark:border-space-neon hover:bg-teal-500 dark:hover:bg-space-neon hover:text-white dark:hover:text-space-dark transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${
              isScrolled ? 'p-1.5 w-10 h-10 rounded-r-lg rounded-l-none border-l-0 shadow-md' : 'p-2 w-12 h-12 rounded-full'
            }`}>
              <Image src="/linkedin.svg" width={isScrolled ? 20 : 24} height={isScrolled ? 20 : 24} alt="LinkedIn" className="filter dark:invert" />
            </div>
          </Link>
          <Link href='https://twitter.com/HappyTreeArts' target='_blank' title='Twitter'>
            <div className={`bg-white dark:bg-space-light border border-teal-500 dark:border-space-neon hover:bg-teal-500 dark:hover:bg-space-neon hover:text-white dark:hover:text-space-dark transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${
              isScrolled ? 'p-1.5 w-10 h-10 rounded-r-lg rounded-l-none border-l-0 shadow-md' : 'p-2 w-12 h-12 rounded-full'
            }`}>
              <Image src="/twitter.svg" width={isScrolled ? 20 : 24} height={isScrolled ? 20 : 24} alt="Twitter" className="filter dark:invert" />
            </div>
          </Link>
          <Link href='https://www.instagram.com/happytreearts/' target='_blank' title='Instagram'>
            <div className={`bg-white dark:bg-space-light border border-teal-500 dark:border-space-neon hover:bg-teal-500 dark:hover:bg-space-neon hover:text-white dark:hover:text-space-dark transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${
              isScrolled ? 'p-1.5 w-10 h-10 rounded-r-lg rounded-l-none border-l-0 shadow-md' : 'p-2 w-12 h-12 rounded-full'
            }`}>
              <Image src="/instagram.svg" width={isScrolled ? 20 : 24} height={isScrolled ? 20 : 24} alt="Instagram" className="filter dark:invert" />
            </div>
          </Link>
        </motion.div>

        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='flex-1 text-center lg:text-left lg:pr-10 mb-10 lg:mb-0'
        >
          <div className='text-teal-700 dark:text-space-neon text-xl mb-4 font-mono font-bold'>
            <Typewriter
              options={{
                strings: ['Hello Internet!', 'Welcome to my space station!', 'I build things for the web.'],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
          <h1 className='text-4xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 neon-text'>
            Flogert Bardhi
          </h1>
          <p className='text-lg text-slate-700 dark:text-space-accent max-w-2xl leading-relaxed font-medium'>
            I am a web developer who enjoys painting happy little trees and writing poems. 
            Explore my digital universe to see my projects, artwork, and thoughts.
          </p>
        </motion.div>

        {/* Profile Image & Tech Stack */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className='relative'
        >
          <div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-teal-600 dark:border-space-neon neon-border animate-pulse-slow shadow-xl">
            <Image 
              className='object-cover'
              src="/profile.jpg" 
              fill
              alt="Flogert Bardhi" 
              priority
              sizes="(max-width: 768px) 256px, 320px"
              quality={82}
            />
          </div>
        </motion.div>

      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className='absolute bottom-10 animate-bounce'
      >
        <Link href='#projects' scroll={false}>
            <svg className="w-10 h-10 text-teal-600 dark:text-space-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
        </Link>
      </motion.div>
    </div>
  )
}

export default Hero
