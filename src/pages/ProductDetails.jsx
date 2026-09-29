import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, Star, Heart, ShieldCheck, Truck, Gift, ShoppingBag, ShoppingCart } from 'lucide-react'
import { productService } from '../services/productService'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/ProductCard'
import { motion } from 'framer-motion'

export default function ProductDetails() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [selectedOptions, setSelectedOptions] = useState({})
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    async function fetchProductData() {
      setLoading(true)
      try {
        const prodData = await productService.getProductBySlug(slug)
        if (prodData) {
          setProduct(prodData)
          
          // Fetch related products
          const related = await productService.getRelatedProducts(prodData.id)
          setRelatedProducts(related)

          // Handle Recently Viewed in localStorage
          const recentlyViewed = JSON.parse(localStorage.getItem('crafted_recently_viewed') || '[]')
          const updatedViewed = [prodData.id, ...recentlyViewed.filter(id => id !== prodData.id)].slice(0, 6)
          localStorage.setItem('crafted_recently_viewed', JSON.stringify(updatedViewed))
        } else {
          setProduct(null)
        }
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProductData()
  }, [slug])

  const calculateTotal = () => {
    if (!product) return 0
    let total = product.price
    product.customizationOptions?.forEach(opt => {
      if (selectedOptions[opt.id]) {
        total += opt.price
      }
    })
    return total
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8FC] pt-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 animate-pulse">
          <div className="w-full lg:w-1/2 h-96 bg-purple-100 rounded-3xl"></div>
          <div className="w-full lg:w-1/2 space-y-4">
            <div className="h-6 w-32 bg-purple-100 rounded"></div>
            <div className="h-12 w-3/4 bg-purple-100 rounded"></div>
            <div className="h-8 w-1/4 bg-purple-100 rounded"></div>
            <div className="h-24 w-full bg-purple-100 rounded mt-8"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="bg-[#FAF8FC] min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-3xl font-serif text-purple-deep mb-4">Product Not Found</h2>
        <p className="text-text-secondary mb-8">This gift might have been removed or is currently unavailable.</p>
        <Link to="/shop" className="btn-primary">Explore All Gifts</Link>
      </div>
    )
  }

  const inWishlist = isInWishlist(product.id)
  const toggleWishlist = () => {
    inWishlist ? removeFromWishlist(product.id) : addToWishlist(product)
  }

  return (
    <div className="bg-[#FAF8FC] min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-purple-light/50 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center text-sm font-medium text-text-secondary">
          <Link to="/" className="hover:text-purple-primary transition-colors">Home</Link>
          <span className="mx-3 text-purple-200">/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-purple-primary transition-colors">{product.categoryName}</Link>
          <span className="mx-3 text-purple-200">/</span>
          <span className="text-purple-deep">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          
          {/* Image Gallery */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:w-1/2 flex flex-col gap-4">
            <div className="bg-white p-2 rounded-3xl shadow-sm border border-purple-light/50 overflow-hidden relative">
              <span className="absolute top-6 left-6 bg-white/90 backdrop-blur text-purple-accent px-4 py-1.5 rounded-full text-xs font-bold shadow-sm z-10 tracking-widest uppercase">
                Handcrafted
              </span>
              <button 
                onClick={toggleWishlist}
                className="absolute top-6 right-6 bg-white/90 backdrop-blur p-2.5 rounded-full shadow-sm transition-colors z-10"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-purple-accent text-purple-accent' : 'text-gray-400 hover:text-purple-accent'}`} />
              </button>
              <img
                key={activeImage}
                src={product.images[activeImage]} 
                alt={product.name}
                className="w-full h-auto rounded-2xl object-cover aspect-square"
              />
            </div>
            
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx} onClick={() => setActiveImage(idx)}
                    className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-purple-accent opacity-100 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:w-1/2 flex flex-col">
            <div className="flex items-center text-purple-accent mb-3 text-sm font-bold tracking-widest uppercase">
              {product.categoryName}
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-serif text-purple-deep mb-4 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center flex-wrap gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <span className="text-3xl text-purple-primary font-bold">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-text-secondary line-through">₹{product.originalPrice}</span>
                )}
              </div>
              <div className="flex items-center text-yellow-500 bg-yellow-50 px-3 py-1 rounded-full text-sm font-bold">
                <Star className="w-4 h-4 fill-current mr-1" /> {product.rating} <span className="text-gray-500 font-normal ml-1">({product.reviewCount} Reviews)</span>
              </div>
              
              <div className={`px-3 py-1 rounded-full text-sm font-bold ${product.stock > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                {product.stock > 0 ? 'In Stock' : 'Currently Unavailable'}
              </div>
            </div>

            <p className="text-text-secondary mb-8 leading-relaxed text-lg">
              {product.shortDescription}
            </p>

            {/* Preparation Details */}
            <div className="bg-purple-light/30 p-5 rounded-2xl border border-purple-light flex items-start mb-8 shadow-sm">
              <Truck className="w-6 h-6 text-purple-accent mr-4 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-purple-deep mb-1">⏰ Made To Order</h4>
                <p className="text-sm text-text-secondary">
                  Estimated preparation: <strong>{product.preparationDays}+ days</strong>. Please place customized orders well before your required delivery date.
                </p>
              </div>
            </div>

            {/* Customization Preview UI */}
            {product.customizationAvailable && product.customizationOptions?.length > 0 && (
              <div className="mb-10 flex-1">
                <h3 className="text-xl font-bold text-purple-deep mb-4 flex items-center">
                  Make It Yours ✨
                </h3>
                <div className="space-y-4">
                  {product.customizationOptions.map(opt => (
                    <label key={opt.id} className={`flex items-start justify-between p-5 rounded-xl border-2 transition-all cursor-pointer ${selectedOptions[opt.id] ? 'bg-purple-light/20 border-purple-accent' : 'bg-white border-purple-light hover:border-purple-lavender'}`}>
                      <div className="flex flex-col">
                        <span className={`font-bold ${selectedOptions[opt.id] ? 'text-purple-accent' : 'text-text-main'}`}>{opt.name}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        {opt.price > 0 && (
                          <span className="font-bold text-purple-accent bg-white px-2 py-1 rounded border border-purple-light text-sm">
                            +₹{opt.price}
                          </span>
                        )}
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${selectedOptions[opt.id] ? 'bg-purple-accent border-purple-accent' : 'border-gray-300'}`}>
                          {selectedOptions[opt.id] && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="bg-white p-6 rounded-3xl border border-purple-light shadow-md mt-auto flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-text-secondary text-sm font-medium">Total Price</span>
                <div className="text-3xl font-bold text-purple-deep">₹{calculateTotal()}</div>
              </div>
              <div className="flex w-full sm:w-auto gap-3 flex-1 justify-end">
                <button
                  onClick={() => addToCart(product, selectedOptions, calculateTotal())}
                  disabled={product.stock === 0}
                  className="p-4 rounded-xl font-bold text-purple-accent bg-purple-50 hover:bg-purple-light transition-colors border border-purple-lavender disabled:opacity-50"
                  aria-label="Add to Cart"
                >
                  <ShoppingCart className="w-6 h-6" />
                </button>
                <button
                  onClick={() => {
                    addToCart(product, selectedOptions, calculateTotal())
                    navigate('/cart')
                  }}
                  disabled={product.stock === 0}
                  className="px-8 py-4 rounded-xl font-bold text-white bg-purple-primary hover:bg-purple-deep transition-all active:scale-95 flex-1 sm:flex-none shadow-md disabled:opacity-50"
                >
                  Customize & Order
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Information Tabs */}
        <div className="mb-20">
          <div className="flex border-b border-purple-light/50 mb-8 overflow-x-auto no-scrollbar">
            {['description', 'customization', 'details', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-6 font-bold text-sm uppercase tracking-wider whitespace-nowrap transition-colors border-b-2 ${activeTab === tab ? 'border-purple-primary text-purple-primary' : 'border-transparent text-text-secondary hover:text-purple-primary'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="bg-white p-8 rounded-3xl border border-purple-light/50 shadow-sm min-h-[200px]">
            {activeTab === 'description' && (
              <div className="prose prose-purple max-w-none text-text-main">
                <p>{product.description}</p>
                <p className="mt-4">Every piece is crafted with care and personalized with meaning. SHAMZIL ART CRAFTED ensures that your memories are preserved beautifully.</p>
              </div>
            )}
            {activeTab === 'customization' && (
              <div className="text-text-main">
                <h4 className="font-bold mb-4 text-purple-deep">Available Personalization</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Names and special dates</li>
                  <li>Personal photographs (upload during customization step)</li>
                  <li>Custom messages or quotes</li>
                  <li>Color theme preferences</li>
                </ul>
              </div>
            )}
            {activeTab === 'details' && (
              <div className="text-text-main">
                <h4 className="font-bold mb-4 text-purple-deep">Product Details</h4>
                <ul className="space-y-3">
                  <li className="flex"><span className="w-40 font-semibold">Materials:</span> <span className="text-text-secondary">Premium cardstock, faux leather, high-quality prints</span></li>
                  <li className="flex"><span className="w-40 font-semibold">Preparation:</span> <span className="text-text-secondary">{product.preparationDays}+ days</span></li>
                  <li className="flex"><span className="w-40 font-semibold">Category:</span> <span className="text-text-secondary">{product.categoryName}</span></li>
                </ul>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="text-center py-10">
                <Star className="w-12 h-12 text-yellow-400 fill-current mx-auto mb-4" />
                <h3 className="text-2xl font-serif text-purple-deep mb-2">Customer Reviews</h3>
                <p className="text-text-secondary">Reviews feature will be available soon in Phase 3.</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-serif text-purple-deep mb-8 text-center">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map(relProduct => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

