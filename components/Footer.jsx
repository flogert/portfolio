import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from './Logo'

const Footer = () => {
  return (
    <footer className='w-full bg-gray-900 dark:bg-space-dark border-t border-white/10 text-gray-300 transition-colors duration-300'>
      <div className='max-w-7xl mx-auto px-6 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>

          {/* Brand */}
          <div className='flex flex-col gap-4'>
            <Link href='/' className='flex items-center gap-2 w-fit'>
              <Logo />
              <span className='text-xl font-bold text-white'>Flogert Bardhi</span>
            </Link>
            <p className='text-sm text-gray-400 leading-relaxed max-w-xs'>
              Web developer &amp; digital artist based online. Building clean, performant websites and web applications.
            </p>
            <div className='flex gap-3 mt-2'>
              <Link href='https://github.com/Flogert' target='_blank' title='GitHub' className='p-2 rounded-lg bg-white/5 hover:bg-teal-500/20 border border-white/10 hover:border-teal-500/50 transition-all duration-300'>
                <Image src='/github.svg' width={18} height={18} alt='GitHub' className='invert' loading='lazy' />
              </Link>
              <Link href='https://www.linkedin.com/in/flogertbardhi/' target='_blank' title='LinkedIn' className='p-2 rounded-lg bg-white/5 hover:bg-teal-500/20 border border-white/10 hover:border-teal-500/50 transition-all duration-300'>
                <Image src='/linkedin.svg' width={18} height={18} alt='LinkedIn' className='invert' loading='lazy' />
              </Link>
              <Link href='https://twitter.com/HappyTreeArts' target='_blank' title='Twitter' className='p-2 rounded-lg bg-white/5 hover:bg-teal-500/20 border border-white/10 hover:border-teal-500/50 transition-all duration-300'>
                <Image src='/twitter.svg' width={18} height={18} alt='Twitter' className='invert' loading='lazy' />
              </Link>
              <Link href='https://www.instagram.com/happytreearts/' target='_blank' title='Instagram' className='p-2 rounded-lg bg-white/5 hover:bg-teal-500/20 border border-white/10 hover:border-teal-500/50 transition-all duration-300'>
                <Image src='/instagram.svg' width={18} height={18} alt='Instagram' className='invert' loading='lazy' />
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className='text-xs font-semibold uppercase tracking-widest text-teal-400 mb-5'>Navigation</p>
            <ul className='space-y-3'>
              {[
                { label: 'Projects', href: '#projects' },
                { label: 'Art Gallery', href: '#art' },
                { label: 'Poems', href: '#poems' },
                { label: 'Hire Me', href: '#contact' },
                { label: 'DeviantArt', href: 'https://www.deviantart.com/happytreearts', external: true },
              ].map(({ label, href, external }) => (
                <li key={label}>
                  <Link
                    href={href}
                    target={external ? '_blank' : undefined}
                    scroll={!external ? false : undefined}
                    className='text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group'
                  >
                    <span className='w-0 group-hover:w-3 h-px bg-teal-400 transition-all duration-300 inline-block' />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className='text-xs font-semibold uppercase tracking-widest text-teal-400 mb-5'>Get In Touch</p>
            <p className='text-sm text-gray-400 mb-4 leading-relaxed'>
              Available for freelance web development projects. Let&apos;s build something together.
            </p>
            <Link
              href='mailto:flogertbardhi@gmail.com'
              className='inline-flex items-center gap-2 text-sm font-medium text-white bg-teal-600/20 hover:bg-teal-600/40 border border-teal-500/40 hover:border-teal-500 px-4 py-2.5 rounded-lg transition-all duration-300'
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              flogertbardhi@gmail.com
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-white/10'>
        <div className='max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3'>
          <p className='text-xs text-gray-500'>&copy; {new Date().getFullYear()} Flogert Bardhi. All rights reserved.</p>
          <p className='text-xs text-gray-600'>Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

