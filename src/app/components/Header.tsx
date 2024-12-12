"use client"

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false); // State to manage the menu toggle

  return (
    <header className="header shadow-md bg-teal-900">
      <div className="flex items-center justify-between p-3">
        <div className="flex-grow">
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {/* Hamburger Icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <nav className={`flex-grow ${isOpen ? 'block' : 'hidden'} md:block`}>
            <ul className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-24">
              <li><Link href="/" className="transition duration-300">Home</Link></li>
              <li><Link href="/blogpost" className="transition duration-300">Blog Posts</Link></li>
              <li><Link href="/about" className="transition duration-300">About Us</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}