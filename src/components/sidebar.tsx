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
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function Sidebar() {
  const [channels, setChannels] = useState([])

  useEffect(() => {
    fetchChannels()

    const channelSubscription = supabase
      .channel('public:channels')
      .on('INSERT', (payload) => {
        setChannels((prev) => [...prev, payload.new])
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channelSubscription)
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
    <div className="w-64 bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">Channels</h2>
      <ul className="space-y-2">
        {channels.map((channel) => (
          <li key={channel.id}>
            <Link href={`/channels/${channel.id}`} className="hover:text-blue-500">
              # {channel.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/channels/create" className="mt-4 inline-block text-blue-500 hover:underline">
        + Create Channel
      </Link>
    </div>
  )
}