import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
              Page Not Found
            </h2>
            <p className="mt-4 text-lg text-secondary">
              Sorry, we couldn&#39;t find the page you&#39;re looking for.
            </p>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button className="btn-gradient px-6 py-3 text-base font-medium text-white !rounded-full">
              <Link href="/">
                Go back home
              </Link>
            </Button>
            
            <Button className="px-6 py-3 text-base font-medium !rounded-full border border-primary text-primary hover:bg-primary/10">
              <Link href="/#Services">
                View our services
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}