import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function MessageDisplay({ channelId }: { channelId: string }) {
  const [messages, setMessages] = useState([])
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
    <div>
      {messages.map((message) => (
        <div key={message.id} className="message">
          <p>{message.content}</p>
        </div>
      ))}
    </div>
  )
}