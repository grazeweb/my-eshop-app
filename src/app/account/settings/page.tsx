
"use client";

import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential, deleteUser } from 'firebase/auth';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function SettingsPage() {
    const { user, loading } = useAuth();
    const { toast } = useToast();

    // Profile state
    const [displayName, setDisplayName] = useState(user?.displayName ?? '');
    const [profileLoading, setProfileLoading] = useState(false);

    // Password state
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordLoading, setPasswordLoading] = useState(false);

    // Delete account state
    const [deleteConfirmText, setDeleteConfirmText] = useState('');
    const [deleteLoading, setDeleteLoading] = useState(false);

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setProfileLoading(true);
        try {
            await updateProfile(user, { displayName });
            toast({ title: "Profile updated successfully!" });
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Error updating profile', description: error.message });
        } finally {
            setProfileLoading(false);
        }
    };
    
    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !user.email) return;
        if (newPassword !== confirmPassword) {
            toast({ variant: 'destructive', title: 'Passwords do not match' });
            return;
        }
        if (newPassword.length < 6) {
            toast({ variant: 'destructive', title: 'Password must be at least 6 characters' });
            return;
        }
        
        setPasswordLoading(true);
        try {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
            toast({ title: 'Password updated successfully!' });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Error updating password', description: "Please check your current password and try again." });
        } finally {
            setPasswordLoading(false);
        }
    };
    
    const handleDeleteAccount = async () => {
        if (!user) return;
        setDeleteLoading(true);
        try {
            await deleteUser(user);
            toast({ title: 'Account deleted successfully.' });
            // onAuthStateChanged in AuthProvider will handle the user state change
            // and the AccountLayout will redirect to /login
        } catch (error: any) {
            // Re-authentication is likely required.
            toast({ variant: 'destructive', title: 'Error deleting account', description: "This is a sensitive operation. Please log out and log back in before trying again." });
        } finally {
            setDeleteLoading(false);
        }
    };
  
    if (loading || !user) {
        return null;
    }
  
    return (
        <div className="space-y-6">
             <h1 className="text-3xl font-bold font-headline">Settings</h1>
            <Card>
                <form onSubmit={handleProfileUpdate}>
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Update your account's profile information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue={user.email ?? ''} readOnly disabled />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={profileLoading}>
                            {profileLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            <Card>
                <form onSubmit={handleChangePassword}>
                    <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                        <CardDescription>Update your password. Please enter your current password to proceed.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={passwordLoading}>
                            {passwordLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Change Password
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            <Card className="border-destructive">
                <CardHeader>
                    <CardTitle className="text-destructive">Danger Zone</CardTitle>
                    <CardDescription>
                        Once you delete your account, there is no going back. Please be certain.
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                     <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">Delete Account</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    account and remove your data from our servers.
                                    To confirm, please type <strong>delete</strong> below.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <Input 
                                id="delete-confirm"
                                value={deleteConfirmText}
                                onChange={(e) => setDeleteConfirmText(e.target.value)}
                            />
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDeleteAccount}
                                    disabled={deleteConfirmText !== 'delete' || deleteLoading}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive"
                                >
                                    {deleteLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Delete Account
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            </Card>
        </div>
    );
}
