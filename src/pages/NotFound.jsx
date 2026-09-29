import { Link } from 'react-router-dom'
import { SearchX } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FAF8FC] px-4 py-12">
      <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-6 shadow-sm border border-purple-200">
        <SearchX className="w-12 h-12 text-purple-primary" />
      </div>
      <h1 className="text-4xl font-serif text-purple-deep mb-4 text-center">Page Not Found</h1>
      
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-purple-light max-w-lg w-full mb-8 text-center">
        <p className="text-text-secondary mb-8 text-lg">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="space-y-4">
          <Link to="/" className="btn-primary w-full block text-center">
            Back to Home
          </Link>
          <Link to="/shop" className="btn-secondary w-full block text-center border border-purple-primary text-purple-primary hover:bg-purple-50">
            Explore Gifts
          </Link>
        </div>
      </div>
    </div>
  )
}
