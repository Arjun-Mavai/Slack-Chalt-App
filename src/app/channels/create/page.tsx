'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function CreateChannelPage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()
    
    const { data, error } = await supabase
      .from('channels')
      .insert({ name, description, created_by: user?.id })
      .select()

    if (error) {
      console.error('Error creating channel:', error)
    } else {
      router.push(`/channels/${data[0].id}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 text-black">
      <h1 className="text-2xl font-bold">Create New Channel</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Channel Name"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Channel Description"
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Create Channel
      </button>
    </form>
  )
}