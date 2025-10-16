"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone, Facebook, Twitter, Instagram, Menu, X, Clock } from 'lucide-react'
import { Button } from '../ui/button'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleBookAppointment = () => {
    window.open(process.env.NEXT_PUBLIC_SQUARE_BOOKING_URL, '_blank')
  }

  // Navigation items
  const navItems = [
    { name: 'HOME', href: '/' },
    { name: 'SERVICES', href: '#Services' },
    { name: 'PRICING', href: '#Pricing' },
    { name: 'GALLERY', href: '#gallery' },
    { name: 'FAQ', href: '#faq' }
  ]

  return (
    <div className='min-w-full z-50 sticky top-0 mb-0 pb-0'>
      {/* Top Bar - Hidden on mobile, shown on desktop */}
      <div className='hidden lg:flex primary-gradient px-4 lg:px-36 text-white justify-between items-center py-3 text-sm'>
        <div className='gap-6 lg:gap-10 flex items-center'>
          <div className='flex gap-2 items-center'>
            <Mail className='inline mr-2' size={16} color='white' />
            <span>info.parieyebrowthreading@gmail.com</span>
          </div>
          <div className='flex gap-2 items-center'>
            <Phone className='inline' size={16} color='white' fill='white' />
            <span>(510) 479-1045</span>
          </div>
        </div>

        <div className='flex gap-6 items-center'>
          <p className='text-sm'>Open hours: 9:30 AM - 6:30 PM Mon-Sat 11:00 AM - 5:30 PM Sun</p>
          <div className='border-[1px] border-white rotate-90 w-5'/>
          <div className='flex gap-3'>
            <Link href='https://www.facebook.com/profile.php?id=61581967272494' className='hover:opacity-80 transition-opacity'>
              <Facebook className='cursor-pointer' size={18} color='white' />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href='https://twitter.com/ParieyeBrowThreading' className='hover:opacity-80 transition-opacity'>
              <Twitter className='cursor-pointer' size={18} color='white' />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href='https://www.instagram.com/pari_eyebrow_threading_palace?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' className='hover:opacity-80 transition-opacity'>
              <Instagram className='cursor-pointer' size={18} color='white' />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="primary flex flex-row justify-between items-center px-4 lg:px-36  mb-0">
        <Link href="/" className="focus:outline-none focus:ring-2 focus:ring-white rounded">
          <Image 
            src="/logo.webp" 
            alt="Pari Eyebrow Threading Logo" 
            width={206} 
            height={89} 
            className="h-16 w-auto md:h-20" 
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden lg:flex text-md text-white' role="navigation" aria-label="Main navigation">
          <ul className='flex items-center space-x-8'>
            {navItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.href} 
                  className="hover:text-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded px-2 py-1"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Actions */}
        <div className='hidden lg:flex items-center gap-3'>
          <Button 
            onClick={handleBookAppointment} 
            className='text-white border border-white px-5 py-2 text-sm !rounded-md hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-white/50'
            aria-label="Book Appointment"
          >
            Book Appointment
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white p-2 focus:outline-none focus:ring-2 focus:ring-white rounded"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden bg-primary border-t border-white/20 shadow-lg"
          role="dialog"
          aria-label="Mobile navigation menu"
          aria-modal="true"
        >
          {/* Top Bar Info - Mobile Only */}
          <div className="px-5 py-5 border-b border-white/20 text-white">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Mail size={18} className="opacity-90 flex-shrink-0" />
                <span className="truncate text-sm">info.parieyebrowthreading@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="opacity-90 flex-shrink-0" />
                <span className="text-sm">(510) 479-1045</span>
              </div>
              <div className="flex items-start gap-3 leading-snug">
                <Clock size={18} className="mt-0.5 opacity-90 flex-shrink-0" />
                <span className="text-sm text-white/90">
                  <span className="block"><span className="font-medium text-white">Mon–Sat:</span> 9:30 AM – 6:30 PM</span>
                  <span className="block"><span className="font-medium text-white">Sun:</span> 11:00 AM – 5:30 PM</span>
                </span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-5 pt-5 border-t border-white/10">
              <Link href='https://www.facebook.com/profile.php?id=61581967272494' className='hover:opacity-80 transition-opacity'>
                <Facebook size={20} className="cursor-pointer" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href='https://twitter.com/ParieyeBrowThreading' className='hover:opacity-80 transition-opacity'>
                <Twitter size={20} className="cursor-pointer" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href='https://www.instagram.com/pari_eyebrow_threading_palace?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' className='hover:opacity-80 transition-opacity'>
                <Instagram size={20} className="cursor-pointer" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-5 py-5" role="navigation" aria-label="Mobile navigation">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block text-white py-3 text-lg hover:text-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded px-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-6 mt-2 border-t border-white/20">
              <Button
                onClick={() => {
                  handleBookAppointment()
                  setMobileMenuOpen(false)
                }}
                className="w-full border border-white text-white py-3 text-base !rounded-md hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Book Appointment"
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