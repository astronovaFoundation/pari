import { NextRequest, NextResponse } from "next/server"
import { client } from "@/sanity/lib/client"

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Check if email already exists in Sanity
    const existing = await client.fetch(
      `*[_type == "newsletter" && email == $email][0]`,
      { email: normalizedEmail }
    )

    if (existing) {
      return NextResponse.json({ error: "Email already subscribed" }, { status: 400 })
    }

    // Create newsletter subscription in Sanity
    await client.create({
      _type: 'newsletter',
      email: normalizedEmail,
      subscribedAt: new Date().toISOString(),
      isActive: true,
    })

    return NextResponse.json({ success: true, message: "Successfully subscribed to newsletter!" })
  } catch (error) {
    console.error("Newsletter error:", error)
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
  }
}

