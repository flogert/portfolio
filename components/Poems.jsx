import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { poems } from '../data/poems'

const categories = ["All", ...new Set(poems.map(p => p.category))];
const swipeThreshold = 75;

const Poems = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const poemScrollRef = useRef(null);

  const filteredPoems = useMemo(() => {
    return poems.filter(poem => {
      const matchesCategory = selectedCategory === "All" || poem.category === selectedCategory;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = poem.title.toLowerCase().includes(searchLower) || 
                          poem.content.toLowerCase().includes(searchLower) ||
                          poem.tags.some(tag => tag.toLowerCase().includes(searchLower));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Reset index when filter changes to avoid out of bounds
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    if (poemScrollRef.current) {
      poemScrollRef.current.scrollTop = 0;
    }
  }, [currentIndex, selectedCategory, searchQuery]);

  const currentPoem = filteredPoems[currentIndex];

  const nextPoem = () => {
    if (filteredPoems.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredPoems.length);
  };

  const prevPoem = () => {
    if (filteredPoems.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filteredPoems.length) % filteredPoems.length);
  };

  const handleSwipeNavigation = (_, info) => {
    if (filteredPoems.length <= 1) return;

    if (info.offset.x <= -swipeThreshold) {
      nextPoem();
    }

    if (info.offset.x >= swipeThreshold) {
      prevPoem();
    }
  };

  return (
    <div id="poems" className='min-h-screen py-20 px-4 flex flex-col items-center justify-center relative overflow-x-hidden'>
      {/* Background Elements for Coziness */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-200 to-white dark:from-space-dark dark:to-space-light opacity-50 pointer-events-none"></div>
      
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 neon-text z-10'
      >
        Captain&apos;s Log: Poetry
      </motion.h2>

      {/* Search and Filter Controls */}
      <div className="w-full max-w-5xl mb-8 flex flex-col gap-4 z-10">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/30 scale-105'
                  : 'bg-white dark:bg-space-light text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-space-dark border border-gray-200 dark:border-space-purple/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-full bg-white dark:bg-space-light border border-gray-200 dark:border-space-purple/30 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-space-neon text-gray-900 dark:text-white placeholder-gray-400"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        </div>

        {filteredPoems.length > 0 && (
          <div className="md:hidden w-full flex flex-col gap-2 rounded-2xl border border-gray-200 bg-white/75 p-4 shadow-lg backdrop-blur-sm dark:border-space-purple/30 dark:bg-space-light/75">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-space-accent/80">
              <span>Archive</span>
              <span>{currentIndex + 1} / {filteredPoems.length}</span>
            </div>
            <select
              value={currentIndex}
              onChange={(e) => setCurrentIndex(Number(e.target.value))}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-space-purple/30 dark:bg-space-dark dark:text-white dark:focus:border-space-neon dark:focus:ring-space-neon/20"
            >
              {filteredPoems.map((poem, idx) => (
                <option key={poem.title} value={idx}>
                  {poem.title} ({poem.date})
                </option>
              ))}
            </select>
            <div className="flex items-center justify-between gap-3 pt-1">
              <button
                onClick={prevPoem}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-teal-400 hover:text-teal-600 dark:border-space-purple/30 dark:bg-space-dark dark:text-white dark:hover:border-space-neon dark:hover:text-space-neon"
                aria-label="Previous poem"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                Previous
              </button>
              <span className="text-[11px] uppercase tracking-[0.18em] text-gray-400 dark:text-space-accent/70">
                Swipe card
              </span>
              <button
                onClick={nextPoem}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-teal-400 hover:text-teal-600 dark:border-space-purple/30 dark:bg-space-dark dark:text-white dark:hover:border-space-neon dark:hover:text-space-neon"
                aria-label="Next poem"
              >
                Next
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {filteredPoems.length > 0 ? (
        <div className="relative z-10 grid w-full max-w-5xl items-stretch gap-6 md:grid-cols-[minmax(0,1.7fr)_minmax(250px,0.9fr)]">
          
          {/* Poem Card */}
          <div className="relative flex min-h-[28rem] max-h-[78vh] flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white/90 p-6 shadow-2xl backdrop-blur-sm dark:border-space-purple/30 dark:bg-space-light/90 md:p-8">
              {/* Paper texture effect overlay */}
              <div className="absolute inset-0 rounded-lg opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>

              <AnimatePresence mode='wait'>
                  <motion.div
                      key={currentPoem.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.18}
                      onDragEnd={handleSwipeNavigation}
                      className="flex h-full flex-1 flex-col touch-pan-y"
                  >
                      <div className="mb-5 flex flex-col gap-4 border-b border-gray-300 pb-4 dark:border-space-purple/30 md:flex-row md:items-start md:justify-between">
                        <div className="min-w-0">
                          <h3 className="text-2xl md:text-3xl font-serif font-bold text-teal-800 dark:text-space-neon">{currentPoem.title}</h3>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {currentPoem.tags.map(tag => (
                              <span key={tag} className="text-xs font-mono text-teal-600 dark:text-space-accent bg-teal-50 dark:bg-space-dark/50 px-2 py-1 rounded-full border border-teal-100 dark:border-space-purple/30">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex shrink-0 flex-col items-start gap-2 md:items-end">
                          <span className="text-sm font-mono text-gray-500 dark:text-space-accent opacity-70 whitespace-nowrap">{currentPoem.date}</span>
                          <span className="text-xs font-mono uppercase tracking-[0.18em] text-gray-400 dark:text-space-accent/70">
                            Entry {currentIndex + 1} of {filteredPoems.length}
                          </span>
                        </div>
                      </div>

                      <div ref={poemScrollRef} className="custom-scrollbar flex-1 overflow-y-auto pr-1">
                          <p className="mb-6 text-center font-serif text-lg italic leading-relaxed text-gray-800 whitespace-pre-line dark:text-gray-200 md:text-[1.15rem]">
                              {currentPoem.content}
                          </p>
                      </div>

                      {filteredPoems.length > 1 && (
                        <div className="mt-2 flex justify-center md:hidden">
                          <span className="rounded-full bg-gray-100 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-gray-400 dark:bg-space-dark/70 dark:text-space-accent/70">
                            Swipe left or right to change entry
                          </span>
                        </div>
                      )}

                      <div className="mt-5 flex items-center justify-center border-t border-gray-300 pt-4 dark:border-space-purple/30">
                          <Link 
                              href={currentPoem.link} 
                              target="_blank"
                              className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 dark:text-space-neon hover:underline transition-all"
                          >
                              <span>Read on Blogger</span>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                              </svg>
                          </Link>
                      </div>
                  </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
                        <div className="mt-5 flex items-center justify-between border-t border-gray-300 pt-4 dark:border-space-purple/30">
                  <button 
                      onClick={prevPoem}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-space-dark transition-colors text-teal-600 dark:text-space-neon"
                      aria-label="Previous Poem"
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                  </button>
                  
                    <div className="mx-4 flex max-w-[55%] flex-wrap items-center justify-center gap-2 md:max-w-[60%]">
                      {filteredPoems.map((_, idx) => (
                          <button
                              key={idx}
                              onClick={() => setCurrentIndex(idx)}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                  idx === currentIndex 
                                      ? 'bg-teal-600 dark:bg-space-neon w-4' 
                                      : 'bg-gray-300 dark:bg-space-accent/30 hover:bg-teal-400 dark:hover:bg-space-neon/50'
                              }`}
                              aria-label={`Go to poem ${idx + 1}`}
                          />
                      ))}
                  </div>

                  <button 
                      onClick={nextPoem}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-space-dark transition-colors text-teal-600 dark:text-space-neon"
                      aria-label="Next Poem"
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                  </button>
              </div>
          </div>

          {/* Side List (Desktop) */}
            <div className="hidden min-h-0 md:flex md:flex-col md:gap-4">
              <h3 className="text-xl font-bold text-gray-700 dark:text-space-accent mb-2 pl-2 border-l-4 border-teal-500 dark:border-space-neon">Archive</h3>
              <div className="custom-scrollbar flex max-h-[78vh] flex-col gap-3 overflow-y-auto pr-2">
                  {filteredPoems.map((poem, idx) => (
                      <button
                          key={idx}
                          onClick={() => setCurrentIndex(idx)}
                          className={`text-left p-4 rounded-lg transition-all duration-300 border ${
                              idx === currentIndex
                        ? 'bg-teal-50 dark:bg-space-light border-teal-500 dark:border-space-neon shadow-md ring-1 ring-teal-500/30 dark:ring-space-neon/30'
                                  : 'bg-white/50 dark:bg-space-dark/50 border-transparent hover:bg-white dark:hover:bg-space-light hover:border-gray-300 dark:hover:border-space-purple/50'
                          }`}
                      >
                          <h4 className={`font-bold ${idx === currentIndex ? 'text-teal-700 dark:text-space-neon' : 'text-gray-600 dark:text-gray-400'}`}>
                              {poem.title}
                          </h4>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 font-mono">{poem.date}</p>
                      </button>
                  ))}
              </div>
          </div>

        </div>
      ) : (
        <div className="text-center py-12 z-10">
          <p className="text-gray-500 dark:text-space-accent text-lg">No logs found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

export default Poems
