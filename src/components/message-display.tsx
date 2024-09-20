"use client"
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Tables } from '../../database.types'

export default function MessageDisplay({ channelId }: { channelId: string }) {
  const [messages, setMessages] = useState<Tables<'messages'>[]>([])
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('channel_id', channelId)
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Error fetching messages:', error)
      } else {
        setMessages(data)
      }
    }

    fetchMessages()

    const messageSubscription = supabase
      .channel('public:messages')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, fetchMessages)
      .subscribe()

    return () => {
      messageSubscription.unsubscribe()
    }
  }, [channelId])
//   useEffect(() => {
//     const fetchMessages = async () => {
//       const { data, error } = await supabase
//         .from('messages')
//         .select('*')
//         .eq('channel_id', channelId)
//         .order('created_at', { ascending: true })

//       if (error) {
//         console.error('Error fetching messages:', error)
//       } else {
//         setMessages(data)
//       }
//     }

//     fetchMessages()

//     // Optional: Subscribe to real-time updates
//     const subscription = supabase
//       .from(`messages:channel_id=eq.${channelId}`)
//       .on('INSERT', payload => {
//         setMessages(prevMessages => [...prevMessages, payload.new])
//       })
//       .subscribe()

//     return () => {
//       supabase.removeSubscription(subscription)
//     }
//   }, [channelId])

  return (

    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div key={message.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <p className="text-gray-800 dark:text-gray-200">{message.content}</p>
        </div>
      ))}
    </div>
    // <div>
    //   {messages.map((message) => (
    //     <div key={message.id} className="message">
    //       <p>{message.content}</p>
    //     </div>
    //   ))}
    // </div>
  )
}