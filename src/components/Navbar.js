'use client';
import Link from 'next/link';
import { useStore } from '../store/useStore';
import { ShoppingCart, User, LogOut, Package } from 'lucide-react';
import styles from './Navbar.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, cart, logout } = useStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          NextGen<span className={styles.accent}>Shop</span>
        </Link>
        
        <div className={styles.navLinks}>
          <Link href="/cart" className={styles.navItem}>
            <ShoppingCart size={20} />
            {mounted && totalItems > 0 && (
              <span className={styles.badge}>{totalItems}</span>
            )}
          </Link>

          {mounted && user ? (
            <div className={styles.userMenu}>
              {user.role === 'ADMIN' && (
                <Link href="/admin" className={styles.navItem} title="Admin Dashboard">
                  <Package size={20} />
                </Link>
              )}
              <span className={styles.userName}>{user.email}</span>
              <button onClick={handleLogout} className={styles.logoutBtn} title="Logout">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            mounted && (
              <Link href="/login" className={styles.navItem}>
                <User size={20} />
                <span>Login</span>
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
