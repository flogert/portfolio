import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import { motion, AnimatePresence } from 'framer-motion'

const paintings = [
  { src: "/paintings/aloy.jpg", title: "Aloy", category: "Characters", tags: ["Horizon Zero Dawn", "Game", "Portrait", "Digital"] },
  { src: "/paintings/by-the-bridge.jpg", title: "By the Bridge", category: "Landscape", tags: ["Nature", "Water", "Green", "Scenery"] },
  { src: "/paintings/cabin.jpg", title: "Cabin", category: "Landscape", tags: ["Cozy", "Winter", "Snow", "House"] },
  { src: "/paintings/charlie.jpg", title: "Charlie", category: "Portraits", tags: ["Dog", "Pet", "Animal", "Cute"] },
  { src: "/paintings/city-lights.jpg", title: "City Lights", category: "Landscape", tags: ["Urban", "Night", "Lights", "City"] },
  { src: "/paintings/distant-peace.jpg", title: "Distant Peace", category: "Landscape", tags: ["Mountains", "Calm", "Vista", "Blue"] },
  { src: "/paintings/geralt.jpg", title: "Geralt", category: "Characters", tags: ["Witcher", "Game", "Fantasy", "Sword"] },
  { src: "/paintings/hills.jpg", title: "Hills", category: "Landscape", tags: ["Green", "Nature", "Rolling", "Field"] },
  { src: "/paintings/hogwarts.jpg", title: "Hogwarts", category: "Landscape", tags: ["Fantasy", "Castle", "Harry Potter", "Magic"] },
  { src: "/paintings/horizon.jpg", title: "Horizon", category: "Landscape", tags: ["Sunset", "Nature", "Sky", "Orange"] },
  { src: "/paintings/ionia.jpg", title: "Ionia", category: "Landscape", tags: ["Fantasy", "Game", "League of Legends", "Magic"] },
  { src: "/paintings/red-dead-redemption.jpg", title: "Red Dead Redemption", category: "Characters", tags: ["Game", "Cowboy", "Western", "Arthur"] },
  { src: "/paintings/spring.jpg", title: "Spring", category: "Landscape", tags: ["Flowers", "Nature", "Bright", "Season"] },
  { src: "/paintings/sunset.jpeg", title: "Sunset", category: "Landscape", tags: ["Orange", "Sun", "Water", "Dusk"] },
  { src: "/paintings/viego.jpg", title: "Viego", category: "Characters", tags: ["League of Legends", "Game", "Villain", "Ruined King"] },
  { src: "/paintings/warwick.jpg", title: "Warwick", category: "Characters", tags: ["League of Legends", "Game", "Monster", "Wolf"] },
  { src: "/paintings/windfall-haze.jpg", title: "Windfall Haze", category: "Landscape", tags: ["Abstract", "Blue", "Wind", "Art"] },
  { src: "/paintings/Moose.jpg", title: "Moose", category: "Portraits", tags: ["Animal", "Wildlife", "Nature", "Majestic"] },
  { src: "/paintings/Yosemite.jpg", title: "Yosemite", category: "Landscape", tags: ["Nature", "Mountains", "National Park", "Scenery"] },
  { src: "/paintings/Kratos.jpg", title: "Kratos", category: "Characters", tags: ["God of War", "Game", "Fantasy", "Warrior"] },
];

const categories = ["All", ...new Set(paintings.map(p => p.category))];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
};

const Gallery = () => {
  const [index, setIndex] = useState(-1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPaintings = useMemo(() => {
    return paintings.filter(painting => {
      const matchesCategory = selectedCategory === "All" || painting.category === selectedCategory;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = painting.title.toLowerCase().includes(searchLower) ||
                            painting.tags.some(tag => tag.toLowerCase().includes(searchLower));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Calculate the correct index for the lightbox based on filtered results
  const handleImageClick = (painting) => {
    const originalIndex = paintings.findIndex(p => p.src === painting.src);
    setIndex(originalIndex);
  };

  return (
    <div id="art" className='min-h-screen py-20 px-4 flex flex-col items-center bg-gray-100 dark:bg-space-dark/50 transition-colors duration-300'>
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 neon-text'
      >
        Galactic Gallery
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className='text-gray-600 dark:text-space-accent mb-8 text-center max-w-2xl'
      >
        &quot;We don&apos;t make mistakes, just happy little accidents.&quot; - Bob Ross
        <br/>
        (But in space, accidents can be problematic.)
      </motion.p>

      {/* Search and Filter Controls */}
      <div className="w-full max-w-4xl mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
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
            placeholder="Search artwork..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-full bg-white dark:bg-space-light border border-gray-200 dark:border-space-purple/30 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-space-neon text-gray-900 dark:text-white placeholder-gray-400"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <motion.div 
        layout
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl w-full'
      >
        <AnimatePresence>
          {filteredPaintings.map((painting) => (
            <motion.div 
              layout
              key={painting.src} 
              variants={item}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className='relative aspect-square cursor-pointer overflow-hidden rounded-lg border-2 border-transparent hover:border-teal-500 dark:hover:border-space-neon transition-all duration-300 group'
              onClick={() => handleImageClick(painting)}
            >
              <Image 
                src={painting.src} 
                fill
                alt={painting.title}
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                quality={68}
              />
              <div className='absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100'>
                <span className='text-white font-bold text-lg neon-text mb-1'>{painting.title}</span>
                <span className='text-teal-200 text-xs font-mono bg-black/50 px-2 py-1 rounded mb-2'>{painting.category}</span>
                <div className='flex flex-wrap justify-center gap-1 px-4'>
                  {painting.tags.slice(0, 3).map(tag => (
                    <span key={tag} className='text-[10px] text-gray-300 bg-black/30 px-1.5 py-0.5 rounded-full border border-white/10'>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredPaintings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-space-accent text-lg">No artwork found matching your criteria.</p>
        </div>
      )}

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={paintings.map(p => ({ 
          src: p.src, 
          title: p.title,
          description: p.category
        }))}
        plugins={[Zoom, Slideshow, Thumbnails, Captions, Fullscreen]}
        styles={{ 
          container: { backgroundColor: "rgba(0, 0, 0, .9)" },
          slide: { borderRadius: "16px", overflow: "hidden" } // Attempt to round images
        }}
        render={{
          slide: ({ slide, rect }) => (
             <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={slide.src} 
                  alt={slide.title} 
                  style={{ 
                    maxWidth: "100%", 
                    maxHeight: "100%", 
                    objectFit: "contain",
                    borderRadius: "12px",
                    boxShadow: "0 0 20px rgba(0,0,0,0.5)"
                  }} 
                />
             </div>
          )
        }}
      />
    </div>
  )
}

export default Gallery
