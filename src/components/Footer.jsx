import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-sm">
      <div className="container mx-auto px-4 py-2 flex flex-col md:flex-row justify-center md:justify-between items-center space-y-1 md:space-y-0">
        
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/products" className="hover:underline">Products</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </div>
        
        <div className="text-center md:text-right">
          &copy; 2025 My Marble Store. All rights reserved.
        </div>

      </div>
    </footer>
  )
}
