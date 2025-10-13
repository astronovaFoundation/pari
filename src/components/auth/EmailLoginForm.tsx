"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/label"
import { Mail } from "lucide-react"

export function EmailLoginForm({
  email,
  loading,
  error,
  onEmailChange,
  onSubmit,
  onBack,
}: {
  email: string
  loading: boolean
  error: string | null
  onEmailChange: (v: string) => void
  onSubmit: (e: React.FormEvent) => void
  onBack: () => void
}) {
  return (
    <div className="border-0 shadow-lg bg-white rounded-2xl p-6">
      <div className="text-center pb-6 relative">
        <button onClick={onBack} className="absolute left-0 p-2 text-[var(--secondary)] hover:text-[var(--foreground)] transition-colors">← Back</button>
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">Continue with Email</h2>
        <p className="text-[var(--secondary)]">We will send a 6-digit code to your email.</p>
      </div>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[var(--foreground)] font-medium">Email</Label>
          <div className="relative flex items-center">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none z-10">
              <Mail className="h-4 w-4 text-[var(--secondary)]" />
            </div>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              className="w-full h-12 pl-10 border-gray-200 focus:border-[var(--primary)] focus:ring-[var(--primary)] text-base"
              required
            />
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" loading={loading} disabled={loading} className="w-full bg-primary text-white hover:opacity-90 transition-opacity text-lg font-semibold rounded-lg disabled:opacity-50">
          {loading ? "Sending OTP..." : "Send OTP"}
        </Button>
      </form>
    </div>
  )
}


