import { createContext, useState, useEffect, useContext } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('crafted_cart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  useEffect(() => {
    localStorage.setItem('crafted_cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, customizations, finalPrice, quantity = 1) => {
    setCart(prev => {
      // Create a unique ID based on product and customizations
      const cartItemId = `${product.id}-${JSON.stringify(customizations)}`
      const existingItemIndex = prev.findIndex(item => item.cartItemId === cartItemId)
      
      if (existingItemIndex >= 0) {
        const newCart = [...prev]
        newCart[existingItemIndex].quantity += quantity
        return newCart
      }
      
      return [...prev, { cartItemId, product, customizations, finalPrice, quantity }]
    })
  }

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId))
  }

  const updateQuantity = (cartItemId, change) => {
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQuantity = Math.max(1, item.quantity + change)
        return { ...item, quantity: newQuantity }
      }
      return item
    }))
  }

  const clearCart = () => setCart([])

  const cartTotal = cart.reduce((total, item) => total + (item.finalPrice * item.quantity), 0)
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
