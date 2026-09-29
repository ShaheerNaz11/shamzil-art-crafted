import { useParams, Link } from 'react-router-dom'
import { Clock } from 'lucide-react'

export default function PaymentPending() {
  const { orderId } = useParams()

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FAF8FC] px-4 py-12">
      <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-6 shadow-sm border border-orange-200">
        <Clock className="w-12 h-12 text-orange-500" />
      </div>
      <h1 className="text-4xl font-serif text-purple-deep mb-4 text-center">Payment Submitted</h1>
      
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-purple-light max-w-lg w-full mb-8 text-center">
        <p className="text-text-secondary mb-6 text-lg">
          Your payment details have been submitted for manual verification. We will update your order status once the payment is confirmed.
        </p>

        <div className="space-y-4 mb-8 text-left bg-purple-50/50 p-6 rounded-2xl border border-purple-light/50">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Order Number:</span>
            <span className="font-bold text-purple-deep">{orderId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Payment Status:</span>
            <span className="font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full text-sm border border-orange-100">Verification Pending</span>
          </div>
        </div>

        <Link to="/account" className="btn-primary w-full block text-center mb-3">
          View My Orders
        </Link>
        <Link to="/shop" className="text-purple-accent hover:text-purple-primary font-medium text-sm">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}
