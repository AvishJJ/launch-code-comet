
import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A23]">
      <Hero />
      <HowItWorks />
      <Footer />
    </div>
  );
}
