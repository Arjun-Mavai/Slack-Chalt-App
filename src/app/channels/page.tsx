'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function ChannelsPage() {
  const [channels, setChannels] = useState([])

  useEffect(() => {
    fetchChannels()
  }, [])

  const fetchChannels = async () => {
    const { data, error } = await supabase
      .from('channels')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching channels:', error)
    } else {
      setChannels(data)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Channels</h1>
      <ul className="space-y-2">
        {channels.map((channel) => (
          <li key={channel.id}>
            <Link href={`/channels/${channel.id}`} className="text-blue-500 hover:underline">
              # {channel.name}
            </Link>
            <p className="text-sm text-gray-500">{channel.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}