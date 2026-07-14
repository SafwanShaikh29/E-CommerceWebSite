'use client';

import { useStore } from '../../store/useStore';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './login.module.css';
import { Suspense } from 'react';

function LoginContent() {
  const { login } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy authentication
    const role = email === 'admin@example.com' ? 'ADMIN' : 'USER';
    login({ id: '1', email, role });
    router.push(redirect);
  };

  return (
    <div className={`animate-fade-in ${styles.container}`}>
      <div className={`glass ${styles.formCard}`}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Sign in to your account to continue</p>
        
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Email Address</label>
            <input 
              type="email" 
              required 
              className={styles.input} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com or admin@example.com"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Password</label>
            <input 
              type="password" 
              required 
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Any password works"
            />
          </div>
          
          <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
            Sign In
          </button>
        </form>
        
        <div className={styles.demoNote}>
          <strong>Demo Note:</strong> Use <code>admin@example.com</code> to access the admin dashboard. Any password will work.
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
