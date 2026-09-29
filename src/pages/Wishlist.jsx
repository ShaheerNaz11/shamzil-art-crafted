import { Link } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/ProductCard'

export default function Wishlist() {
  const { wishlist } = useWishlist()

  if (wishlist.length === 0) {
    return (
      <div className="bg-[#faf5ff] min-h-[70vh] flex flex-col items-center justify-center px-4">
        <Heart className="w-20 h-20 text-purple-200 mb-6" />
        <h1 className="text-3xl font-serif text-[#2e1065] mb-4">Your Wishlist is Empty</h1>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Save items you love here to easily find them later. Browse our collection to start adding!
        </p>
        <Link to="/shop" className="btn-primary flex items-center">
          <ShoppingBag className="w-5 h-5 mr-2" /> Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-[#faf5ff] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <h1 className="text-3xl font-serif text-[#2e1065]">My Wishlist</h1>
          <span className="ml-4 bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
            {wishlist.length} Items
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
