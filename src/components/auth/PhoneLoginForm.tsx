"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/label"
import { Phone } from "lucide-react"

export function PhoneLoginForm({
  phoneNumber,
  fullName,
  email,
  showFullName,
  isSignup,
  loading,
  error,
  onFullNameChange,
  onEmailChange,
  onPhoneChange,
  onSubmit,
  onToggleSignup,
}: {
  phoneNumber: string
  fullName: string
  email: string
  showFullName: boolean
  isSignup: boolean
  loading: boolean
  error: string | null
  onFullNameChange: (v: string) => void
  onEmailChange: (v: string) => void
  onPhoneChange: (v: string) => void
  onSubmit: (e: React.FormEvent) => void
  onToggleSignup: () => void
}) {
  const countryCode = process.env.NEXT_PUBLIC_PHONE_COUNTRY_CODE || 
    process.env.NEXT_PUBLIC_COUNTRY_CODE || 
    "+1"

  return (
    <div className="border-0 shadow-lg bg-white rounded-2xl p-6">
      <div className="text-center pb-6">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-[var(--secondary)]">
          {isSignup ? "Enter your details to create a new account" : "Enter your details to sign in"}
        </p>
      </div>
      <form onSubmit={onSubmit} className="space-y-6">
        {showFullName && (
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-[var(--foreground)] font-medium">
              Full Name
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => onFullNameChange(e.target.value)}
              className="h-12 border-gray-200 focus:border-[var(--primary)] focus:ring-[var(--primary)] text-base"
              required={showFullName}
            />
          </div>
        )}

        {showFullName && (
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[var(--foreground)] font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              className="h-12 border-gray-200 focus:border-[var(--primary)] focus:ring-[var(--primary)] text-base"
              required
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-[var(--foreground)] font-medium">
            Phone Number
          </Label>
          <div className="relative flex items-center">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none z-10">
              <Phone className="h-4 w-4 text-[var(--secondary)]" />
              <span className="text-[var(--foreground)] text-base font-medium">{countryCode}</span>
            </div>
            <Input
              id="phone"
              type="tel"
              placeholder="9876543210"
              value={phoneNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                onPhoneChange(value);
              }}
              maxLength={10}
              className="w-full h-12 pl-24 border-gray-200 focus:border-[var(--primary)] focus:ring-[var(--primary)] text-base"
              required
            />
          </div>
          <p className="text-xs text-[var(--secondary)]">Enter your 10-digit phone number</p>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          type="submit"
          loading={loading}
          disabled={loading}
          className="w-full bg-primary text-white hover:opacity-90 transition-opacity text-lg font-semibold rounded-lg disabled:opacity-50"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-[var(--secondary)] text-sm">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={onToggleSignup}
            disabled={loading}
            className="text-[var(--primary)] hover:underline font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  )
}


