"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generatePolicy } from '@/app/admin/policy-generator/actions';
import { Loader2 } from 'lucide-react';

const initialState = {
  terms: '',
  privacy: '',
  returns: '',
};

function SubmitButton({ policyType }: { policyType: string }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      name="policyType"
      value={policyType}
      disabled={pending}
      className="mt-4"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        `Generate ${policyType.charAt(0).toUpperCase() + policyType.slice(1)} Policy`
      )}
    </Button>
  );
}

export function PolicyGeneratorForm() {
  const [state, formAction] = useFormState(generatePolicy, initialState);

  return (
    <Tabs defaultValue="terms" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
        <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
        <TabsTrigger value="returns">Return Policy</TabsTrigger>
      </TabsList>
      <form action={formAction}>
        <TabsContent value="terms" className="mt-4">
          <Textarea
            placeholder="Generated Terms & Conditions will appear here..."
            rows={15}
            value={state.terms}
            readOnly
          />
          <SubmitButton policyType="terms" />
        </TabsContent>
        <TabsContent value="privacy" className="mt-4">
          <Textarea
            placeholder="Generated Privacy Policy will appear here..."
            rows={15}
            value={state.privacy}
            readOnly
          />
          <SubmitButton policyType="privacy" />
        </TabsContent>
        <TabsContent value="returns" className="mt-4">
          <Textarea
            placeholder="Generated Return Policy will appear here..."
            rows={15}
            value={state.returns}
            readOnly
          />
          <SubmitButton policyType="returns" />
        </TabsContent>
      </form>
    </Tabs>
  );
}
