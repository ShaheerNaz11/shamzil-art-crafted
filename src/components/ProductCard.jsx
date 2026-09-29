import { Link } from 'react-router-dom'
import { Heart, Star } from 'lucide-react'

export default function ProductCard({ product }) {
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="card group relative bg-white flex flex-col h-full">
      {/* Image container */}
      <div className="relative overflow-hidden aspect-square bg-purple-50">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 items-start">
          {product.bestseller && (
            <span className="bg-purple-primary text-white text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-sm shadow-sm">
              Bestseller
            </span>
          )}
          {discount > 0 && (
            <span className="bg-purple-accent text-white text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-sm shadow-sm">
              {discount}% OFF
            </span>
          )}
          {product.customizationAvailable && (
            <span className="bg-white/90 backdrop-blur text-purple-deep text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-sm shadow-sm">
              ✨ Customizable
            </span>
          )}
        </div>
        
        {/* Wishlist button */}
        <button className="absolute top-3 right-3 bg-white/90 p-2 rounded-full text-purple-deep hover:text-purple-accent hover:bg-white transition-colors shadow-sm z-10">
          <Heart className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <p className="text-[10px] font-bold text-purple-accent uppercase tracking-widest">
            {product.categoryName}
          </p>
          <div className="flex items-center text-xs font-medium text-gray-500">
            <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
            {product.rating}
          </div>
        </div>
        
        <h3 className="text-lg font-serif font-semibold text-text-main mb-2 line-clamp-1">
          {product.name}
        </h3>
        
        <div className="mt-auto mb-4 flex items-center gap-2">
          <span className="font-bold text-lg text-purple-deep">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
          )}
        </div>
        
        <Link 
          to={`/product/${product.slug}`}
          className="block w-full text-center py-2.5 px-4 bg-purple-light text-purple-deep font-bold rounded-full hover:bg-purple-accent hover:text-white transition-colors duration-300 text-sm tracking-wide"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
