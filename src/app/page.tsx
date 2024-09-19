'use client';
import ChatPreview from "@/components/chat-preview";
import { FooterComponent } from "@/components/components-footer";
import { HeroSectionComponent } from "@/components/components-hero-section";
import { MovingCardsComponent } from "@/components/components-moving-cards";
import { NavigationComponent } from "@/components/components-navigation";
import { motion } from 'framer-motion'
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationComponent />
      <HeroSectionComponent />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="container mx-auto px-4 py-12"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Our Slack Clone?</h2>
        <MovingCardsComponent />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="container mx-auto px-4 py-12 bg-white"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Experience Seamless Communication</h2>
        <ChatPreview />
      </motion.div>
      <FooterComponent />
    </div>
  );
}
