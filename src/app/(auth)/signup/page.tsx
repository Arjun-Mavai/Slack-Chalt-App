import AuthForm from "@/components/auth-form";

 
export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-black rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Sign Up</h1>
        <AuthForm type="signup" />
      </div>
    </div>
  )
}