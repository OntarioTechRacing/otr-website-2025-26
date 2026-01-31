'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';

function getErrorMessage(error: string | null): string | null {
  if (error === 'not-admin') return 'Only admins can sign in. Your email is not on the admin list.';
  if (error === 'auth-failed') return 'Authentication failed. Please try again.';
  return null;
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const searchParams = useSearchParams();
  const { signInWithOtp, isAdmin, user } = useAuth();

  const urlError = getErrorMessage(searchParams.get('error'));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    const { error } = await signInWithOtp(email);
    setLoading(false);
    if (error) {
      setMessage({ type: 'error', text: error.message });
      return;
    }
    setMessage({
      type: 'success',
      text: 'Check your email for the sign-in link. Only admin emails can complete sign-in.',
    });
  };

  if (user && isAdmin) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <p className="text-white text-lg">You are signed in as an admin.</p>
          <Button asChild variant="outline" className="cursor-pointer">
            <Link href="/" className="cursor-pointer">Go to home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-bold text-white text-center">Admin sign in</h1>
        <p className="text-gray-400 text-sm text-center">
          Only emails on the admin list can sign in. Enter your email to receive a magic link.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
            {loading ? 'Sending link…' : 'Send magic link'}
          </Button>
        </form>
        {(message || urlError) && (
          <p
            className={`text-sm text-center ${
              message?.type === 'success' ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {message ? message.text : urlError}
          </p>
        )}
        <p className="text-gray-500 text-sm text-center">
          <Link href="/" className="hover:text-gray-400 underline cursor-pointer">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
