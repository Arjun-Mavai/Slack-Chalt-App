'use client';
import ChatPreview from "@/components/chat-preview";
import { FooterComponent } from "@/components/components-footer";
import { HeroSectionComponent } from "@/components/components-hero-section";
import { MovingCardsComponent } from "@/components/components-moving-cards";
import { NavigationComponent } from "@/components/components-navigation";
import ScrollProgressBar from "@/components/scroll-progress-bar";
import { motion } from 'framer-motion'
import { useEffect, useState } from "react";
export default function Home() {
  const [contentHeight, setContentHeight] = useState('auto');

  useEffect(() => {
    const updateHeight = () => {
      const windowHeight = window.innerHeight;
      const contentHeight = document.getElementById('content')?.scrollHeight || 0;
      if (contentHeight > windowHeight) {
        setContentHeight('auto');
      } else {
        setContentHeight('100vh');
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div className="relative bg-gray-100" style={{ minHeight: contentHeight }}>
       <NavigationComponent />
      <div id="content">
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
      </div>
      <FooterComponent />
    </div>
  );
}
