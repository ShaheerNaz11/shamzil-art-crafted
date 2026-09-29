import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { productService } from '../services/productService'

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await productService.getCategories()
        setCategories(data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8FC]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-primary"></div>
      </div>
    )
  }

  return (
    <div className="bg-[#FAF8FC] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-purple-deep mb-4">Our Collections</h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto italic">
            "Crafting Your Moments, Creating Your Memories." Explore our handcrafted premium categories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link 
              key={category.id || category.slug || index} 
              to={`/shop?category=${category.slug}`}
              className="group relative rounded-3xl overflow-hidden bg-white shadow-sm border border-purple-light hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden bg-purple-50">
                <img 
                  src={category.image || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop'} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/80 via-purple-deep/20 to-transparent"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <div>
                  <h3 className="text-2xl font-serif text-white mb-1">{category.name}</h3>
                  <p className="text-purple-lavender text-sm max-w-[200px] line-clamp-2">
                    {category.description || 'Premium handcrafted gifts for your special moments.'}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-purple-primary group-hover:scale-110 transition-all">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
