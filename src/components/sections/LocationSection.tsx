import Image from "next/image"

export default function LocationSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 mb-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start">
          {/* Left Column - Business Information */}
          <div className="space-y-8 md:space-y-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-light text-secondary mb-6 md:mb-8">Opening Hours</h2>
              <div className="space-y-1 md:space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-secondary text-lg font-light">Monday</span>
                  <span className="text-secondary text-sm font-normal">9:30am - 6:30pm</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-secondary text-lg font-light">Tuesday</span>
                  <span className="text-secondary text-sm font-normal">9:30am - 6:30pm</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-secondary text-lg font-light">Wednesday</span>
                  <span className="text-secondary text-sm font-normal">9:30am - 6:30pm</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-secondary text-lg font-light">Thursday</span>
                  <span className="text-secondary text-sm font-normal">9:30am - 6:30pm</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-secondary text-lg font-light">Friday</span>
                  <span className="text-secondary text-sm font-normal">9:30am - 6:30pm</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-secondary text-lg font-light">Saturday</span>
                  <span className="text-secondary text-sm font-normal">9:30am - 6:30pm</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-secondary text-lg font-light">Sunday</span>
                  <span className="text-secondary text-sm font-normal">11:00am - 5:30pm</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-light text-foreground mb-6 md:mb-8">Find Our Location</h2>
              <p className="text-gray-600 font-secondary text-base md:text-lg mb-4 md:mb-6">4025 International Blvd, Oakland, CA 94601</p>
              <div className="w-full h-48 md:h-64 rounded-lg overflow-hidden shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.123456789!2d-122.2419!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDE0JzMwLjgiVw!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Eyebrow Threading Palace Location"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            {/* Main Storefront Image */}
            <div>
              <Image
                src="/saloon.webp"
                alt="Eyebrow Threading Palace storefront"
                width={800}
                height={500}
                className="w-full h-auto md:h-[400px] lg:h-[710px] object-cover rounded-lg"
              />
            </div>

            {/* Interior Images Grid */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <Image
                src="/saloon-room.webp"
                alt="Salon interior with threading chairs"
                className="w-full h-32 md:h-48 object-cover rounded-lg shadow-sm"
                width={400}
                height={300}
              />
              <Image
                src="/saloon-bed.webp"
                alt="Professional threading treatment bed"
                className="w-full h-32 md:h-48 object-cover rounded-lg shadow-sm"
                width={400}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

