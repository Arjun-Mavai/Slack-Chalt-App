// import React, { useEffect, useState } from 'react'
// import { supabase } from '@/lib/supabase'
// import { motion } from 'framer-motion'

// type Message = {
//   id: string
//   content: string
//   created_at: string
//   profiles: {
//     username: string
//   }
// }

// type MessageListProps = {
//   channelId: string
// }

// export function MessageList({ channelId }: MessageListProps) {
//   const [messages, setMessages] = useState<Message[]>([])

//   useEffect(() => {
//     const fetchMessages = async () => {
//       const { data, error } = await supabase
//         .from('messages')
//         .select(`
//           id,
//           content,
//           created_at,
//           profiles (username)
//         `)
//         .eq('channel_id', channelId)
//         .order('created_at')
//       if (error) console.error('Error fetching messages:', error)
//       else {
//         const formattedData = data.map((message: any) => ({
//           ...message,
//           profiles: { username: message.profiles[0].username }
//         }));
//         setMessages(formattedData || [])
//       }
//     }

//     fetchMessages()

//     const messageSubscription = supabase
//       .channel(`public:messages:channel_id=eq.${channelId}`)
//       .on('postgres_changes', { event: '*', schema: 'public', table: 'messages', filter: `channel_id=eq.${channelId}` }, fetchMessages)
//       .subscribe()

//     return () => {
//       messageSubscription.unsubscribe()
//     }
//   }, [channelId])

//   return (
//     <div className="flex-1 overflow-y-auto p-4">
//       {messages.map((message) => (
//         <motion.div
//           key={message.id}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//           className="mb-4"
//         >
//           <p className="font-bold">{message.profiles.username}</p>
//           <p>{message.content}</p>
//           <p className="text-xs text-gray-500">{new Date(message.created_at).toLocaleString()}</p>
//         </motion.div>
//       ))}
//     </div>
//   )
// }

import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Message {
  id: string
  content: string
  created_at: string
  user: {
    id: string
    username: string
  }
}

interface ChannelMessagesProps {
  channelId: string
}

export function ChannelMessages({ channelId }: ChannelMessagesProps) {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          id,
          content,
          created_at,
          user:users(id, username)
        `)
        .eq('channel_id', channelId)
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) {
        console.error('Error fetching messages:', error)
      } else {
        setMessages(data || [])
      }
    }

    fetchMessages()

    // Set up real-time listener
    const subscription = supabase
      .channel(`public:messages:channel_id=eq.${channelId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        setMessages((prevMessages) => [payload.new as Message, ...prevMessages])
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [channelId])

  return (
    <div className="space-y-4 p-4">
      {messages.map((message) => (
        <div key={message.id} className="bg-white p-3 rounded-lg shadow">
          <p className="font-semibold">{message.user.username}</p>
          <p>{message.content}</p>
          <p className="text-xs text-gray-500">{new Date(message.created_at).toLocaleString()}</p>
        </div>
      ))}
    </div>
  )
}