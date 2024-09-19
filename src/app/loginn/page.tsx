'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { login, signup } from './actions'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>{isLogin ? 'Login' : 'Sign Up'}</CardTitle>
            <CardDescription>
              {isLogin ? 'Welcome back!' : 'Create a new account'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button 
              className="w-full" 
              formAction={isLogin ? login : signup}
            >
              {isLogin ? 'Log in' : 'Sign up'}
            </Button>
            <Button 
              variant="link" 
              className="w-full"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Need an account? Sign up' : 'Already have an account? Log in'}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}