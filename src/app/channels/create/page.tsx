'use client'
// import { useState } from 'react'
// import { supabase } from '@/lib/supabase'
// import { useRouter } from 'next/navigation'

// export default function CreateChannelPage() {
//   const [name, setName] = useState('')
//   const [description, setDescription] = useState('')
//   const router = useRouter()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     const { data: { user } } = await supabase.auth.getUser()
    
//     const { data, error } = await supabase
//       .from('channels')
//       .insert({ name, description, created_by: user?.id })
//       .select()

//     if (error) {
//       console.error('Error creating channel:', error)
//     } else {
//       router.push(`/channels/${data[0].id}`)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="p-4 space-y-4 text-black">
//       <h1 className="text-2xl font-bold">Create New Channel</h1>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Channel Name"
//         className="w-full p-2 border rounded"
//         required
//       />
//       <textarea
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         placeholder="Channel Description"
//         className="w-full p-2 border rounded"
//       />
//       <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
//         Create Channel
//       </button>
//     </form>
//   )
// }

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function CreateChannelPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [availableUsers, setAvailableUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkUser();
    fetchAvailableUsers();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
    } else {
      setUser(user);
    }
  };

  const fetchAvailableUsers = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('id, username')
      .neq('id', user?.id);
    if (data) setAvailableUsers(data);
  };

  const handleUserSelect = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    // Create channel
    const { data: channelData, error: channelError } = await supabase
      .from('channels')
      .insert({ name, description, created_by: user.id })
      .select()
      .single();

    if (channelError) {
      console.error('Error creating channel:', channelError);
      return;
    }

    // Send invitations
    const invitations = selectedUsers.map(userId => ({
      channel_id: channelData.id,
      inviter_id: user.id,
      invitee_id: userId,
      status: 'pending'
    }));
    const { error: inviteError } = await supabase
      .from('channel_invitations')
      .insert(invitations);

    if (inviteError) {
      console.error('Error sending invitations:', inviteError);
    }

    router.push(`/channels/${channelData.id}`);
  };


  console.log("available",availableUsers)


  if (!user) return null;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Create New Channel</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
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
          rows={4}
        />
        <div>
          <h2 className="text-lg font-semibold mb-2">Invite Users</h2>
          {availableUsers?.map(user => (
            <label key={user.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.id)}
                onChange={() => handleUserSelect(user.id)}
              />
              <span>{user?.username}</span>
            </label>
          ))}
        </div>
        <button 
          type="submit" 
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create Channel and Send Invites
        </button>
      </form>
    </div>
  );
}