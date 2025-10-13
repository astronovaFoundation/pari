"use client"

import { Facebook, Twitter, Instagram, MapPin } from "lucide-react"
import Image from "next/image"
import { Button } from "../ui/button"
import { Input } from "@/components/ui/Input"
import { useState } from "react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<string>("")

  async function subscribe() {
    setMsg("")
    const v = email.trim()
    if (!/.+@.+\..+/.test(v)) { setMsg("Enter a valid email"); return }
    setBusy(true)
    try {
      const r = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: v.toLowerCase() }),
      })
      const j = await r.json().catch(() => ({}))
      if (!r.ok) setMsg(j?.error || "Failed to subscribe")
      else { setMsg("Subscribed!"); setEmail("") }
    } finally { setBusy(false) }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") subscribe()
  }

  return (
    <footer className="secondary-background py-12 ">
      <div className="min-w-full ">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8 px-4 lg:px-36">
          {/* Brand Section */}
          <div className="space-y-4">
            <Image src="/secondary-logo.png" alt="Logo" width={206} height={89} />
            <p className="text-[#7a7992] text-sm">Open hours: 9:30 AM - 6:30 PM Mon-Sat 11:00 AM - 5:30 PM Sun</p>
            <div className="flex space-x-3">
              <div className="w-10 h-10 btn-gradient rounded-full flex items-center justify-center cursor-pointer">
                <Facebook className="w-5 h-5 text-white" />
              </div>
              <div className="w-10 h-10 btn-gradient rounded-full flex items-center justify-center cursor-pointer">
                <Twitter className="w-5 h-5 text-white" />
              </div>
              <div className="w-10 h-10 btn-gradient rounded-full flex items-center justify-center cursor-pointer">
                <Instagram className="w-5 h-5 text-white" />
              </div>
              <div className="w-10 h-10 btn-gradient rounded-full flex items-center justify-center cursor-pointer">
                <MapPin className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* Contacts Section */}
          <div className="space-y-4">
            <h3 className="text-[#2d2c40] font-semibold text-lg">CONTACTS</h3>
            <div className="space-y-2">
              <p className="text-[#2d2c40] font-medium">(510) 479-1045</p>
              <p className="text-[#7a7992]">info.parieyebrowthreading@gmail.com</p>
              <div className="pt-2">
                <p className="text-[#2d2c40] font-medium">4025 International Blvd</p>
                <p className="text-[#7a7992]">Oakland, CA 94601</p>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h3 className="text-foreground font-semibold text-lg">OUR NEWSLETTER</h3>
            <div className="space-y-3">
              <div className="flex">
                <Input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={onKeyDown}
                  className="rounded-r-none border-[#dbdbdb] rounded-l-full bg-white"
                />
                <Button onClick={subscribe} loading={busy} disabled={busy} className="btn-gradient text-sm font-medium text-white !rounded-l-none rounded-r-full">
                  SUBSCRIBE
                </Button>
              </div>
              {msg && <p className="text-secondary text-xs">{msg}</p>}
              <p className="text-secondary text-sm">Subscribe to our mailing list to get the updates to your email inbox.</p>
            </div>
          </div>

          {/* Images */}
          <Image src="/footer.png" alt="Gallery Image 1" width={400} height={400} />
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-secondary/30 lg:px-36 pt-6 ">
          <div className="flex gap-3 flex-col md:flex-row justify-between items-center md:space-y-0">
            <p className="text-secondary text-sm">Copyright ©2025 Pari Eyebrow Threading Palace.</p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-secondary hover:text-secondary/70">About</a>
              <a href="#" className="text-secondary hover:text-secondary/70">Terms & Conditions</a>
              <a href="#" className="text-secondary hover:text-secondary/70">Privacy Policy</a>
              <a href="#" className="text-secondary hover:text-secondary/70">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

