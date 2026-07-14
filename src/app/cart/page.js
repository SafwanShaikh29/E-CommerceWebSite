'use client';

import { useStore } from '../../store/useStore';
import Link from 'next/link';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import styles from './cart.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link href="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className={`animate-fade-in ${styles.cartContainer}`}>
      <h1 className={styles.title}>Shopping Cart</h1>
      
      <div className={styles.content}>
        <div className={styles.itemsList}>
          {cart.map((item) => (
            <div key={item.product.id} className={`glass ${styles.cartItem}`}>
              <div className={styles.itemImageContainer}>
                {item.product.imageUrl ? (
                  <img src={item.product.imageUrl} alt={item.product.name} className={styles.itemImage} />
                ) : (
                  <div className={styles.itemPlaceholder}>No Image</div>
                )}
              </div>
              
              <div className={styles.itemDetails}>
                <h3 className={styles.itemName}>{item.product.name}</h3>
                <p className={styles.itemPrice}>${item.product.price.toFixed(2)}</p>
                
                <div className={styles.itemActions}>
                  <div className={styles.quantityControls}>
                    <button 
                      className={styles.qtyBtn} 
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    >
                      <Minus size={14} />
                    </button>
                    <span className={styles.qty}>{item.quantity}</span>
                    <button 
                      className={styles.qtyBtn} 
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  
                  <button 
                    className={styles.removeBtn} 
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </div>
              <div className={styles.itemTotal}>
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        
        <div className={`glass ${styles.summary}`}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className={styles.summaryDivider}></div>
          <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <button 
            className={`btn btn-primary ${styles.checkoutBtn}`}
            onClick={() => router.push('/checkout')}
          >
            Proceed to Checkout
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
