import BannerSection from "@/components/sections/BannerSection"
import ServiceSection from "@/components/sections/ServiceSection"
import ChooseSection from "@/components/sections/ChooseSection"
import PackageSection from "@/components/sections/PackageSection"
import PricingSection from "@/components/sections/PricingSection"
import MessageSection from "@/components/sections/MessageSection"
import GallerySection from "@/components/sections/GallerySection"
import TestimonialSection from "@/components/sections/TestimonialSection"
import FAQSection from "@/components/sections/FAQSection"
import WorkSection from "@/components/sections/WorkSection"
import LocationSection from "@/components/sections/LocationSection"

export default function Home() {
  return (
    <main>
      <BannerSection />
      <ServiceSection />
      <ChooseSection />
      <PricingSection />
      <PackageSection />
      <MessageSection />
      <GallerySection />
      <TestimonialSection />
      <FAQSection />
      <WorkSection />
      <LocationSection />
    </main>
  )
}

