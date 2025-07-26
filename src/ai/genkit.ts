
'use server';

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { configureGenkit } from '@genkit-ai/ai';

configureGenkit({
  plugins: [
    googleAI(),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

export { ai } from '@genkit-ai/ai';
