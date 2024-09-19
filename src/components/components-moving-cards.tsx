'use client'

import React from 'react'
import { motion } from 'framer-motion'

const features = [
  { title: 'Real-time Messaging', image: '/images/ana.jpeg' },
  { title: 'File Sharing', image: '/images/he.jpeg' },
  { title: 'Channel Organization', image: '/images/the.webp' },
  { title: 'Video Calls', image: '/images/one.webp' },
  { title: 'App Integrations', image: '/images/two.jpeg' },
  { title: 'Search Functionality', image: '/images/ana.jpeg' },
]

export function MovingCardsComponent() {
  return (

    <div className="overflow-hidden py-12">
      <motion.div
        className="flex"
        animate={{
          x: [0, -2400],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 60,
            ease: "linear",
          },
        }}
      >
        {[...features, ...features].map((feature, index) => (
          <div key={index} className="flex-shrink-0 w-96 mx-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
              <img src={feature.image} alt={feature.title} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">Experience seamless collaboration with our powerful features.</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
    // <div className="overflow-hidden">
    //   <motion.div
    //     className="flex"
    //     animate={{
    //       x: [0, -1920],
    //     }}
    //     transition={{
    //       x: {
    //         repeat: Infinity,
    //         repeatType: "loop",
    //         duration: 50,
    //         ease: "linear",
    //       },
    //     }}
    //   >
    //     {[...features, ...features].map((feature, index) => (
    //       <div key={index} className="flex-shrink-0 w-64 mx-4">
    //         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
    //           <img src={feature.image} alt={feature.title} className="w-full h-40 object-cover" />
    //           <div className="p-4">
    //             <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </motion.div>
    // </div>
  )
}