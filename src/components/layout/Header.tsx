"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone, Facebook, Twitter, Instagram, Menu, X, Clock } from 'lucide-react'
import { Button } from '../ui/button'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const SQUARE_BOOKING_URL = "https://app.squareupsandbox.com/appointments/book/iyrnbqtf0ygfyw/LJED5H1M5A5VD/start"

  const handleBookAppointment = () => {
    window.open(SQUARE_BOOKING_URL, '_blank')
  }

  return (
    <div className='min-w-full z-50 sticky top-0 mb-0 pb-0'>
      {/* Top Bar - Hidden on mobile, shown on desktop */}
      <div className='hidden lg:flex primary-gradient px-4 lg:px-36 text-white justify-between items-center py-2 text-sm'>
        <div className='gap-4 lg:gap-10 flex items-center'>
          <div className='flex gap-1 items-center'>
            <Mail className='inline mr-2' size={16} color='white' />
            info.parieyebrowthreading@gmail.com
          </div>
          <div className='flex gap-1 items-center'>
            <Phone className='inline' size={16} color='white' fill='white' />
            (510) 479-1045
          </div>
        </div>

        <div className='flex gap-4 items-center'>
          <p>Open hours: 9:30 AM - 6:30 PM Mon-Sat 11:00 AM - 5:30 PM Sun</p>
          <div className='border-[1px] border-white rotate-90 w-5'/>
          <div className='flex gap-3'>
            <Facebook className='inline mr-2 cursor-pointer' size={16} color='white' fill='white' />
            <Twitter className='inline mr-2 cursor-pointer' size={16} color='white' fill='white' />
            <Instagram className='inline mr-2 cursor-pointer' size={16} color='white' />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="primary flex flex-row justify-between items-center px-4 lg:px-36 mb-0 pb-0">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={206} height={89} className="h-20 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden lg:flex text-md text-white'>
          <ul className='flex items-center space-x-6'>
            <Link href="/" className="hover:text-white/80 transition-colors">HOME</Link>
            <Link href="#Services" className="hover:text-white/80 transition-colors">SERVICES</Link>
            <Link href="#Pricing" className="hover:text-white/80 transition-colors">PRICING</Link>
            <Link href="#gallery" className="hover:text-white/80 transition-colors">GALLERY</Link>
            <Link href="#faq" className="hover:text-white/80 transition-colors">FAQ</Link>
          </ul>
        </nav>

        {/* Desktop Actions */}
        <div className='hidden lg:flex items-center gap-3'>
          <Button onClick={handleBookAppointment} className='text-white border-1 border-white px-6 py-2 text-sm rounded-xl hover:opacity-90 transition-opacity'>
            Book Appointment
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white p-2"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-primary border-t border-white/20">
          {/* Top Bar Info - Mobile Only */}
          <div className="px-4 py-4 border-b border-white/20 text-sm text-white space-y-3">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Mail size={16} className="opacity-80" />
                <span className="truncate">info.parieyebrowthreading@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="opacity-80" />
                <span>(510) 479-1045</span>
              </div>
              <div className="flex items-start gap-2 leading-snug">
                <Clock size={16} className="mt-0.5 opacity-80" />
                <span className="text-xs text-white/90">
                  Mon–Sat: <span className="font-medium text-white">9:30 AM – 6:30 PM</span><br />
                  Sun: <span className="font-medium text-white">11:00 AM – 5:30 PM</span>
                </span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-4 pt-3 border-t border-white/10">
              <Facebook size={18} className="cursor-pointer hover:opacity-80 transition-opacity" fill="white" />
              <Twitter size={18} className="cursor-pointer hover:opacity-80 transition-opacity" fill="white" />
              <Instagram size={18} className="cursor-pointer hover:opacity-80 transition-opacity" />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-4 py-4 space-y-4">
            <Link
              href="/"
              className="block text-white py-2 hover:text-white/80 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              HOME
            </Link>
            <Link
              href="#Services"
              className="block text-white py-2 hover:text-white/80 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              SERVICES
            </Link>
            <Link
              href="#Pricing"
              className="block text-white py-2 hover:text-white/80 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              PRICING
            </Link>
            <Link
              href="#gallery"
              className="block text-white py-2 hover:text-white/80 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              GALLERY
            </Link>
            <Link
              href="#faq"
              className="block text-white py-2 hover:text-white/80 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>

            <div className="pt-4 border-t border-white/20">
              <Button
                onClick={() => {
                  handleBookAppointment()
                  setMobileMenuOpen(false)
                }}
                className="w-full border border-white text-white py-2 text-sm rounded-xl hover:bg-white/10 transition-colors"
              >
                Book Appointment
              </Button>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}

export default Header

