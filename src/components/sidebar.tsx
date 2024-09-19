// "use client"
// import React from 'react'
//  import { useRouter } from 'next/navigation'
// import { Button } from "@/components/ui/button"
 
// import { supabase } from '@/lib/supabase'
// import { ChannelList } from './channel-list'
// import { OnlineUsers } from './online-users'

// export default function Sidebar() {
//   const router = useRouter()

//   const handleLogout = async () => {
//     await supabase.auth.signOut()
//     router.push('/login')
//   }

//   return (
//     <div className="w-64 bg-gray-800 text-white p-4 flex flex-col h-screen">
//       <h1 className="text-2xl font-bold mb-4">Slack Clone</h1>
//       <nav className="flex-1">
//         <ChannelList />
//         <OnlineUsers />
//       </nav>
//       <div className="mt-auto">
//         <Button onClick={handleLogout} variant="outline" className="w-full">
//           Logout
//         </Button>
//       </div>
//     </div>
//   )
// }

'use client'
// import { useEffect, useState } from 'react'
// import { supabase } from '@/lib/supabase'
// import Link from 'next/link'

// export default function Sidebar() {
//   const [channels, setChannels] = useState([])

//   useEffect(() => {
//     fetchChannels()

//     const channelSubscription = supabase
//       .channel('public:channels')
//       .on('INSERT', (payload) => {
//         setChannels((prev) => [...prev, payload.new])
//       })
//       .subscribe()

//     return () => {
//       supabase.removeChannel(channelSubscription)
//     }
//   }, [])

//   const fetchChannels = async () => {
//     const { data, error } = await supabase
//       .from('channels')
//       .select('*')
//       .order('name', { ascending: true })
    
//     if (error) {
//       console.error('Error fetching channels:', error)
//     } else {
//       setChannels(data)
//     }
//   }

//   return (
//     <div className="w-64 bg-gray-100 p-4">
//       <h2 className="text-xl font-bold mb-4">Channels</h2>
//       <ul className="space-y-2">
//         {channels.map((channel) => (
//           <li key={channel.id}>
//             <Link href={`/channels/${channel.id}`} className="hover:text-blue-500">
//               # {channel.name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//       <Link href="/channels/create" className="mt-4 inline-block text-blue-500 hover:underline">
//         + Create Channel
//       </Link>
//     </div>
//   )
// }

 

// import { useState, useEffect } from 'react'
// import { supabase } from '@/lib/supabase'
// import Link from 'next/link'
// import { Home, MessageSquare, PlusCircle, Menu } from 'lucide-react'
 
// export default function Sidebar() {
//   const [channels, setChannels] = useState<any[]>([])
//   const [isOpen, setIsOpen] = useState(false)

//   useEffect(() => {
//     fetchChannels()

//     const channel = supabase
//       .channel('public:channels')
//       .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'channels' }, (payload) => {
//         setChannels((prev:any) => [...prev, payload.new]) // Add new channel to the state
//       })
//       .subscribe()

//     return () => {
//       supabase.removeChannel(channel) // Updated to use the channel variable
//     }
//   }, [])

// const fetchChannels = async () => {
//     const { data, error } = await supabase
//       .from('channels')
//       .select('*')
//       .order('name', { ascending: true })

//     if (error) {
//       console.error('Error fetching channels:', error)
//     } else {
//       setChannels(data)
//     }
//   }

  
//   // const fetchChannels = async () => {
//   //   const { data, error } = await supabase
//   //     .from('channels')
//   //     .select('*')
//   //     .order('name', { ascending: true })
    
//   //   if (error) {
//   //     console.error('Error fetching channels:', error)
//   //   } else {
//   //     setChannels(data)
//   //   }
//   // }

//   return (
//     <>
//       <button
//         className="md:hidden fixed top-4 left-4 z-20 p-2 bg-gray-800 text-white rounded-md"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <Menu size={24} />
//       </button>
//       <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out md:w-64 bg-gray-800 text-white p-4 z-10`}>
//         <div className="flex flex-col h-full">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-bold">Slack Clone</h2>
//             <button className="md:hidden" onClick={() => setIsOpen(false)}>
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//           <nav className="space-y-4">
//             <Link href="/" className="flex items-center space-x-2 text-gray-300 hover:text-white">
//               <Home size={20} />
//               <span className="hidden md:inline">Home</span>
//             </Link>
//             <div>
//               <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Channels</h3>
//               <ul className="space-y-2">
//                 {channels.map((channel:any) => (
//                   <li key={channel.id}>
//                     <Link href={`/channels/${channel.id}`} className="flex items-center space-x-2 text-gray-300 hover:text-white">
//                       <MessageSquare size={20} />
//                       <span className="hidden md:inline">{channel.name}</span>
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </nav>
//           <div className="mt-auto">
//             <Link href="/channels/create" className="flex items-center space-x-2 text-gray-300 hover:text-white">
//               <PlusCircle size={20} />
//               <span className="hidden md:inline">Create Channel</span>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { Home, MessageSquare, PlusCircle, Menu, X, LogIn, UserPlus } from 'lucide-react'

export default function Sidebar() {
  const [channels, setChannels] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchChannels()

    const channel = supabase
      .channel('public:channels')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'channels' }, (payload) => {
        setChannels((prev:any) => [...prev, payload.new])
      })
      .subscribe()

    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      supabase.removeChannel(channel)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const fetchChannels = async () => {
    const { data, error } = await supabase
      .from('channels')
      .select('*')
      .order('name', { ascending: true })
    
    if (error) {
      console.error('Error fetching channels:', error)
    } else {
      setChannels(data)
    }
  }

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-20 p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>
      <div 
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition duration-200 ease-in-out md:w-64 bg-gray-900 text-white p-6 z-30 overflow-y-auto`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-indigo-400">Slack Clone</h2>
            <button className="md:hidden text-gray-400 hover:text-white transition-colors duration-200" onClick={() => setIsOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <nav className="space-y-6">
            <Link href="/" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200">
              <Home size={20} />
              <span className="text-sm font-medium">Home</span>
            </Link>
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Channels</h3>
              <ul className="space-y-2">
                {channels.map((channel:any) => (
                  <li key={channel.id}>
                    <Link href={`/channels/${channel.id}`} className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200">
                      <MessageSquare size={18} />
                      <span className="text-sm">{channel.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <div className="mt-auto space-y-4">
            <Link href="/channels/create" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200">
              <PlusCircle size={20} />
              <span className="text-sm font-medium">Create Channel</span>
            </Link>
            <div className="pt-4 border-t border-gray-700 space-y-2">
              <Link href="/login" className="flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors duration-200">
                <LogIn size={18} />
                <span className="text-sm font-medium">Log In</span>
              </Link>
              <Link href="/signup" className="flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors duration-200">
                <UserPlus size={18} />
                <span className="text-sm font-medium">Sign Up</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  )
}