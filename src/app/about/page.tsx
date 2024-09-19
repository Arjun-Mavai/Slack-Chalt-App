import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">About Slack Clone</h1>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>What is Slack Clone?</CardTitle>
          <CardDescription>A modern communication platform for teams</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Slack Clone is a powerful, real-time messaging application designed to streamline team communication and boost productivity. Inspired by the popular Slack platform, our app brings together the best features of modern chat applications in a user-friendly interface.
          </p>
          <h2 className="text-2xl font-semibold">Key Features:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Real-time messaging in channels and direct messages</li>
            <li>Create and manage public and private channels</li>
            <li>Rich media sharing (images, files, code snippets)</li>
            <li>Powerful search functionality</li>
            <li>Customizable notifications</li>
            <li>User presence indicators</li>
            <li>Emojis and reactions</li>
            <li>Integration with popular tools and services</li>
          </ul>
          <p>
            Whether you&apos;re a small startup or a large enterprise, Slack Clone provides the tools you need to keep your team connected, organized, and productive. Say goodbye to scattered emails and fragmented conversations - with Slack Clone, all your team communication is in one place, accessible, and searchable.
          </p>
          <p>
            Get started today and experience the future of team collaboration!
          </p>
        </CardContent>
      </Card>
    </div>
  )
}