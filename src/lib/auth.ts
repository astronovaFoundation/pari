import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { phoneNumber, mcp, emailOTP } from "better-auth/plugins";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  // Disable password-based login; we will use OTP phone (and can extend to email OTP later)
  emailAndPassword: {
    enabled: false,
  },
  session: {
    expiresIn: 60 * 60 * 24, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  user: {
    additionalFields: {
      phoneNumber: {
        type: "string",
        required: false,
        unique: true,
        input: true,
        returned: true, // Include in session
      },
      phoneNumberVerified: {
        type: "boolean",
        required: false,
        defaultValue: false,
        returned: true, // Include in session
      },
      role: {
        type: "string",
        required: false,
        defaultValue: "USER",
        returned: true, // Include in session
      },
    },
  },
  plugins: [
    phoneNumber({
      otpLength: 6,
      requireVerification: true,
      allowedAttempts: 5,
      sendOTP: async ({ phoneNumber, code }) => {
        // TODO: integrate SMS provider (Twilio/Nexmo). For now, log in dev only.
        if (process.env.NODE_ENV !== "production") {
          console.log("[OTP]", phoneNumber, code);
        }
      },
      signUpOnVerification: {
        getTempEmail: (phone) => `${phone.replace(/[^0-9]/g, "")}@temp.local`,
        getTempName: (phone) => phone,
      },
    }),
    emailOTP({
      async sendOTP({ email, code }) {
        try {
          const { sendMail } = await import("@/lib/mail")
          await sendMail({
            to: email,
            subject: "Your login code",
            html: `<p>Your verification code is <b>${code}</b>. It expires in 10 minutes.</p>`,
            text: `Your verification code is ${code}`,
          })
        } catch (e) {
          if (process.env.NODE_ENV !== "production") console.log("[EMAIL OTP]", email, code)
        }
      },
      signUpOnVerification: {
        getTempName: (email) => email.split("@")[0],
      },
    }),
    mcp({ loginPage: "/auth" }),
    nextCookies(),
  ],
  advanced: {
    generateId: () => {
      // Use cuid for consistency with Prisma
      return crypto.randomUUID();
    },
  },
});

export type Session = typeof auth.$Infer.Session.session;
export type User = typeof auth.$Infer.Session.user;

