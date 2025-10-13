"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, RotateCcw } from "lucide-react"

export function OTPVerificationForm({
  identifier,
  via,
  otp,
  loading,
  error,
  countdown,
  onChangeDigit,
  onDigitKeyDown,
  onPaste,
  onResend,
  onVerify,
  onBack,
}: {
  identifier: string
  via: "phone" | "email"
  otp: string[]
  loading: boolean
  error: string | null
  countdown: number
  onChangeDigit: (index: number, value: string) => void
  onDigitKeyDown: (index: number, e: React.KeyboardEvent) => void
  onPaste: (e: React.ClipboardEvent) => void
  onResend: () => void
  onVerify: () => void
  onBack: () => void
}) {
  return (
    <div className="border-0 shadow-lg bg-white rounded-2xl p-6">
      <div className="text-center pb-6 relative">
        <button
          onClick={onBack}
          className="absolute left-0 p-2 text-[var(--secondary)] hover:text-[var(--foreground)] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">Verify Your {via === "phone" ? "Number" : "Email"}</h2>
        <p className="text-[var(--secondary)]">
          We&apos;ve sent a 6-digit code via {via === "phone" ? "SMS" : "Email"} to
          <br />
          <span className="font-medium text-[var(--foreground)]">{identifier}</span>
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label className="text-[var(--foreground)] font-medium text-center block">Enter Verification Code</Label>
          <div className="flex justify-center gap-2 sm:gap-3 px-2 sm:px-0">
            {otp.map((digit, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => onChangeDigit(index, e.target.value)}
                onKeyDown={(e) => onDigitKeyDown(index, e)}
                onPaste={onPaste}
                className="w-11 h-12 sm:w-14 sm:h-14 text-center text-lg sm:text-xl font-bold border-2 border-gray-200 focus:border-[var(--primary)] focus:ring-[var(--primary)] rounded-lg transition-all"
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          {countdown > 0 ? (
            <p className="text-[var(--secondary)] text-sm">Resend code in {countdown}s</p>
          ) : (
            <button
              onClick={onResend}
              disabled={loading}
              className="text-[var(--primary)] hover:underline font-medium text-sm flex items-center justify-center space-x-1 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[var(--primary)]"></div>
                  <span>Resending...</span>
                </>
              ) : (
                <>
                  <RotateCcw className="w-4 h-4" />
                  <span>Resend Code</span>
                </>
              )}
            </button>
          )}
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <Button
          onClick={onVerify}
          loading={loading}
          disabled={otp.join("").length !== 6 || loading}
          className="w-full h-12 bg-primary text-white hover:opacity-90 transition-opacity text-lg font-semibold rounded-lg disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify & Continue"}
        </Button>
      </div>
    </div>
  )
}


