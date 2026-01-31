import { createClient } from '@/lib/supabase/server';
import { isAdminEmail } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.user?.email) {
      if (!isAdminEmail(data.user.email)) {
        await supabase.auth.signOut();
        return NextResponse.redirect(`${origin}/auth/login?error=not-admin`);
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?error=auth-failed`);
}
