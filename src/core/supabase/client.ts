import type { AmateurOnboardingInputs } from '../../feature-module/onboarding/amateur-onboarding';
import type { ProOnboardingInputs } from '../../feature-module/onboarding/pro-onboarding';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

async function postToSupabase<T>(table: string, data: T) {
  const url = `${supabaseUrl}/rest/v1/${table}`;
  
  console.log('[postToSupabase] Sending request to:', url);
  console.log('[postToSupabase] Data:', data);
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`,
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
