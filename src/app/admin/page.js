'use client';

import { useStore } from '../../store/useStore';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const { user } = useStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: ''
  });

  useEffect(() => {
    setMounted(true);
    if (mounted && (!user || user.role !== 'ADMIN')) {
      router.push('/');
    } else if (mounted) {
      fetchProducts();
    }
  }, [user, mounted, router]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setShowForm(false);
        setFormData({ name: '', description: '', price: '', stock: '', imageUrl: '' });
        fetchProducts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!mounted || !user || user.role !== 'ADMIN') return null;

  return (
    <div className={`animate-fade-in ${styles.adminContainer}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={18} />
          {showForm ? 'Cancel' : 'Add Product'}
        </button>
      </div>

      {showForm && (
        <div className={`glass ${styles.formContainer}`}>
          <h2 className={styles.formTitle}>Add New Product</h2>
          <form onSubmit={handleAddProduct} className={styles.form}>
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Name</label>
                <input 
                  type="text" 
                  required 
                  className={styles.input} 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Price</label>
                <input 
                  type="number" 
                  step="0.01"
                  required 
                  className={styles.input} 
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                />
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label>Description</label>
              <textarea 
                required 
                className={styles.input} 
                rows="3"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>
            
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Image URL</label>
                <input 
                  type="url" 
                  className={styles.input} 
                  value={formData.imageUrl}
                  onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Stock</label>
                <input 
                  type="number" 
                  required 
                  className={styles.input} 
                  value={formData.stock}
                  onChange={e => setFormData({...formData, stock: e.target.value})}
                />
              </div>
            </div>
            
            <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
              Save Product
            </button>
          </form>
        </div>
      )}

      <div className={`glass ${styles.tableContainer}`}>
        <h2 className={styles.tableTitle}>Product Catalog</h2>
        {loading ? (
          <p className={styles.loading}>Loading products...</p>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>
                      <div className={styles.productCell}>
                        {product.imageUrl && (
                          <img src={product.imageUrl} alt="" className={styles.thumb} />
                        )}
                        <span>{product.name}</span>
                      </div>
                    </td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>{product.stock}</td>
                    <td>
                      <button className={styles.editBtn}>Edit</button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan="4" className={styles.emptyTable}>No products found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
