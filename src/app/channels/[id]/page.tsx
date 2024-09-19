// 'use client'

// import { useParams } from 'next/navigation'
// import ChatWindow from '@/components/chat-window'

// export default function ChannelPage() {
//   const params = useParams()
//   const channelId = params.id as string

//   return (
//     <div className="h-full">
//       <ChatWindow channelId={channelId} />
//     </div>
//   )
// }

'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import MessageList from '@/components/list-message'
import MessageInput from '@/components/message-input'
import MessageDisplay from '@/components/message-display'
 
export default function ChannelPage({ params }: { params: { id: string } }) {
  const [channel, setChannel] = useState(null)

  useEffect(() => {
    fetchChannel()
  }, [params.id])

  const fetchChannel = async () => {
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
  }

  if (!channel) return <div>Loading...</div>

  return (
    <div className="flex flex-col h-screen text-black">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold">#{channel?.name}</h1>
        <p className="text-gray-500">{channel?.description}</p>
      </div>
      <MessageList channelId={params.id} />
      <MessageDisplay channelId={params.id} />
      <MessageInput channelId={params.id} />
    </div>
  )
}