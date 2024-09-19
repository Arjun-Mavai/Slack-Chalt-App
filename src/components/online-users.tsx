import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type OnlineUser = {
  id: string
  username: string
}

export function OnlineUsers() {
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([])

  useEffect(() => {
    const fetchOnlineUsers = async () => {
      const { data, error } = await supabase
        .from('online_status')
        .select('user_id, profiles(username)')
        .gt('last_seen', new Date(Date.now() - 5 * 60 * 1000).toISOString())
      if (error) console.error('Error fetching online users:', error)
      else setOnlineUsers(data?.map(user => ({ id: user.user_id, username: user.profiles[0].username })) || [])
    }

    fetchOnlineUsers()
    const interval = setInterval(fetchOnlineUsers, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-4 bg-gray-200">
      <h2 className="mb-4 text-xl font-bold">Online Users</h2>
      <ul>
        {onlineUsers.map((user) => (
          <li key={user.id} className="mb-2">
            <span className="inline-block w-2 h-2 mr-2 bg-green-500 rounded-full"></span>
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  )
}