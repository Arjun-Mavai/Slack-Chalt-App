"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"; // Assuming you have this set up
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("user");
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState("");

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const generatedApiKey = role === "partner" ? generateApiKey() : null;

      const { data: user, error: insertError } = await supabase
        .from("users")
        .insert([
          {
            email,
            name,
            role,
            password,
            api_key: generatedApiKey,
          },
        ])
        .select();

      if (insertError) {
        throw new Error("Email already exists");
      }

      toast.success("Account created successfully!");
      setIsSheetOpen(false);

      if (role === "partner" && generatedApiKey) {
        setApiKey(generatedApiKey);
        setShowApiKey(true);
      } else {
        router.push("/");
      }

      return user;
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function generateApiKey() {
    return "ak_" + Math.random().toString(36).substr(2, 9);
  }

  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="text-white bg-black">
            Sign Up
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sign Up</SheetTitle>
            <SheetDescription>
              Create a new account to get started.
            </SheetDescription>
          </SheetHeader>
          <Tabs
            defaultValue="user"
            className="w-full mt-4"
            onValueChange={(value) => setRole(value)}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="user">User</TabsTrigger>
              <TabsTrigger value="partner">Partner</TabsTrigger>
            </TabsList>
            {["user", "partner"].map((roleType) => (
              <TabsContent key={roleType} value={roleType}>
                <form onSubmit={onSubmit} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading
                      ? "Signing up..."
                      : `Sign Up as ${
                          roleType.charAt(0).toUpperCase() + roleType.slice(1)
                        }`}
                  </Button>
                </form>
              </TabsContent>
            ))}
          </Tabs>
        </SheetContent>
      </Sheet>

      <Dialog open={showApiKey} onOpenChange={setShowApiKey}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Your API Key</DialogTitle>
            <DialogDescription>
              This is your API key. Please save it securely as it won't be shown
              again.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="api-key" className="sr-only">
                API Key
              </Label>
              <Input id="api-key" defaultValue={apiKey} readOnly />
            </div>
            <Button
              type="submit"
              size="sm"
              className="px-3"
              onClick={() => {
                navigator.clipboard.writeText(apiKey);
                toast.success("API key copied to clipboard");
              }}
            >
              Copy
            </Button>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() => {
                setShowApiKey(false);
                router.push("/");
              }}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// // app/signup/page.tsx
// "use client";

// import { useState } from "react";

// import { useRouter } from "next/navigation";
// import { signIn } from "next-auth/react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { createClient } from "@supabase/supabase-js";
// import { toast } from "sonner";
// import { supabase } from "@/lib/supabase";
// // import { v4 as uuidv4 } from 'uuid';
// // import bcrypt from "bcrypt";

// // const supabase = createClient(
// //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
// //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// // );

// export default function SignUpPage() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [role, setRole] = useState("user");
//   const router = useRouter();
//   const [isSheetOpen, setIsSheetOpen] = useState(false);

//   async function onSubmit(event: React.SyntheticEvent) {
//     event.preventDefault();
//     setIsLoading(true);

//     const form = event.target as HTMLFormElement;
//     const formData = new FormData(form);
//     const name = formData.get("name") as string;
//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;

//     try {
//       // // Insert user data into Supabase
//       // const { data, error } = await supabase.auth.signUp({
//       //   email,
//       //   password,
//       //   options: {
//       //     data: {
//       //       name,
//       //       role,
//       //     },
//       //   },
//       // });

//       // if (error) throw error;

//       // // Sign in the user
//       // const result = await signIn("credentials", {
//       //   email,
//       //   password,
//       //   redirect: false,
//       // });

//       // if (result?.error) {
//       //   throw new Error(result.error);
//       // }

//       // Insert user data into Supabase
//       // const hashedPassword = await bcrypt.hash(password, 10);

//       console.log("details", name, email, role, password);
//       const { data: user, error: insertError } = await supabase
//         .from("users")
//         .insert([
//           {
//             email,
//             name,
//             role,
//             password,
//           },
//         ])
//         .select(); // Add this to get the inserted data
//       console.log("Inserted user:", user);
//       console.log(user);
//       if (insertError) {
//         throw new Error("Email already exists");
//         console.log("hello");
//         console.error("Insert Error:", insertError);

//         toast.error("Error occured , registering the user");
//         return;
//       }
//       console.log(insertError);
//       toast.success("Account created successfully!");
//       setIsSheetOpen(false);
//       router.push(role === "admin" ? "/" : "/");
//       return user;
//     } catch (error) {
//       toast.error("Something went wrong. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
//       <SheetTrigger asChild>
//         <Button variant="outline" className="text-white bg-black">
//           Sign Up
//         </Button>
//       </SheetTrigger>
//       <SheetContent>
//         <SheetHeader>
//           <SheetTitle>Sign Up</SheetTitle>
//           <SheetDescription>
//             Create a new account to get started.
//           </SheetDescription>
//         </SheetHeader>
//         <Tabs
//           defaultValue="user"
//           className="w-full mt-4"
//           onValueChange={(value) => setRole(value)}
//         >
//           <TabsList className="grid w-full grid-cols-2">
//             <TabsTrigger value="user">User</TabsTrigger>
//             <TabsTrigger value="partner">Partner</TabsTrigger>
//             {/* <TabsTrigger value="admin">Admin</TabsTrigger> */}
//           </TabsList>
//           {["user", "partner"].map((roleType) => (
//             <TabsContent key={roleType} value={roleType}>
//               <form onSubmit={onSubmit} className="space-y-4 mt-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="name">Name</Label>
//                   <Input id="name" name="name" required />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email</Label>
//                   <Input id="email" name="email" type="email" required />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="password">Password</Label>
//                   <Input
//                     id="password"
//                     name="password"
//                     type="password"
//                     required
//                   />
//                 </div>
//                 {/* {roleType === "partner" && (
//                   <div className="space-y-2">
//                     <Label htmlFor="company">Company Name</Label>
//                     <Input id="company" name="company" required />
//                   </div>
//                 )} */}
//                 <Button type="submit" className="w-full" disabled={isLoading}>
//                   {isLoading
//                     ? "Signing up..."
//                     : `Sign Up as ${
//                         roleType.charAt(0).toUpperCase() + roleType.slice(1)
//                       }`}
//                 </Button>
//               </form>
//             </TabsContent>
//           ))}
//         </Tabs>
//       </SheetContent>
//     </Sheet>
//   );
// }
