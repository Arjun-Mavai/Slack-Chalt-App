'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  const letters = "ERROR".split('')

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-100">
      <div className="flex mb-8">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="text-6xl font-bold text-red-500"
            animate={{
              y: [0, -20, 0],
              rotate: [0, -10, 10, 0],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: index * 0.1,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      <p className="text-xl text-gray-700 mb-8">{error.message || "Something went wrong!"}</p>
      <Button onClick={reset} size="lg">Try Again</Button>
    </div>
  )
}