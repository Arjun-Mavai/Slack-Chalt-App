"use client"
// import React, { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { supabase } from '@/lib/supabase'

// type AuthFormProps = {
//   type: 'login' | 'signup'
// }

// export function AuthForm({ type }: AuthFormProps) {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [username, setUsername] = useState('')
//   const router = useRouter()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     try {
//       if (type === 'signup') {
//         const { data, error } = await supabase.auth.signUp({
//           email,
//           password,
//           options: {
//             data: { username }
//           }
//         })
//         if (error) throw error
//         if (data.user) {
//           await supabase.from('profiles').insert({ id: data.user.id, username })
//         }
//       } else {
//         const { error } = await supabase.auth.signInWithPassword({ email, password })
//         if (error) throw error
//       }
//       router.push('/')
//     } catch (error) {
//       console.error('Error:', error)
//       alert(error.message)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <Label htmlFor="email">Email</Label>
//         <Input
//           id="email"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <Label htmlFor="password">Password</Label>
//         <Input
//           id="password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </div>
//       {type === 'signup' && (
//         <div>
//           <Label htmlFor="username">Username</Label>
//           <Input
//             id="username"
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//       )}
//       <Button type="submit">{type === 'login' ? 'Log In' : 'Sign Up'}</Button>
//     </form>
//   )
// }

import React, { useState } from 'react'
import { toast } from 'sonner'
 import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { supabase } from '@/lib/supabase'

export default function AuthForm({ type }: { type: 'login' | 'signup' }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const router = useRouter()
 
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (type === 'signup') {
        const { data: authData, error: authError } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            emailRedirectTo: `${location.origin}/auth/callback`
          }
        })
        if (authError) throw authError

        if (authData.user) {
          const { error: profileError } = await supabase
            .from('users')
            .insert({ id: authData.user.id, username, avatar_url: null })
          
          if (profileError) throw profileError
        }

        toast.success('Signup successful! Please check your email for verification.')
         
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        toast.success('Login successful!')
        router.push('/dashboard')
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error:', error)
        alert(error.message)
      } else {
        console.error('Unexpected error:', error) // Handle unexpected error types
        alert('An unexpected error occurred.')
      }
    }
  }

  return (
    <form onSubmit={handleAuth} className="space-y-4">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {type === 'signup' && (
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      )}
      <Button type="submit" className="w-full">
        {type === 'login' ? 'Log In' : 'Sign Up'}
      </Button>
    </form>
  )
}