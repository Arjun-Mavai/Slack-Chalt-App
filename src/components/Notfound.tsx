'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

function Ball() {
  const meshRef = useRef()
  useFrame((state) => {
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 2
  })
  return (
    <Sphere ref={meshRef} args={[1, 32, 32]}>
      <meshStandardMaterial color="red" />
    </Sphere>
  )
}

export default function NotFound() {
  const [count, setCount] = useState(404)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 404))
    }, 20)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-64 h-64 mb-8">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Ball />
        </Canvas>
      </div>
      <motion.h1
        className="text-8xl font-bold text-gray-800 mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {count}
      </motion.h1>
      <p className="text-2xl text-gray-600 mb-8">Oops! Page not found</p>
      <Button asChild size="lg">
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  )
}