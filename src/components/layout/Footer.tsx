"use client"

import { Facebook, Twitter, Instagram } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="secondary-background py-12 ">
      <div className="min-w-full ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 px-4 lg:px-36">
          {/* Brand Section */}
          <div className="space-y-4">
            <Image src="/secondary-logo.webp" alt="Logo" width={206} height={89} style={{ width: 'auto', height: 'auto' }} />
            <p className="text-secondary text-sm">Open hours: 9:30 AM - 6:30 PM Mon-Sat 11:00 AM - 5:30 PM Sun</p>
            <div className="flex space-x-3">
              <div className="w-10 h-10 btn-gradient rounded-full flex items-center justify-center cursor-pointer">
                <Link href="https://www.facebook.com/profile.php?id=61581967272494">
                <Facebook className="w-5 h-5 text-white" />
                </Link>
              </div>
              <div className="w-10 h-10 btn-gradient rounded-full flex items-center justify-center cursor-pointer">
                <Link href="https://twitter.com/PariEyebrow"> 
                <Twitter className="w-5 h-5 text-white" />
                </Link>
              </div>
              <div className="w-10 h-10 btn-gradient rounded-full flex items-center justify-center cursor-pointer">
                <Link href="https://www.instagram.com/pari_eyebrow_threading_palace?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==/">
                <Instagram className="w-5 h-5 text-white" />
                </Link>
              </div>
              <div className="w-10 h-10 btn-gradient rounded-full flex items-center justify-center cursor-pointer">
                <Link href="https://www.google.com/maps/place/4025+International+Blvd,+Oakland,+CA+94601/@37.789622,-122.197222,17z/data=!3m1!4b1!4m5!3m4!1s0x808f7e89bfaa6441:0x41503d5092049999!8m2!3d37.789618!4d-122.194334">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tiktok" viewBox="0 0 16 16">
  <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"/>
</svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Contacts Section */}
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold text-lg">CONTACTS</h3>
            <div className="space-y-2">
              <p className="text-foreground font-medium">(510) 479-1045</p>
              <p className="text-secondary text-xs">info.parieyebrowthreading@gmail.com</p>
              <div className="pt-2">  
                <p className="text-foreground font-medium">4025 International Blvd</p>
                <p className="text-secondary">Oakland, CA 94601</p>
              </div>
            </div>
          </div>

          {/* Images */}
          <Image src="/footer.webp" alt="Gallery Image 1" width={400} height={400} />
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-secondary/30 lg:px-36 pt-6 ">
          <div className="flex gap-3 flex-col md:flex-row justify-between items-center md:space-y-0">
            <p className="text-secondary text-sm">Copyright ©2025 Pari Eyebrow Threading Palace.</p>
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="text-secondary hover:text-secondary/70">Terms & Conditions</Link>
              <Link href="#" className="text-secondary hover:text-secondary/70">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

