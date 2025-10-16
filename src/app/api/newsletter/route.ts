import { NextRequest, NextResponse } from "next/server"
import { createClient } from "next-sanity"
import { projectId, dataset } from "@/sanity/env"

/**
 * Newsletter subscription API route
 * 
 * This route securely stores newsletter subscriptions in Sanity CMS.
 * It uses a server-side write token to ensure security and prevent exposing
 * admin credentials to the frontend.
 * 
 * Required environment variable:
 * SANITY_API_TOKEN - A write token with permissions to create newsletter documents
 */
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Check if write token is available
    if (!process.env.SANITY_API_TOKEN) {
      console.error('SANITY_API_TOKEN environment variable is not set');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Create a client with write token for server-side operations
    const writeClient = createClient({
      projectId,
      dataset,
      token: process.env.SANITY_API_TOKEN, // Server-side write token
      apiVersion: '2025-10-13',
      useCdn: false,
    });

    // Check if email already exists in Sanity
    const existing = await writeClient.fetch(
      `*[_type == "newsletter" && email == $email][0]`,
      { email: normalizedEmail }
    )

    if (existing) {
      return NextResponse.json({ error: "Email already subscribed" }, { status: 400 })
    }

    // Create newsletter subscription in Sanity
    await writeClient.create({
      _type: 'newsletter',
      email: normalizedEmail,
      subscribedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, message: "Successfully subscribed to newsletter!" })
  } catch (error) {
    console.error("Newsletter error:", error)
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
  }
}

