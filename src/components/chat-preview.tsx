'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MessageSquare, User, Clock } from 'lucide-react'

type ChannelPreview = {
  id: string
  name: string
  lastMessage: {
    content: string
    user: {
      name: string
    }
    created_at: string
  } | null
}

export default function ChatPreview() {
  const [channelPreviews, setChannelPreviews] = useState<ChannelPreview[]>([])

  useEffect(() => {
    const fetchAndSubscribe = async () => {
      await fetchChannelPreviews()

      const channelSubscription = supabase
        .channel('public:messages')
        .on('INSERT', () => {
          fetchChannelPreviews() // Refresh previews when a new message is inserted
        })
        .subscribe()

      return () => {
        supabase.removeChannel(channelSubscription)
      }
    }

    fetchAndSubscribe()

    return () => {
      // Cleanup function to remove the subscription when the component unmounts
    }
  }, [])

  const fetchChannelPreviews = async () => {
    const { data: channels, error: channelsError } = await supabase
      .from('channels')
      .select('id, name')
      .order('name', { ascending: true })

    if (channelsError) {
      console.error('Error fetching channels:', channelsError)
      return
    }

    const previews = await Promise.all(
      channels.map(async (channel) => {
        const { data: messages, error: messagesError } = await supabase
          .from('messages')
          .select('content, created_at, user:users(name)')
          .eq('channel_id', channel.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        if (messagesError && messagesError.code !== 'PGRST116') {
          console.error(`Error fetching messages for channel ${channel.id}:`, messagesError)
        }

        return {
          id: channel.id,
          name: channel.name,
          lastMessage: messages || null
        }
      })
    )

    setChannelPreviews(previews)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric',
      hour12: true 
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Recent Chats</h2>
      <div className="space-y-4">
        {channelPreviews.map((channel, index) => (
          <motion.div
            key={channel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link href={`/channels/${channel.id}`} className="block">
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-xl text-gray-800 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-blue-500" />
                    #{channel.name}
                  </h3>
                  {channel.lastMessage && (
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatDate(channel.lastMessage.created_at)}
                    </span>
                  )}
                </div>
                {channel.lastMessage ? (
                  <div className="text-sm text-gray-600">
                    <p className="flex items-center mb-1">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="font-semibold text-gray-700">{channel.lastMessage.user.name}</span>
                    </p>
                    <p className="pl-6">
                      {channel.lastMessage.content.length > 100
                        ? `${channel.lastMessage.content.substring(0, 100)}...`
                        : channel.lastMessage.content}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">No messages yet</p>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}