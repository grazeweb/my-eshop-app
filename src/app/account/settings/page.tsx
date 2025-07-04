
"use client";

import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function SettingsPage() {
    const { user, loading } = useAuth();
  
    if (loading || !user) {
        return null;
    }
  
    return (
        <div className="space-y-6">
             <h1 className="text-3xl font-bold font-headline">Settings</h1>
            <Card>
                <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your account's profile information and email address.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue={user.displayName ?? ''} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={user.email ?? ''} readOnly />
                </div>
                <div className="flex gap-2">
                    <Button>Save Changes</Button>
                </div>
                </CardContent>
            </Card>
        </div>
    );
}
