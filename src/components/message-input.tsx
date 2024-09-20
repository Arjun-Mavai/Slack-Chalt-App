// import React, { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Send } from "lucide-react"

// interface MessageInputProps {
//   onSendMessage: (message: string) => void
// }

// export default function MessageInput({ onSendMessage }: MessageInputProps) {
//   const [message, setMessage] = useState('')

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (message.trim()) {
//       onSendMessage(message)
//       setMessage('')
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="flex items-center space-x-2 p-4 bg-gray-100">
//       <Input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message..."
//         className="flex-grow"
//       />
//       <Button type="submit" size="icon">
//         <Send className="h-4 w-4" />
//       </Button>
//     </form>
//   )
// }

'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js';
import { Button } from './ui/button';
import { PaperclipIcon, SendIcon } from 'lucide-react';
import { Input } from './ui/input';

// export default function MessageInput({ channelId }: { channelId: string }) {
//   const [message, setMessage] = useState('')
//   const [isSending, setIsSending] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!message.trim() || isSending) return

//     setIsSending(true)

//     try {
//       const { data: { user } } = await supabase.auth.getUser()
      
//       if (!user) {
//         throw new Error('User not authenticated')
//       }

//       const { error } = await supabase
//         .from('messages')
//         .insert({
//           content: message.trim(),
//           channel_id: channelId,
//           user_id: user.id
//         })
// console.log("message: " + message,channelId,user.id)
//       if (error) throw error

//       setMessage('')
//     } catch (error) {
//       console.error('Error sending message:', error)
//       alert('Failed to send message. Please try again.')
//     } finally {
//       setIsSending(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="p-4 border-t">
//       <div className="flex space-x-2">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-1 p-2 border rounded"
//           disabled={isSending}
//         />
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
//           disabled={isSending || !message.trim()}
//         >
//           Send
//         </button>
//       </div>
//     </form>
//   )
// }


// export default function MessageInput({ channelId }: { channelId: string }) {
//   const [message, setMessage] = useState('')
//   const [isSending, setIsSending] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!message.trim() || isSending) return
//     setIsSending(true)
//     try {
//       const { data: { user } } = await supabase.auth.getUser()
      
//       if (!user) {
//         throw new Error('User not authenticated')
//       }
//       const { error } = await supabase
//         .from('messages')
//         .insert({
//           content: message.trim(),
//           channel_id: channelId,
//           user_id: user.id
//         })

//       if (error) throw error
//       setMessage('')
//     } catch (error) {
//       console.error('Error sending message:', error)
//       alert('Failed to send message. Please try again.')
//     } finally {
//       setIsSending(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
//       <div className="flex space-x-2">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-1 p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//           disabled={isSending}
//         />
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
//           disabled={isSending || !message.trim()}
//         >
//           Send
//         </button>
//       </div>
//     </form>
//   )
// }

  
export default function MessageInput({ channelId, user }: { channelId: string, user: User }) {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [image, setImage] = useState<File | null>(null); // State for the image file

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && !image) return; // Ensure at least one is provided
    if (isSending) return;

    setIsSending(true);

    try {
      // Upload image to Supabase Storage if an image is selected
      let imageUrl = null;
      if (image) {
        const { data, error: uploadError } = await supabase.storage
          .from('chat-bucket') // Replace with your bucket name
          .upload(`images/${Date.now()}_${image.name}`, image);

        if (uploadError) throw uploadError;

        // Get the public URL of the uploaded image
        imageUrl = supabase.storage.from('chat-bucket').getPublicUrl(data.path).data.publicUrl;
      }

      // Insert message into the messages table
      const { error } = await supabase
        .from('messages')
        .insert({
          content: message.trim(),
          channel_id: channelId,
          user_id: user.id,
          image_url: imageUrl, // Add image URL to the message
        });

      if (error) throw error;

      // Reset the input fields
      setMessage('');
      setImage(null);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (

    <form onSubmit={handleSubmit} className="p-4 border-t">
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-2">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            disabled={isSending}
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <PaperclipIcon className="w-6 h-6 text-gray-500 hover:text-gray-700" />
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              disabled={isSending}
            />
          </label>
        </div>
        {image && (
          <div className="text-sm text-gray-500">
            Selected image: {image.name}
          </div>
        )}
        <Button
          type="submit"
          className="w-full"
          disabled={isSending || (!message.trim() && !image)}
        >
          <SendIcon className="w-4 h-4 mr-2" />
          Send
        </Button>
      </div>
    </form>
    // <form onSubmit={handleSubmit} className="p-4 border-t">
    //   <div className="flex space-x-2">
    //     <input
    //       type="text"
    //       value={message}
    //       onChange={(e) => setMessage(e.target.value)}
    //       placeholder="Type a message..."
    //       className="flex-1 p-2 border rounded"
    //       disabled={isSending}
    //     />
    //     <input
    //       type="file"
    //       accept="image/*"
    //       onChange={handleImageChange}
    //       className="border rounded"
    //       disabled={isSending}
    //     />
    //     <button
    //       type="submit"
    //       className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
    //       disabled={isSending || (!message.trim() && !image)}
    //     >
    //       Send
    //     </button>
    //   </div>
    // </form>
  );
}