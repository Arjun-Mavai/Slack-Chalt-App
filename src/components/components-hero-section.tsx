'use client'

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

function SlackCube() {
  const mesh = useRef<THREE.Mesh>(null!)
  useFrame((state, delta) => {
    mesh.current.rotation.x += delta * 0.2
    mesh.current.rotation.y += delta * 0.3
  })

  const texts = [
    { text: 'Slack', position: [0, 0, 1.51], rotation: [0, 0, 0] },
    { text: 'Arjun', position: [0, 0, -1.51], rotation: [0, Math.PI, 0] },
    { text: 'Singh', position: [1.51, 0, 0], rotation: [0, Math.PI / 2, 0] },
    { text: 'Shree', position: [-1.51, 0, 0], rotation: [0, -Math.PI / 2, 0] },
    { text: 'Ram', position: [0, 1.51, 0], rotation: [-Math.PI / 2, 0, 0] },
    { text: 'Radha', position: [0, -1.51, 0], rotation: [Math.PI / 2, 0, 0] },
  ]

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[3, 3, 3]} />
      <meshPhongMaterial color="#4A154B" /> {/* Slack's primary color */}
      {texts.map((item, index) => (
        <Text
        key={index}
        position={item.position.length === 3 ? item.position : [0, 0, 0]} // Default to [0, 0, 0] if not valid
        rotation={item.rotation}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
          {item.text}
        </Text>
      ))}
    </mesh>
  )
}

export function HeroSectionComponent() {
  return (
    <div className="h-[60vh] bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <SlackCube />
      </Canvas>
    </div>
  )
}