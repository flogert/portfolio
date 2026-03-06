import React from 'react'
import Head from 'next/head'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Gallery from '../components/Gallery'
import Poems from '../components/Poems'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Flogert Bardhi | Space Portfolio</title>
        <meta name="description" content="Flogert Bardhi Portfolio Website - Web Developer & Artist" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full min-h-screen bg-gray-50 dark:bg-space-dark text-gray-900 dark:text-white overflow-x-hidden transition-colors duration-300">
        <Navbar />
        <Hero />
        <Projects />
        <Gallery />
        <Poems />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}
