import { PolicyGeneratorForm } from '@/components/policy-generator-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';

export default function PolicyGeneratorPage() {
  return (
    <div className="bg-muted/40 flex-grow">
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto">
                <div className="flex flex-col items-center text-center mb-8">
                    <div className="bg-primary/20 p-4 rounded-full mb-4">
                        <ShieldCheck className="h-10 w-10 text-primary" />
                    </div>
                    <h1 className="text-4xl font-bold font-headline">Policy Generation Tool</h1>
                    <p className="text-muted-foreground mt-2">
                        Use our AI-powered tool to generate starter templates for your site's policies.
                    </p>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Generate Your Policies</CardTitle>
                        <CardDescription>
                            Select a policy type and click "Generate" to create a draft. Please review and edit the generated content to fit your business needs. This tool provides a starting point, not legal advice.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PolicyGeneratorForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
