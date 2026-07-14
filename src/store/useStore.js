import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      user: null, // { id, email, role }
      cart: [], // { product, quantity }
      
      login: (user) => set({ user }),
      logout: () => set({ user: null, cart: [] }),
      
      addToCart: (product) => set((state) => {
        const existingItem = state.cart.find(item => item.product.id === product.id);
        if (existingItem) {
          return {
            cart: state.cart.map(item => 
              item.product.id === product.id 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            )
          };
        }
        return { cart: [...state.cart, { product, quantity: 1 }] };
      }),
      
      removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter(item => item.product.id !== productId)
      })),
      
      updateQuantity: (productId, quantity) => set((state) => ({
        cart: state.cart.map(item => 
          item.product.id === productId 
            ? { ...item, quantity: Math.max(1, quantity) } 
            : item
        )
      })),
      
      clearCart: () => set({ cart: [] }),
    }),
    { name: 'ecommerce-store' }
  )
);
