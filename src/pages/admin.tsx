import { useEffect, useState } from 'react';
import { AdminLogin } from './admin-login';
import { AdminDashboard } from './admin-dashboard';
import { api } from '@/lib/api';

export function Admin() {
  const [status, setStatus] = useState<'checking' | 'authenticated' | 'anonymous'>('checking');
  const [email, setEmail] = useState<string | undefined>(undefined);

  useEffect(() => {
    api
      .me()
      .then((res) => {
        if (res.authenticated) {
          setEmail(res.email);
          setStatus('authenticated');
        } else {
          setStatus('anonymous');
        }
      })
      .catch(() => setStatus('anonymous'));
  }, []);

  if (status === 'checking') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Carregando...</p>
      </div>
    );
  }

  if (status === 'anonymous') {
    return (
      <AdminLogin
        onSuccess={() => {
          api.me().then((res) => {
            setEmail(res.email);
            setStatus('authenticated');
          });
        }}
      />
    );
  }

  return (
    <AdminDashboard
      email={email}
      onLogout={() => {
        setStatus('anonymous');
        setEmail(undefined);
      }}
    />
  );
}
