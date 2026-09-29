import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { ShieldCheck, Upload, Image as ImageIcon, QrCode } from 'lucide-react'

export default function Payment() {
  const { cartTotal, clearCart } = useCart()
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [transactionId, setTransactionId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const BUSINESS_UPI_ID = import.meta.env.VITE_BUSINESS_UPI_ID || 'shamzilart@upi'

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/account')
    }
  }, [isAuthenticated, isLoading, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!transactionId.trim()) {
      setError('Please enter a valid UPI Transaction ID / UTR.')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      // In a real scenario, this would create the order & payment records in Supabase
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const mockOrderId = `SAC-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`
      
      clearCart()
      navigate(`/payment-pending/${mockOrderId}`)
    } catch (err) {
      setError('Failed to submit payment details. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-[#FAF8FC] min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-3xl border border-purple-light shadow-sm">
          <div className="text-center border-b border-purple-light pb-6 mb-6">
            <h1 className="text-3xl font-serif text-purple-deep mb-2">Payment</h1>
            <p className="text-text-secondary">Advance Payment Required</p>
            <div className="mt-4 text-4xl font-bold text-purple-primary">
              ₹{cartTotal}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h2 className="text-xl font-medium text-purple-deep mb-4">Payment Method</h2>
              <div className="flex gap-4">
                <label className={`flex-1 border-2 p-4 rounded-xl cursor-pointer flex items-center justify-center transition-all ${paymentMethod === 'upi' ? 'border-purple-primary bg-purple-50' : 'border-gray-200 hover:border-purple-light'}`}>
                  <input type="radio" name="method" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="hidden" />
                  <span className="font-medium text-purple-deep">UPI / GPay</span>
                </label>
              </div>
            </div>

            <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-light/50 text-center">
              <QrCode className="w-16 h-16 text-purple-primary mx-auto mb-4" />
              <p className="text-sm text-text-secondary mb-2">Scan QR Code or pay via UPI ID</p>
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-purple-light shadow-sm">
                <span className="font-bold text-purple-deep">{BUSINESS_UPI_ID}</span>
                <button type="button" onClick={() => navigator.clipboard.writeText(BUSINESS_UPI_ID)} className="text-xs text-purple-accent hover:text-purple-primary">Copy</button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">UPI Transaction ID / UTR <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="e.g. 31234567890" 
                  className="input-field" 
                  required 
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Payment Screenshot (Optional)</label>
                <div className="border-2 border-dashed border-purple-light rounded-xl p-6 text-center hover:bg-purple-50 transition-colors cursor-pointer">
                  <ImageIcon className="w-8 h-8 text-purple-lavender mx-auto mb-2" />
                  <p className="text-sm text-text-secondary">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                </div>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="border-t border-purple-light pt-6">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-primary w-full py-4 text-lg"
              >
                {isSubmitting ? 'Submitting Details...' : 'Submit Payment Details'}
              </button>
              <div className="flex items-center justify-center text-xs text-gray-500 mt-4">
                <ShieldCheck className="w-4 h-4 mr-1 text-green-600" />
                Secure verification process
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
