
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function AppearancePage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid rendering the switch until the page is mounted to prevent hydration mismatch
  if (!mounted) {
    // You can return a placeholder here if you want
    return null;
  }
  
  const isDarkMode = theme === 'dark';

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Appearance</h1>
      <p className="text-muted-foreground">Customize the look and feel of your eShop experience.</p>
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Select your preferred color scheme.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                    <Label htmlFor="dark-mode" className="text-base">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                        Enable dark mode for a different viewing experience.
                    </p>
                </div>
                <Switch 
                  id="dark-mode" 
                  checked={isDarkMode}
                  onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                />
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
