import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart()
  const navigate = useNavigate()

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#FAF8FC] px-4">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm border border-purple-light mb-6">
          <ShoppingBag className="w-10 h-10 text-purple-lavender" />
        </div>
        <h2 className="text-3xl font-serif text-purple-deep mb-3">Your cart is empty</h2>
        <p className="text-text-secondary mb-8 text-center max-w-md text-lg">
          Looks like you haven't added any personalized gifts to your cart yet.
        </p>
        <Link to="/shop" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-[#FAF8FC] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif text-purple-deep mb-8 border-b border-purple-light/50 pb-6">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 space-y-6">
            {cart.map((item) => (
              <div key={item.cartItemId} className="bg-white p-6 rounded-3xl border border-purple-light shadow-sm flex flex-col sm:flex-row items-start gap-6">
                <div className="w-32 h-32 bg-purple-50 rounded-2xl overflow-hidden flex-shrink-0 border border-purple-light/50">
                  <img 
                    src={item.product.images?.[0] || 'https://images.unsplash.com/photo-1607344645866-009c320b63e0'} 
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="text-xs font-bold text-purple-accent uppercase tracking-widest mb-1">{item.product.categoryName}</p>
                      <h3 className="text-xl font-serif font-bold text-purple-deep"><Link to={`/product/${item.product.slug}`}>{item.product.name}</Link></h3>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-purple-primary font-bold text-lg mb-3">₹{item.finalPrice}</p>
                  
                  {/* Selected Customizations */}
                  {Object.keys(item.customizations).filter(k => item.customizations[k]).length > 0 && (
                    <div className="text-sm text-text-secondary mb-4 bg-purple-50/50 p-3 rounded-xl border border-purple-light/50">
                      <span className="font-bold text-purple-deep block mb-1">Included Customizations:</span>
                      <ul className="list-disc pl-5 space-y-1">
                        {item.product.customizationOptions?.filter(opt => item.customizations[opt.id]).map(opt => (
                          <li key={opt.id}>{opt.name} {opt.price > 0 && <span className="text-purple-accent font-medium">(+₹{opt.price})</span>}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4 mt-auto pt-2">
                    <div className="flex items-center border border-purple-lavender rounded-xl overflow-hidden bg-white">
                      <button 
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        className="px-4 py-2 text-purple-deep hover:bg-purple-light transition-colors font-bold"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 text-purple-deep font-bold min-w-[3rem] text-center border-x border-purple-light">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        className="px-4 py-2 text-purple-deep hover:bg-purple-light transition-colors font-bold"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[400px] flex-shrink-0">
            <div className="bg-white p-8 rounded-3xl border border-purple-light shadow-sm sticky top-24">
              <h3 className="text-2xl font-serif text-purple-deep mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-text-secondary">
                  <span>Subtotal ({cart.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                  <span className="font-medium text-purple-deep">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded text-sm">Calculated at checkout</span>
                </div>
                <div className="border-t border-purple-light/50 pt-4 mt-4 flex justify-between font-bold text-xl text-purple-deep">
                  <span>Total</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>
              
              <div className="bg-purple-light/30 p-5 rounded-2xl border border-purple-light mb-8">
                <p className="text-sm text-text-secondary text-center">
                  ⏰ <strong>Friendly Reminder:</strong> Customized orders must be placed at least <strong>20 days</strong> prior to your delivery date.
                </p>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="btn-primary w-full flex items-center justify-center text-lg shadow-md"
              >
                Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

