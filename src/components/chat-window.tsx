// // import React, { useEffect, useState } from 'react'
// // import { supabase } from '@/lib/supabase'
// // import { MessageList } from './message-list'
// // import MessageInput from './message-input'
 
// // interface Message {
// //   id: string
// //   content: string
// //   user_id: string
// //   created_at: string
// // }

// // export default function ChatWindow({ channelId }: { channelId: string }) {
// //   const [messages, setMessages] = useState<Message[]>([])

// //   useEffect(() => {
// //     fetchMessages()
// //     const subscription = supabase
// //       .channel(`public:messages:channel_id=eq.${channelId}`)
// //       .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, handleNewMessage)
// //       .subscribe()

// //     return () => {
// //       subscription.unsubscribe()
// //     }
// //   }, [channelId])

// //   const fetchMessages = async () => {
// //     const { data, error } = await supabase
// //       .from('messages')
// //       .select('*')
// //       .eq('channel_id', channelId)
// //       .order('created_at', { ascending: false })
// //       .limit(50)
// //     if (error) console.error('Error fetching messages:', error)
// //     else setMessages(data || [])
// //   }

// //   const handleNewMessage = (payload: any) => {
// //     setMessages((prevMessages) => [payload.new, ...prevMessages])
// //   }

// //   const sendMessage = async (content: string) => {
// //     const { data, error } = await supabase
// //       .from('messages')
// //       .insert({ content, channel_id: channelId, user_id: supabase.auth.user().id })
// //     if (error) console.error('Error sending message:', error)
// //   }

// //   return (
// //     <div className="flex flex-col h-full">
// //       <MessageList messages={messages} />
// //       <MessageInput onSendMessage={sendMessage} />
// //     </div>
// //   )
// // }

// 'use client'
// import { useEffect, useState } from 'react'
// import { supabase } from '@/lib/supabase'
// import MessageList from './list-message'
// import MessageInput from './message-input'
  
// export default function ChannelPage({ params }: { params: { id: string } }) {
//   const [channel, setChannel] = useState(null)

//   useEffect(() => {
//     fetchChannel()
//   }, [params.id])

//   const fetchChannel = async () => {
//     const { data, error } = await supabase
//       .from('channels')
//       .select('*')
//       .eq('id', params.id)
//       .single()
    
//     if (error) {
//       console.error('Error fetching channel:', error)
//     } else {
//       setChannel(data)
//     }
//   }

//   if (!channel) return <div>Loading...</div>

//   return (
//     <div className="flex flex-col h-screen">
//       <div className="p-4 border-b">
//         <h1 className="text-2xl font-bold">#{channel.name}</h1>
//         <p className="text-gray-500">{channel.description}</p>
//       </div>
//       <MessageList channelId={params.id} />
//       <MessageInput channelId={params.id} />
//     </div>
//   )
// }

'use client'
import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import MessageList from './list-message'
import MessageInput from './message-input'
import { Tables } from '../../database.types'
  
export default function ChannelPage({ params }: { params: { id: string } }) {
  const [channel, setChannel] = useState<Tables<'channels'>| null>(null)

  const fetchChannel = useCallback(async () => {
    const { data, error } = await supabase
      .from('channels')
      .select('*')
      .eq('id', params.id)
      .single()
    
    if (error) {
      console.error('Error fetching channel:', error)
    } else {
      setChannel(data)
    }
  }, [params.id]) // Add params.id as a dependency

  useEffect(() => {
    fetchChannel()
  }, [fetchChannel]) // Include fetchChannel in the dependency array

  if (!channel) return <div>Loading...</div>

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold">#{channel.name}</h1>
        <p className="text-gray-500">{channel.description}</p>
      </div>
      <MessageList channelId={params.id} />
      <MessageInput channelId={params.id} />
    </div>
  )
}