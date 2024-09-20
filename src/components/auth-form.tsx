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

// export default function AuthForm({ type }: AuthFormProps) {
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
//           await supabase.from('users').update({ username }).eq('id', data.user.id)
//         }
//       } else {
//         const { error } = await supabase.auth.signInWithPassword({ email, password })
//         if (error) throw error
//       }
//       router.push('/')
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error('Error:', error)
//         alert(error.message)
//       }
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

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { GithubIcon, ArrowRight } from 'lucide-react'

type AuthFormProps = {
  type: 'login' | 'signup'
}

export default function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (type === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username }
          }
        })
        if (error) throw error
        if (data.user) {
          await supabase.from('users').update({ username }).eq('id', data.user.id)
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      }
      router.push('/')
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error:', error)
        alert(error.message)
      }
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              {type === 'login' ? 'Sign in to your account' : 'Create a new account'}
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <Label htmlFor="email" className="sr-only">
                  Email address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="rounded-t-md"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={type === 'login' ? "rounded-b-md" : ""}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {type === 'signup' && (
                <div>
                  <Label htmlFor="username" className="sr-only">
                    Username
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="rounded-b-md"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              )}
            </div>

            <div>
              <Button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <ArrowRight className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                {type === 'login' ? 'Sign in' : 'Sign up'}
              </Button>
            </div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Button variant="outline" className="w-full">
                <GithubIcon className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="/placeholder.svg?height=1080&width=1920"
          alt="Authentication background"
        />
      </div>
    </div>
  )
}