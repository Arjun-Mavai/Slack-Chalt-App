import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { MessageSquare, Users, Bell, Settings } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Slack Clone</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Channels</CardTitle>
            <CardDescription>Join or create channels</CardDescription>
          </CardHeader>
          <CardContent>
            <MessageSquare className="w-12 h-12 text-blue-500 mb-4" />
            <Button asChild>
              <Link href="/channels">Explore Channels</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Direct Messages</CardTitle>
            <CardDescription>Chat with team members</CardDescription>
          </CardHeader>
          <CardContent>
            <Users className="w-12 h-12 text-green-500 mb-4" />
            <Button asChild>
              <Link href="/messages">Start Chatting</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage your alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <Bell className="w-12 h-12 text-yellow-500 mb-4" />
            <Button asChild>
              <Link href="/notifications">View Notifications</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Customize your experience</CardDescription>
          </CardHeader>
          <CardContent>
            <Settings className="w-12 h-12 text-purple-500 mb-4" />
            <Button asChild>
              <Link href="/settings">Manage Settings</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}