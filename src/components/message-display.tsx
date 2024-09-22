"use client"
import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Tables } from '../../database.types'
import Image from 'next/image'
import { ArrowDown } from 'lucide-react'

export default function MessageDisplay({ channelId }: { channelId: string }) {
  const [messages, setMessages] = useState<Tables<'messages'>[]>([])
  const [scrollToBottomVisible, setScrollToBottomVisible] = useState(false);



  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [messages])

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrollToBottomVisible(true);
      } else {
        setScrollToBottomVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
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


  console.log(messages,"messages")
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
const scrollToBottom = () => {
  scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
};












  return (

<div ref={scrollRef} className="flex-1 h-screen overflow-y-auto p-4 space-y-4 flex flex-col-reverse bg-gray-100 dark:bg-gray-900">
{scrollToBottomVisible && (
  <button
    className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-2 z-50"
    onClick={scrollToBottom}
  >
    <ArrowDown size={24} />
  </button>
)}
      {messages.slice().reverse().map((message) => (
        <div 
          key={message.id} 
          className={`flex ${message?.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div 
            className={`max-w-[70%] rounded-3xl p-3 ${
              message?.sender === 'user' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200'
            }`}
          >
            <p className="text-sm font-medium leading-snug tracking-wide">
              {message.content}
            </p>
            {message.image_url && (
              <div className="mt-2 rounded-lg overflow-hidden">
                <Image 
                  src={message.image_url} 
                  alt="Shared image" 
                  width={300} 
                  height={300} 
                  objectFit="cover"
                  className="w-full h-auto"
                />
              </div>
            )}
            <p className="text-xs mt-1 opacity-70">
              {formatTime(message.created_at)}
            </p>
          </div>
        </div>
      ))}


    </div>



    // <div className="flex-1 h-screen overflow-y-auto p-4 space-y-4">

    //   {messages.slice().reverse().map((message) => (
    //     <div key={message.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
    //       <p className="text-gray-800 dark:text-gray-200">{message.content}</p>
    //       {displayImage(message?.image_url ?? "")}
    //     </div>
    //   ))}
    // </div>



    // <div>
    //   {messages.map((message) => (
    //     <div key={message.id} className="message">
    //       <p>{message.content}</p>
    //     </div>
    //   ))}
    // </div>
  )
}

const displayImage = (imageUrl: string) => {
    if (imageUrl) {
      return <img src={imageUrl} alt="Message image" className="w-full my-2" />;
    }
    return null;
  };