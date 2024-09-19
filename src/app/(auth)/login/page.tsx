import AuthForm from "@/components/auth-form";

 
export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-slate-900 rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Log In</h1>
        <AuthForm type="login" />
      </div>
    </div>
  )
}