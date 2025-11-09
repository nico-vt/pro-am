import type { AmateurOnboardingInputs } from '../../feature-module/onboarding/amateur-onboarding';
import type { ProOnboardingInputs } from '../../feature-module/onboarding/pro-onboarding';

const SUPABASE_URL = "https://qictribvgwwhhkirmcnr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpY3RyaWJ2Z3d3aGhraXJtY25yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MzQ3NjcsImV4cCI6MjA3ODIxMDc2N30.vk994mYgjA28fJEOSVRVKZNvtE-wYkuAAEedRcn8pNI";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

async function postToSupabase<T>(table: string, data: T) {
  const url = `${SUPABASE_URL}/rest/v1/${table}`;
  
  console.log('[postToSupabase] Sending request to:', url);
  console.log('[postToSupabase] Data:', data);
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Prefer': 'return=minimal',
    },
    body: JSON.stringify(data),
  });

  console.log('[postToSupabase] Response status:', response.status);
  console.log('[postToSupabase] Response ok:', response.ok);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    console.error('[postToSupabase] Error response:', error);
    
    // Extraer el mensaje de error más específico de Supabase
    const errorMessage = error.message || error.hint || error.details || 'Failed to submit form';
    throw new Error(errorMessage);
  }

  console.log('[postToSupabase] Success!');
  return response;
}

export async function submitAmateurOnboarding(data: AmateurOnboardingInputs) {
  return postToSupabase('Amateur_proam', data);
}

export async function submitProfessionalOnboarding(data: ProOnboardingInputs) {
  return postToSupabase('Professional_proam', data);
}
