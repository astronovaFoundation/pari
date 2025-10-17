'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";


export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {


  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <h1 className="text-9xl font-bold text-primary mb-4">500</h1>
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
              Something went wrong!
            </h2>
            <p className="mt-4 text-lg text-secondary">
              We're sorry, but something went wrong on our end. Please try again later.
            </p>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              onClick={reset}
              className="bg-primary px-6 py-3 text-base font-medium text-white !rounded-full"
            >
              Try again
            </Button>
            
            <Button className="px-6 py-3 text-base font-medium !rounded-full border border-primary text-primary hover:bg-primary/10">
              <Link href="/">
                Go back home
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}