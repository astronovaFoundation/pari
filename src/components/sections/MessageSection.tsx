
import Image from "next/image"

export default function MessageSection() {


  return (
    <section id="Message" className="flex flex-col md:flex-row gap-0 px-0 md:px-8 lg:px-36 py-8 md:py-16 z-10">
      {/* Left side - Purple gradient background with image */}
      <div className="bg-primary w-full md:w-[350px] lg:w-[426px] h-[440px] md:h-[560px] lg:h-[640px] relative flex items-center md:items-end justify-center">
        <div className="w-full h-full relative">
          <Image
            src="/message.webp"
            alt="Message from artist"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain object-center md:object-left-bottom md:-translate-x-[6%] lg:-translate-x-[30%] md:scale-110 lg:scale-125 origin-bottom z-10"
          />
        </div>
      </div>
  
      {/* Right side - Content */}
      <div className="flex-1 bg-white flex flex-col justify-center items-center px-6 sm:px-8 md:px-8 lg:px-12 xl:px-16 py-12 md:py-8 lg:py-0">
        <div className="max-w-full md:max-w-xl lg:max-w-2xl w-full text-center space-y-4 sm:space-y-6 md:space-y-8">
          {/* Spa Center heading */}
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-secondary text-lg sm:text-xl md:text-2xl font-arizonia">Spa Center</h1>
            <h2 className="text-foreground text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-tight px-2 sm:px-0">
              Message from Pari Eyebrow Threading Palace !
            </h2>
          </div>

          {/* Main content */}
          <div className="space-y-3 sm:space-y-4">
            <p className="text-black font-extralight text-xs sm:text-sm md:text-base lg:text-lg text-justify leading-relaxed px-2 sm:px-0">
              Pari Eyebrow, Lashes & Threading Palace is where timeless elegance meets expert artistry. 
              We specialize in precision threading, luxurious lash extensions, and brow perfection — all 
              designed to elevate your natural beauty. Step into our serene space and experience refined service,
              premium products, and results that radiate confidence. Pari Eyebrow, Lashes & Threading Palace is where 
              timeless elegance meets expert artistry. We specialize in precision threading, luxurious lash 
              extensions, and brow perfection — all designed to elevate your natural beauty. Step into our serene 
              space and experience refined service, premium products, and results that radiate confidence.
            </p>
            
            <div className="text-foreground text-base sm:text-lg md:text-xl lg:text-2xl font-medium font-poppins px-2 sm:px-0">
              Want to Make a Booking or Have a Question?
            </div>

            <p className="text-secondary text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed px-2 sm:px-0">
              Call me <span className="font-bold text-foreground">(510) 479-1045</span> or fill out our online booking
              <br className="hidden sm:inline" />
              <span className="sm:hidden"> </span>
              &amp; enquiry form and we&apos;ll contact you
            </p>
          </div>

     
        </div>
      </div>
    </section>
  )
}