"use client"
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Bell } from "lucide-react"
import { toast } from 'sonner';

export default function NotificationPage() {
  const [user, setUser] = useState(null);
  const [invitations, setInvitations] = useState([]);
  const [selectedInvitation, setSelectedInvitation] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    checkUser();
    fetchInvitations();
    subscribeToInvitations();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
    } else {
      // Redirect to login if not authenticated
      window.location.href = '/login';
    }
  };

  const fetchInvitations = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('channel_invitations')
      .select(`
        id,
        status,
        channels (
          id,
          name
        ),
        users!inviter_id (
          username
        )
      `)
      .eq('invitee_id', user.id)
      .eq('status', 'pending');
    
    if (data) setInvitations(data);
    if (error) console.error('Error fetching invitations:', error);
  };

//   const subscribeToInvitations = () => {
//     supabase
//       .channel('public:channel_invitations')
//       .on('INSERT', (payload) => {
//         if (payload.new.invitee_id === user?.id) {
//           setInvitations(prev => [...prev, payload.new]);
//           showNotification(payload.new);
//         }
//       })
//       .subscribe();
//   };


const subscribeToInvitations = () => {
    const channel = supabase
      .channel('public:channel_invitations')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'channel_invitations' }, (payload) => {
        if (payload.new.invitee_id === user?.id) {
          setInvitations(prev => [...prev, payload.new]);
          showNotification(payload.new);
        }
      })
      .subscribe();
  
    return () => {
      supabase.removeChannel(channel); // Clean up the subscription on component unmount
    };
  };
  const showNotification = (invitation) => {
    toast.success( `New Channel Invitation You've been invited to join ${invitation.channels.name}`
    );
  };

  const handleInvitationResponse = async (action) => {
    if (!selectedInvitation) return;

    const { data, error } = await supabase
      .from('channel_invitations')
      .update({ status: action })
      .eq('id', selectedInvitation.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating invitation:', error);
      toast.error(  "Failed to respond to invitation. Please try again."
        );
      return;
    }

    if (action === 'accepted') {
      await supabase
        .from('user_channel_memberships')
        .insert({ user_id: user.id, channel_id: selectedInvitation.channels.id });
      
      toast( `Invitation Accepted You've joined ${selectedInvitation.channels.name} ` 
      );
    } else {
      toast.error(  "Invitation Rejected",
        );
    }

    setInvitations(prev => prev.filter(inv => inv.id !== selectedInvitation.id));
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Notifications</h1>
      {invitations.length === 0 ? (
        <p>No pending invitations.</p>
      ) : (
        <ul className="space-y-2">
          {invitations.map((invitation) => (
            <li key={invitation.id} className="flex items-center justify-between bg-gray-100 p-3 rounded">
              <div>
                <Bell className="inline-block mr-2" />
                <span>{invitation.users.username} invited you to join {invitation?.channels.name}</span>
              </div>
              <Button onClick={() => {
                setSelectedInvitation(invitation);
                setIsDialogOpen(true);
              }}>
                Respond
              </Button>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Channel Invitation</DialogTitle>
            <DialogDescription>
              {selectedInvitation && `You've been invited to join ${selectedInvitation.channels.name}. Do you want to accept?`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleInvitationResponse('rejected')}>
              Reject
            </Button>
            <Button onClick={() => handleInvitationResponse('accepted')}>
              Accept
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}