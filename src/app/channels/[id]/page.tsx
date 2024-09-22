'use client'

// // import { useParams } from 'next/navigation'
// // import ChatWindow from '@/components/chat-window'

// // export default function ChannelPage() {
// //   const params = useParams()
// //   const channelId = params.id as string

// //   return (
// //     <div className="h-full">
// //       <ChatWindow channelId={channelId} />
// //     </div>
// //   )
// // }

// 'use client'
// import { useEffect, useState } from 'react'
// import { supabase } from '@/lib/supabase'
// import MessageList from '@/components/list-message'
// import MessageInput from '@/components/message-input'
// import MessageDisplay from '@/components/message-display'
 
// export default function ChannelPage({ params }: { params: { id: string } }) {
//   const [channel, setChannel] = useState(null)
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
//   useEffect(() => {
//     fetchChannel()
//   }, [params.id])
//   useEffect(() => {
//     fetchChannel()
//   }, [params.id, fetchChannel])

 

//   if (!channel) return <div>Loading...</div>

//   return (
//     <div className="flex flex-col h-screen text-black">
//       <div className="p-4 border-b">
//         <h1 className="text-2xl font-bold">#{channel?.name}</h1>
//         <p className="text-gray-500">{channel?.description}</p>
//       </div>
//       <MessageList channelId={params.id} />
//       <MessageDisplay channelId={params.id} />
//       <MessageInput channelId={params.id} />
//     </div>
//   )
// }

// import { useEffect, useState, useCallback } from 'react'
// import { supabase } from '@/lib/supabase'
// import MessageList from '@/components/list-message'
// import MessageInput from '@/components/message-input'
// import MessageDisplay from '@/components/message-display'
// import { Tables } from '../../../../database.types'
// import { Session, User } from '@supabase/supabase-js'

// export default function ChannelPage({ params }: { params: { id: string } }) {
//   const [channel, setChannel] = useState<Tables<'channels'> | null>(null)
//   const [session, setSession] = useState<Session | null>(null);

//   const fetchChannel = useCallback(async () => {
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
//   }, [params.id]) // Add params.id as a dependency

//   useEffect(() => {
//     fetchChannel()
//   }, [fetchChannel]) // Include fetchChannel in the dependency array

//   if (!channel) return <div>Loading...</div>

// // Usage
// supabase.auth.getSession().then(({ data, error }) => { // Destructure data and error
//   if (error) {
//     console.error('Error fetching session:', error);
//     setSession(null); // Set session to null on error
//     return;
//   }
//   if (data.session) {
//     console.log('Session:', data.session);
//     setSession(data.session); // Set session correctly
//   } else {
//     console.log('No active session found.');
//     setSession(null); // Set session to null if no active session
//   }
// });
  
//   return (
//     <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
//     <ChannelHeader channel={channel} />
//     <MessageList channelId={params.id}  />
//     <MessageDisplay channelId={params.id} />
//     <MessageInput channelId={params.id} user={session?.user as User} /> 
//   </div>
//     // <div className="flex flex-col h-screen text-black">
//     //   <div className="p-4 border-b">
//     //     <h1 className="text-2xl font-bold">#{channel?.name ? channel.name : 'Channel Name'}</h1>
//     //     <p className="text-gray-500">{channel?.description ? channel.description : 'Channel Description'}</p>
//     //   </div>
//     //   <MessageList channelId={params.id} />
//     //   <MessageDisplay channelId={params.id} />
//     //   <MessageInput channelId={params.id} />
//     // </div>
//   )
// }

// function ChannelHeader({ channel }: { channel: any }) {
//   return (
//     <div className="p-4 border-b dark:border-gray-700">
//       <h1 className="text-2xl font-bold dark:text-white">#{channel?.name || 'Channel Name'}</h1>
//       <p className="text-gray-500 dark:text-gray-400">{channel?.description || 'Channel Description'}</p>
//     </div>
//   )
// }


import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import MessageList from '@/components/list-message'
import MessageInput from '@/components/message-input'
import MessageDisplay from '@/components/message-display'
import { Tables } from '../../../../database.types'
import { Session, User } from '@supabase/supabase-js'

export default function ChannelPage({ params }: { params: { id: string } }) {
  const [channel, setChannel] = useState<Tables<'channels'> | null>(null)
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true); // Loading state

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
  }, [params.id])

  useEffect(() => {
    fetchChannel()
  }, [fetchChannel])

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
        setSession(null);
      } else {
        setSession(data.session);
      }
      setLoading(false); // Set loading to false after fetching
    };

    fetchSession();
  }, []);

  if (loading) return <div>Loading...</div>; // Show loading state

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <ChannelHeader channel={channel} />
      {/* <MessageList channelId={params.id} /> */}
      <MessageDisplay channelId={params.id} />
      <MessageInput channelId={params.id} user={session?.user as User} />
    </div>
  )
}

function ChannelHeader({ channel }: { channel: any }) {
  return (
    <div className="p-4 border-b dark:border-gray-700">
      <h1 className="text-2xl font-bold dark:text-white">#{channel?.name || 'Channel Name'}</h1>
      <p className="text-gray-500 dark:text-gray-400">{channel?.description || 'Channel Description'}</p>
    </div>
  )
}