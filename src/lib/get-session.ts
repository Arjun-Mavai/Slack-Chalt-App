import { supabase } from '@/lib/supabase'; // Adjust the import based on your project structure

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Error fetching session:', error);
    return null;
  }

  return data.session; // This will return the session object if it exists
}

// // Usage
// getSession().then(session => {
//   if (session) {
//     console.log('Session:', session);
//   } else {
//     console.log('No active session found.');
//   }
// });