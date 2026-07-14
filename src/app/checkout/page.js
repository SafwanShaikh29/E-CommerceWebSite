'use client';

import { useStore } from '../../store/useStore';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import styles from './checkout.module.css';

export default function CheckoutPage() {
  const { cart, clearCart, user } = useStore();
  const [mounted, setMounted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    if (!user) {
      router.push('/login?redirect=/checkout');
    }
  }, [user, router]);

  if (!mounted || !user) return null;

  if (cart.length === 0 && !success) {
    router.push('/');
    return null;
  }

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call for checkout
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      clearCart();
    }, 1500);
  };

  if (success) {
    return (
      <div className={styles.successContainer}>
        <CheckCircle2 size={80} className={styles.successIcon} />
        <h1 className={styles.title}>Payment Successful!</h1>
        <p className={styles.message}>Thank you for your order. We're processing it now.</p>
        <button 
          className="btn btn-primary" 
          onClick={() => router.push('/')}
          style={{ marginTop: '2rem' }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div className={`animate-fade-in ${styles.checkoutContainer}`}>
      <h1 className={styles.title}>Checkout</h1>
      
      <div className={styles.content}>
        <div className={`glass ${styles.formContainer}`}>
          <h2 className={styles.sectionTitle}>Shipping Information</h2>
          <form onSubmit={handleCheckout} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Full Name</label>
              <input type="text" required className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label>Address</label>
              <input type="text" required className={styles.input} />
            </div>
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>City</label>
                <input type="text" required className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label>Postal Code</label>
                <input type="text" required className={styles.input} />
              </div>
            </div>
            
            <h2 className={styles.sectionTitle} style={{ marginTop: '2rem' }}>Payment Details</h2>
            <div className={styles.formGroup}>
              <label>Card Number</label>
              <input type="text" placeholder="XXXX XXXX XXXX XXXX" required className={styles.input} />
            </div>
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Expiry Date</label>
                <input type="text" placeholder="MM/YY" required className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label>CVC</label>
                <input type="text" placeholder="XXX" required className={styles.input} />
              </div>
            </div>
            
            <button 
              type="submit" 
              className={`btn btn-primary ${styles.submitBtn}`}
              disabled={loading}
            >
              {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
            </button>
          </form>
        </div>
        
        <div className={`glass ${styles.orderSummary}`}>
          <h2 className={styles.sectionTitle}>Your Order</h2>
          <div className={styles.itemsList}>
            {cart.map((item) => (
              <div key={item.product.id} className={styles.summaryItem}>
                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>{item.product.name}</span>
                  <span className={styles.itemQty}>x{item.quantity}</span>
                </div>
                <span className={styles.itemTotal}>
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          
          <div className={styles.summaryDivider}></div>
          
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          
          <div className={styles.summaryDivider}></div>
          
          <div className={`${styles.summaryRow} ${styles.finalTotal}`}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
