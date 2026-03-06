import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const services = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Web Design",
    description: "Clean, modern, and responsive designs tailored to your brand."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Frontend Development",
    description: "Pixel-perfect, performant frontends with React & Next.js."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    title: "Landing Pages",
    description: "High-converting landing pages that make a strong first impression."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l3-3 2 2 5-6 2 2M5 19h14" />
      </svg>
    ),
    title: "Art Commissions",
    description: "Open for commissions, with a focus on landscape acrylic paintings and nature-inspired pieces."
  }
]

const Contact = () => {
  return (
    <div id="contact" className='min-h-screen py-20 px-4 flex flex-col items-center bg-gray-50 dark:bg-space-dark transition-colors duration-300'>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 neon-text'
      >
        Hire Me
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className='text-gray-500 dark:text-space-accent text-center max-w-xl mb-16 text-lg'
      >
        Looking for a web developer, an art commission, or a custom landscape acrylic painting? Let&apos;s build or create something memorable together.
      </motion.p>

      {/* Services Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl w-full mb-20'
      >
        {services.map((service, i) => (
          <div
            key={i}
            className='flex flex-col items-center text-center p-6 bg-white dark:bg-space-light rounded-xl border border-gray-200 dark:border-space-purple/30 hover:border-teal-500 dark:hover:border-space-neon transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)]'
          >
            <div className='mb-4 text-teal-500 dark:text-space-neon'>
              {service.icon}
            </div>
            <h3 className='text-gray-900 dark:text-white font-bold mb-2'>{service.title}</h3>
            <p className='text-gray-500 dark:text-space-accent text-sm'>{service.description}</p>
          </div>
        ))}
      </motion.div>

      {/* Email CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className='flex flex-col items-center gap-6 text-center'
      >
        <p className='text-gray-500 dark:text-space-accent text-lg max-w-2xl'>
          Have a website project, art commission, or landscape acrylic concept in mind? I&apos;m available for both digital work and original painted pieces, and I&apos;ll get back to you within 24 hours.
        </p>
        <Link
          href='mailto:flogertbardhi@gmail.com'
          className='group flex items-center gap-3 px-8 py-4 rounded-xl bg-white dark:bg-space-light border border-teal-500/50 dark:border-space-neon/50 hover:border-teal-500 dark:hover:border-space-neon hover:shadow-[0_0_24px_rgba(0,212,255,0.25)] transition-all duration-300'
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 dark:text-space-neon flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className='text-gray-800 dark:text-white font-semibold text-lg group-hover:text-teal-600 dark:group-hover:text-space-neon transition-colors'>
            flogertbardhi@gmail.com
          </span>
        </Link>
      </motion.div>
    </div>
  )
}

export default Contact