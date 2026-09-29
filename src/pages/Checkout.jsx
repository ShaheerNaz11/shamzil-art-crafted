import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { CheckCircle, AlertTriangle, ShieldCheck, MapPin, Edit2, Plus } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { addDays, format, differenceInDays, parseISO } from 'date-fns'
import { supabase } from '../lib/supabase'

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart()
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/account') // Redirect to Account page where the auth form is located
    }
  }, [isAuthenticated, isLoading, navigate])

  // Persist addresses in localStorage
  const [savedAddresses, setSavedAddresses] = useState(() => {
    const saved = localStorage.getItem('crafted_addresses')
    if (saved) return JSON.parse(saved)
    return []
  })

  const [selectedAddressId, setSelectedAddressId] = useState(savedAddresses.length > 0 ? savedAddresses[0].id : 'new')
  const [isEditingAddress, setIsEditingAddress] = useState(savedAddresses.length === 0)

  useEffect(() => {
    localStorage.setItem('crafted_addresses', JSON.stringify(savedAddresses))
  }, [savedAddresses])

  const [formData, setFormData] = useState({ 
    fullName: '', phone: '', email: '', address: '', city: '', state: '', pinCode: '',
    deliveryDate: '', specialInstructions: '',
    ...(savedAddresses.length > 0 ? savedAddresses[0] : {})
  })

  const [dateError, setDateError] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState(null)

  // Minimum date is exactly 20 days from today
  const minDeliveryDate = addDays(new Date(), 20)
  const minDateString = format(minDeliveryDate, 'yyyy-MM-dd')

  const handleAddressSelect = (addr) => {
    setSelectedAddressId(addr.id)
    setFormData(prev => ({ ...prev, ...addr }))
    setIsEditingAddress(false)
  }

  const handleAddNewAddress = () => {
    setSelectedAddressId('new')
    setFormData({
      fullName: '', phone: '', email: '', address: '', city: '', state: '', pinCode: '',
      deliveryDate: formData.deliveryDate, specialInstructions: formData.specialInstructions
    })
    setIsEditingAddress(true)
  }

  const saveAddress = () => {
    // Basic validation
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city || !formData.pinCode) {
      alert('Please fill all required address fields.')
      return
    }

    if (selectedAddressId === 'new') {
      const newAddr = { ...formData, id: 'addr_' + Date.now() }
      setSavedAddresses([...savedAddresses, newAddr])
      setSelectedAddressId(newAddr.id)
    } else {
      setSavedAddresses(savedAddresses.map(a => a.id === selectedAddressId ? { ...formData, id: selectedAddressId } : a))
    }
    setIsEditingAddress(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    if (name === 'deliveryDate') {
      const selectedDate = parseISO(value)
      const diff = differenceInDays(selectedDate, new Date())
      if (diff < 20) {
        setDateError('Please select a delivery date at least 20 days from today.')
      } else {
        setDateError('')
      }
    }
  }

  const handleCheckout = async (e) => {
    e.preventDefault()
    if (dateError) return

    const selectedDate = parseISO(formData.deliveryDate)
    if (differenceInDays(selectedDate, new Date()) < 20) {
      setDateError('Please select a delivery date at least 20 days from today.')
      return
    }

    setIsProcessing(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // In a real flow, we'd save checkout details (address/date) in context or DB
      // before navigating to payment processing.
      navigate('/payment')
    } catch (error) {
      console.error("Checkout failed", error)
    } finally {
      setIsProcessing(false)
    }
  }

  if (cart.length === 0 && !orderConfirmed) {
    navigate('/shop')
    return null
  }

  if (orderConfirmed) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#faf5ff] px-4 py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-4xl font-serif text-[#2e1065] mb-4">🎉 Order Confirmed!</h1>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[var(--border)] max-w-lg w-full mb-8 text-center">
          <p className="text-gray-500 mb-6">Thank you for your order. We are starting to craft your personalized gift with immense love.</p>

          <div className="space-y-3 mb-8 text-left bg-purple-50 p-4 rounded-xl">
            <div className="flex justify-between">
              <span className="text-gray-500">Order ID:</span>
              <span className="font-medium text-[#2e1065]">#{orderConfirmed.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Amount Paid:</span>
              <span className="font-medium text-[#2e1065]">₹{orderConfirmed.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Delivery By:</span>
              <span className="font-medium text-[#2e1065]">{format(parseISO(orderConfirmed.date), 'dd MMM yyyy')}</span>
            </div>
            <div className="flex justify-between border-t border-purple-100 pt-2 mt-2">
              <span className="text-gray-500">Shipping To:</span>
              <span className="font-medium text-[#2e1065] text-right">{orderConfirmed.address.fullName}<br />{orderConfirmed.address.city}, {orderConfirmed.address.pinCode}</span>
            </div>
          </div>

          <Link to="/" className="btn-accent w-full block text-center">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#faf5ff] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif text-[#2e1065] mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="flex-1">
            <form onSubmit={handleCheckout} className="space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-[var(--border)] shadow-sm">

              {/* Amazon Style Address Selection */}
              <div>
                <div className="flex justify-between items-center mb-4 pb-2 border-b">
                  <h2 className="text-xl font-medium text-[#2e1065]">1. Delivery Address</h2>
                </div>

                {!isEditingAddress ? (
                  <div className="space-y-4">
                    {savedAddresses.map(addr => (
                      <div
                        key={addr.id}
                        onClick={() => handleAddressSelect(addr)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start ${selectedAddressId === addr.id ? 'border-[#9333ea] bg-purple-50' : 'border-gray-200 hover:border-[#d8b4fe]'}`}
                      >
                        <div className="mt-1 mr-3">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedAddressId === addr.id ? 'border-[#9333ea]' : 'border-gray-300'}`}>
                            {selectedAddressId === addr.id && <div className="w-2 h-2 bg-[#9333ea] rounded-full"></div>}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-[#2e1065]">{addr.fullName}</p>
                          <p className="text-sm text-gray-600 mt-1">{addr.address}, {addr.city}, {addr.state} {addr.pinCode}</p>
                          <p className="text-sm text-gray-600">Phone: {addr.phone}</p>
                        </div>
                        {selectedAddressId === addr.id && (
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setIsEditingAddress(true); }}
                            className="text-[#9333ea] hover:text-[#7e22ce] text-sm flex items-center font-medium"
                          >
                            <Edit2 className="w-4 h-4 mr-1" /> Edit
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={handleAddNewAddress}
                      className="flex items-center text-[#9333ea] hover:text-[#7e22ce] font-medium p-2"
                    >
                      <Plus className="w-5 h-5 mr-1" /> Add a new address
                    </button>
                  </div>
                ) : (
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-[#2e1065]">Edit Delivery Details</h3>
                      <button type="button" onClick={() => setIsEditingAddress(false)} className="text-sm text-gray-500 hover:text-gray-800">Cancel</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label className="block text-sm text-gray-700 mb-1">Full Name</label><input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="input-field bg-white" /></div>
                      <div><label className="block text-sm text-gray-700 mb-1">Phone Number</label><input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input-field bg-white" /></div>
                      <div className="md:col-span-2"><label className="block text-sm text-gray-700 mb-1">Email</label><input required type="email" name="email" value={formData.email} onChange={handleChange} className="input-field bg-white" /></div>
                      <div className="md:col-span-2"><label className="block text-sm text-gray-700 mb-1">Full Address</label><input required type="text" name="address" value={formData.address} onChange={handleChange} className="input-field bg-white" /></div>
                      <div><label className="block text-sm text-gray-700 mb-1">City</label><input required type="text" name="city" value={formData.city} onChange={handleChange} className="input-field bg-white" /></div>
                      <div><label className="block text-sm text-gray-700 mb-1">PIN Code</label><input required type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} className="input-field bg-white" /></div>
                    </div>
                    <button type="button" onClick={saveAddress} className="mt-4 btn-accent text-sm py-2 px-4">Use & Save this address</button>
                  </div>
                )}
              </div>

              {/* Delivery Validation Rules */}
              <div>
                <h2 className="text-xl font-medium text-[#2e1065] mb-4 pb-2 border-b">2. Delivery & Customization</h2>
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 mb-6 flex items-start">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-[#2e1065]">Critical Notice</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Because our gifts are 100% handcrafted, you must select a delivery date that is <strong>at least 20 days from today</strong>.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-700 mb-1">Required Delivery Date <span className="text-red-500">*</span></label>
                    <input
                      required
                      type="date"
                      name="deliveryDate"
                      min={minDateString}
                      value={formData.deliveryDate}
                      onChange={handleChange}
                      className={`input-field ${dateError ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {dateError && <p className="text-red-500 text-xs mt-1">{dateError}</p>}
                    <p className="text-xs text-gray-500 mt-1">Earliest available date: {format(minDeliveryDate, 'dd MMM yyyy')}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-700 mb-1">Special Instructions / Custom Message</label>
                    <textarea
                      name="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={handleChange}
                      className="input-field min-h-[100px]"
                      placeholder="Enter the name to be printed, occasion, color themes, or any other requests..."
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="border-t border-[var(--border)] pt-6">
                <button
                  type="submit"
                  disabled={!!dateError || isProcessing || isEditingAddress}
                  className={`w-full py-4 rounded-full font-medium text-white shadow-md transition-all ${dateError || isProcessing || isEditingAddress ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#9333ea] hover:bg-[#7e22ce] hover:shadow-lg'
                    }`}
                >
                  {isProcessing ? 'Processing...' : `Proceed to Payment (Phase 6)`}
                </button>
                <div className="flex items-center justify-center text-xs text-gray-500 mt-4">
                  <ShieldCheck className="w-4 h-4 mr-1 text-green-600" />
                  Development Payment Mode (No real money charged)
                </div>
              </div>
            </form>
          </div>

          {/* Cart Summary */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-white p-6 rounded-2xl border border-[var(--border)] shadow-sm sticky top-24">
              <h3 className="text-lg font-medium text-[#2e1065] mb-4 pb-2 border-b">Order Summary</h3>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                      <img src={item.product.product_images?.[0]?.url || 'https://images.unsplash.com/photo-1607344645866-009c320b63e0'} alt="product" className="w-full h-full object-cover" />
                      <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="font-medium text-[#2e1065]">{item.product.name}</p>
                      <p className="text-gray-500 text-xs">Customized</p>
                      <p className="font-medium text-[#9333ea] mt-1">₹{item.finalPrice}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 pt-4 border-t border-[var(--border)]">
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Shipping</span>
                  <span className="text-green-600">Free Delivery</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-[#2e1065] pt-2 border-t border-[var(--border)]">
                  <span>Total Amount</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>

              <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                <p className="text-xs text-gray-600 text-center font-medium">
                  🚫 No Cash on Delivery. 100% advance payment required for customization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
