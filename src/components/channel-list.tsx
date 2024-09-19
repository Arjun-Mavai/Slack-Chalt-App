import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

type Channel = {
  id: string
  name: string
}

export function ChannelList() {
  const [channels, setChannels] = useState<Channel[]>([])

  useEffect(() => {
    const fetchChannels = async () => {
      const { data, error } = await supabase
        .from('channels')
        .select('id, name')
        .order('name')
      if (error) console.error('Error fetching channels:', error)
      else setChannels(data || [])
    }

    fetchChannels()

    const channelSubscription = supabase
      .channel('public:channels')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'channels' }, fetchChannels)
      .subscribe()

    return () => {
      channelSubscription.unsubscribe()
    }
  }, [])

  return (
    <div className="p-4 bg-gray-800 text-white">
      <h2 className="mb-4 text-xl font-bold">Channels</h2>
      <ul>
        {channels.map((channel) => (
          <li key={channel.id} className="mb-2">
            <Link href={`/channels/${channel.id}`} className="hover:text-blue-400">
              # {channel.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}