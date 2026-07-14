'use client';

import Image from 'next/image';
import { useStore } from '../store/useStore';
import { ShoppingCart } from 'lucide-react';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const addToCart = useStore((state) => state.addToCart);

  return (
    <div className={`glass ${styles.card}`}>
      <div className={styles.imageContainer}>
        {product.imageUrl ? (
          <Image 
            src={product.imageUrl} 
            alt={product.name} 
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 300px"
          />
        ) : (
          <div className={styles.placeholder}>No Image</div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{product.name}</h3>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
        </div>
        <p className={styles.description}>{product.description}</p>
        <button 
          className={`btn btn-primary ${styles.addToCart}`}
          onClick={() => addToCart(product)}
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
