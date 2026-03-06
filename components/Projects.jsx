import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const projectsData = [
  {
    title: "Syllable League",
    description: "An app where you guess League of Legends champions.",
    image: "/projects/syllable-league.png",
    link: "https://syllable-league.vercel.app/",
    category: "Games",
    tech: ["JavaScript", "HTML", "CSS"],
    tags: ["Browser Game", "Wordplay", "League of Legends", "Trivia"]
  },
  {
    title: "TFTdle",
    description: "Teamfight Tactics guessing games including Augments, Tacticians, and Traits.",
    image: "/projects/tft-games.png",
    link: "https://tft-games.vercel.app/",
    category: "Games",
    tech: ["Next.js", "Tailwind", "Framer Motion"],
    tags: ["Browser Game", "TFT", "Guessing", "Companion App"]
  },
  {
    title: "Pop Tarts Love",
    description: "A fun dating/matching app that pairs you with someone based on your shared love of Pop Tart flavors.",
    image: "/projects/pop-tarts-love.png",
    link: "https://pop-tarts-love.vercel.app/",
    category: "Experiments",
    tech: ["Next.js", "React", "Tailwind"],
    tags: ["Dating Concept", "Matching", "Playful UI", "Quiz"]
  },
  {
    title: "Stoltzfus Tile",
    description: "Website for a Pennsylvania tile installation company — showcasing services, gallery, testimonials, and contact.",
    image: "/projects/stoltzfus.png",
    link: "https://flogert.github.io/stoltzfus/",
    category: "Business",
    tech: ["React", "Tailwind", "Vite"],
    tags: ["Service Website", "Local Business", "Gallery", "Lead Generation"]
  },
  {
    title: "Tiff's Coffee Bar",
    description: "Website for a local mobile coffee bar — featuring a menu, event booking calendar, gallery, and contact form.",
    image: "/projects/tiffs-coffee-bar.png",
    link: "https://tiffscoffeebar.com/",
    category: "Business",
    tech: ["React", "Tailwind", "Vite"],
    tags: ["Food & Drink", "Booking", "Menu", "Local Business"]
  },
  {
    title: "Meditation Time",
    description: "A meditation timer app.",
    image: "/projects/meditation-time.PNG",
    link: "https://flogert.github.io/meditation-time/",
    category: "Utilities",
    tech: ["JS", "HTML"],
    tags: ["Wellness", "Timer", "Minimal", "Focus"]
  },
  {
    title: "Illustrator Portfolio",
    description: "A portfolio showcasing game art, character designs, and environments.",
    image: "/projects/game-art.PNG",
    link: "https://flogert.github.io/illustrator-portfolio/",
    category: "Art",
    tech: ["React", "Tailwind", "Vite"],
    tags: ["Game Art", "Illustration", "Character Design", "Environment"]
  },
  {
    title: "Advice Generator",
    description: "Random advice generator using an API.",
    image: "/projects/advice-generator.PNG",
    link: "https://flogert.github.io/advice-generator-api/",
    category: "Utilities",
    tech: ["React", "API"],
    tags: ["API", "Utility", "Randomizer", "Frontend"]
  }
];

const categories = ["All", ...new Set(projectsData.map((project) => project.category))];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return projectsData.filter((project) => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch = !query || [
        project.title,
        project.description,
        project.category,
        ...project.tech,
        ...project.tags,
      ].some((value) => value.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div id="projects" className='min-h-screen py-20 px-4 flex flex-col items-center'>
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-16 neon-text'
      >
        Mission Logs
      </motion.h2>

      <div className="w-full max-w-4xl mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/30 scale-105'
                  : 'bg-white dark:bg-space-light text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-space-dark border border-gray-200 dark:border-space-purple/30'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <input
            type='text'
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder='Search projects...'
            className='w-full px-4 py-2 pl-10 rounded-full bg-white dark:bg-space-light border border-gray-200 dark:border-space-purple/30 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-space-neon text-gray-900 dark:text-white placeholder-gray-400'
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {(searchQuery || selectedCategory !== 'All') && (
        <div className='mb-8 flex w-full max-w-4xl items-center justify-between gap-4 text-sm text-gray-500 dark:text-space-accent/80'>
          <span>
            Showing {filteredProjects.length} mission log{filteredProjects.length === 1 ? '' : 's'}
            {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
            {searchQuery ? ` for "${searchQuery}"` : ''}
          </span>
        </div>
      )}
      
      <motion.div 
        layout
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full'
      >
        <AnimatePresence>
        {filteredProjects.map((project, index) => (
          <motion.div key={project.title} variants={item} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <Link href={project.link} target='_blank'>
              <div className='group relative bg-white dark:bg-space-light rounded-xl overflow-hidden border border-gray-200 dark:border-space-purple/30 hover:border-teal-500 dark:hover:border-space-neon transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transform hover:-translate-y-2'>
                
                {/* Image Container */}
                <div className='relative h-48 w-full overflow-hidden'>
                  <Image 
                    src={project.image} 
                    fill
                    alt={project.title}
                    className="object-cover brightness-[1.08] contrast-[1.03] group-hover:scale-110 group-hover:brightness-[1.14] transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={72}
                  />
                  <div className='absolute inset-0 bg-space-dark/30 group-hover:bg-transparent transition-colors duration-300'></div>
                </div>

                {/* Content */}
                <div className='p-6'>
                  <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-space-neon transition-colors'>{project.title}</h3>
                  <p className='text-gray-600 dark:text-space-accent text-sm mb-4'>{project.description}</p>

                  <div className='mb-3 flex items-center justify-between gap-3'>
                    <span className='text-xs font-mono text-teal-200 bg-black/50 dark:bg-space-dark/60 px-2 py-1 rounded border border-teal-300/20 dark:border-space-purple/30'>
                      {project.category}
                    </span>
                  </div>
                  
                  {/* Tech Stack Tags */}
                  <div className='flex flex-wrap gap-2'>
                    {project.tech.map((t, i) => (
                      <span key={i} className='text-xs font-mono px-2 py-1 rounded bg-gray-100 dark:bg-space-dark text-teal-600 dark:text-space-neon border border-teal-200 dark:border-space-neon/50'>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Decorative Corner */}
                <div className='absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-teal-500 dark:border-space-neon opacity-0 group-hover:opacity-100 transition-opacity'></div>
                <div className='absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-teal-500 dark:border-space-neon opacity-0 group-hover:opacity-100 transition-opacity'></div>
              </div>
            </Link>
          </motion.div>
        ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <div className='mt-10 rounded-2xl border border-gray-200 bg-white/80 px-6 py-8 text-center text-gray-600 shadow-lg backdrop-blur-sm dark:border-space-purple/30 dark:bg-space-light/70 dark:text-space-accent'>
          No projects matched that search. Try a project name, stack, or tag.
        </div>
      )}
    </div>
  )
}

export default Projects
