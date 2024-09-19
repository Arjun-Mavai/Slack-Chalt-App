import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { supabase } from '@/lib/supabase'

type ChatInputProps = {
  channelId: string
}

export function ChatInput({ channelId }: ChatInputProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase
      .from('messages')
      .insert({ content: message, channel_id: channelId, user_id: user.id })

    if (error) console.error('Error sending message:', error)
    else setMessage('')
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100">
      <div className="flex space-x-2">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button type="submit">Send</Button>
      </div>
    </form>
  )
}