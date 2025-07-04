
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function AppearancePage() {
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
                <Switch id="dark-mode" />
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
