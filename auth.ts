import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
//  import { JWT } from "next-auth/jwt";
import Resend from "next-auth/providers/resend";
import { SupabaseAdapter } from "@auth/supabase-adapter";
// import resend from "next-auth/providers/resend";

// import { Session as NextAuthSession, User as NextAuthUser } from "next-auth";

// nextauth.d.ts
// import { DefaultSession, DefaultUser } from "next-auth";
// Define possible roles
export enum Role {
  User = "user",
  Partner = "partner",
}

// // Define permissions for each role
// export enum Permission {
//   Read = "read",
//   Write = "write",
//   AddProducts = "add_products",
// }

// interface IUser extends DefaultUser {
//   /**
//    * Role of user
//    */
//   role?: Role;
//   /**
//    * Field to check whether a user has a subscription
//    */
//   permissions?: Permission[];
// }
// interface IUser extends DefaultUser {
//   role?: Role; // User role
//   permissions?: Permission[]; // Array of permissions
// }

declare module "next-auth" {
  interface User {
    role?: "user" | "partner" | "undefined";
  }
  interface Session {
    user?: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    role?: "user" | "partner" | "undefined";
  }
}

// import bcrypt from "bcrypt";

// const users = [
//   {
//     id: "1",
//     name: "Arjun Singh",
//     email: "user@gmail.com",
//     password: bcrypt.hashSync("user123", 10),
//     role: "user",
//   },
//   {
//     id: "2",
//     name: "Indian Partner",
//     email: "partner@gmail.com",
//     password: bcrypt.hashSync("partner123", 10),
//     role: "partner",
//   },
// ];

// function encodePassword(password: string) {
//   return btoa(password);
// }

// function decodePassword(encodedPassword: string) {
//   return atob(encodedPassword);
// }

function customEncodePassword(password: string) {
  // Shift each character by 5 positions in ASCII table
  return password
    .split("")
    .map((char) => String.fromCharCode(char.charCodeAt(0) + 5))
    .join("");
}

function customDecodePassword(encodedPassword: string) {
  // Reverse the shift by 5 positions
  return encodedPassword
    .split("")
    .map((char) => String.fromCharCode(char.charCodeAt(0) - 5))
    .join("");
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    secret: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  }),
  providers: [
    Credentials({
      id: "user-login",
      name: "User Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        // Encoding

        const encodedPassword = customEncodePassword(
          credentials.password as string
        );
        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", credentials.email)
          .eq("role", credentials.role)
          .single();

        const decodedPassword = customDecodePassword(user.password);

        if (decodedPassword !== credentials.password) {
          throw new Error("Invalid credentials");
        }

        return user;

        // if (!credentials?.email || !credentials?.password) return null;
        // const user = users.find(
        //   (u) => u.email === credentials.email && u.role === "user"
        // );
        // if (
        //   !user ||
        //   !(await bcrypt.compare(credentials?.password, user.password))
        // )
        //   return null;
        // return {
        //   id: user.id,
        //   name: user.name,
        //   email: user.email,
        //   role: user.role,
        // };
      },
    }),
    Credentials({
      id: "partner-login",
      name: "Partner Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", credentials.email)
          .eq("role", credentials.role)
          .single();
        return user;

        // const partner = users.find(
        //   (u) => u.email === credentials.email && u.role === "partner"
        // );
        // if (
        //   !partner ||
        //   !(await bcrypt.compare(credentials.password, partner.password))
        // )
        //   return null;
        // return {
        //   id: partner.id,
        //   name: partner.name,
        //   email: partner.email,
        //   role: partner.role,
        // };
      },
    }),
    Resend({
      from: "deved@sproutscribble.store",
    }),

    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD
    //     }
    //   },
    //   from: process.env.EMAIL_FROM,
    //   sendVerificationRequest: async ({ identifier: email, url }) => {
    //     const result = await Resend.emails.send({
    //       from: 'Mumbai Clipboard <noreply@mumbaclipboard.com>',
    //       to: email,
    //       subject: 'Sign in to Mumbai Clipboard',
    //       html: `
    //         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    //           <h1 style="color: #4F46E5; text-align: center;">Mumbai Clipboard</h1>
    //           <p style="font-size: 16px; line-height: 1.5;">Aye bhidu! Click the button below to sign in to your account:</p>
    //           <div style="text-align: center; margin-top: 30px;">
    //             <a href="${url}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Sign In</a>
    //           </div>
    //           <p style="font-size: 14px; color: #6B7280; margin-top: 30px;">If you didn't request this email, you can safely ignore it.</p>
    //         </div>
    //       `,
    //     })

    //     if (result.error) {
    //       throw new Error('Failed to send verification email')
    //     }
    //   },
    // }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("token checking", token);
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      let formattedExpires, remainingDays;
      if (session?.user) {
        // Add a human-readable expiry date to the session object
        const expires = new Date(session.expires);
        formattedExpires = expires.toLocaleString(); // Formats to human-readable string
        session.user.role = token.role;

        // const expires = new Date(session.expires);
        const now = new Date();
        remainingDays = Math.ceil(
          (expires.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        ); // Calculate days remaining
      }
      console.log("session check", session.user.role === "partner");
      return { ...session, formattedExpires, remainingDays };
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});

// export { handler as GET, handler as POST };
