// import React from 'react'
// import { format } from 'date-fns'
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { ScrollArea } from "@/components/ui/scroll-area"

// interface Message {
//   id: string
//   content: string
//   user_id: string
//   created_at: string
//   user?: {
//     username: string
//     avatar_url: string
//   }
// }

// interface MessageListProps {
//   messages: Message[]
// }

// export default function MessageList({ messages }: MessageListProps) {
//   return (
//     <ScrollArea className="flex-1 p-4">
//       <div className="space-y-4">
//         {messages.map((message) => (
//           <div key={message.id} className="flex items-start space-x-4">
//             <Avatar>
//               <AvatarImage src={message.user?.avatar_url} alt={message.user?.username} />
//               <AvatarFallback>{message.user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
//             </Avatar>
//             <div className="flex-1 space-y-1">
//               <div className="flex items-center space-x-2">
//                 <span className="font-semibold">{message.user?.username || 'Unknown User'}</span>
//                 <span className="text-xs text-gray-500">
//                   {format(new Date(message.created_at), 'MMM d, yyyy h:mm a')}
//                 </span>
//               </div>
//               <p className="text-sm text-gray-700">{message.content}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </ScrollArea>
//   )
// }

// 'use client'
// import { useEffect, useState, useRef } from 'react'
// import { supabase } from '@/lib/supabase'

// type Message = {
//   id: string;
//   content: string;
//   created_at: string;
//   user: {
//     id: string;
//     name: string;
//     avatar_url: string;
//   };
// };

// export default function MessageList({ channelId }: { channelId: string }) {
//   const [messages, setMessages] = useState<Message[]>([])
//   const messagesEndRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     fetchMessages()

//     const messageSubscription = supabase
//       .channel(`public:messages:channel_id=eq.${channelId}`)
//       .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
//         setMessages((prev) => [...prev, payload.new as Message])
//       })
//       .subscribe()

//     return () => {
//       supabase.removeChannel(messageSubscription)
//     }
//   }, [channelId])

//   useEffect(() => {
//     scrollToBottom()
//   }, [messages])

//   const fetchMessages = async () => {
//     const { data, error } = await supabase
//       .from('messages')
//       .select(`
//         id,
//         content,
//         created_at,
//         user:users (
//           id,
//           name,
//           avatar_url
//         )
//       `)
//       .eq('channel_id', channelId)
//       .order('created_at', { ascending: true })

//     if (error) {
//       console.error('Error fetching messages:', error)
//     } else {
//       setMessages(data.map((item: any) => ({
//         ...item,
//         user: {
//           ...item.user,
//           id: item.user.id.toString(),
//           name: item.user.name.toString(),
//           avatar_url: item.user.avatar_url.toString(),
//         },
//       })))
//     }
//   }

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }

//   return (
//     <div className="flex-1 overflow-y-auto p-4 space-y-4">
//       {messages.map((message) => (
//         <div key={message.id} className="flex items-start space-x-3">
//           <img
//             src={message.user.avatar_url || 'https://via.placeholder.com/40'}
//             alt={message.user.name}
//             className="w-10 h-10 rounded-full"
//           />
//           <div>
//             <p className="font-semibold">{message.user.name}</p>
//             <p className="text-gray-700">{message.content}</p>
//             <p className="text-xs text-gray-500">
//               {new Date(message.created_at).toLocaleString()}
//             </p>
//           </div>
//         </div>
//       ))}
//       <div ref={messagesEndRef} />
//     </div>
//   )
// }


'use client'
import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'

type Message = {
  id: string;
  content: string;
  created_at: string;
  user: {
    id: string;
    name: string;
    avatar_url: string;
  };
};

export default function MessageList({ channelId }: { channelId: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchMessages()

    const messageSubscription = supabase
      .channel(`public:messages:channel_id=eq.${channelId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        setMessages((prev) => [...prev, payload.new as Message])
      })
      .subscribe()

    return () => {
      supabase.removeChannel(messageSubscription)
    }
  }, [channelId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        id,
        content,
        created_at,
        user:users (
          id,
          name,
          avatar_url
        )
      `)
      .eq('channel_id', channelId)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching messages:', error)
    } else {
      setMessages(data.map((item: any) => ({
        ...item,
        user: {
          ...item.user,
          id: item?.user?.id.toString(),
          name: item?.user?.name.toString(),
          avatar_url: item?.user?.avatar_url.toString(),
        },
      })))
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div key={message.id} className="flex items-start space-x-3">
          <img
            src={message?.user?.avatar_url || 'https://via.placeholder.com/40'}
            alt={message?.user?.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">{message?.user?.name}</p>
            <p className="text-gray-700">{message?.content}</p>
            <p className="text-xs text-gray-500">
              {new Date(message?.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}