import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default async function PrivatePage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to Your Private Page</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">Hello, {data.user.email}!</p>
          <p className="mt-4">This is your secure, private space. Enjoy your stay!</p>
        </CardContent>
      </Card>
    </div>
  )
}