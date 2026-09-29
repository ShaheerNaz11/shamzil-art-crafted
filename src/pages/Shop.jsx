import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Filter, Search, ChevronDown, X } from 'lucide-react'
import { productService } from '../services/productService'
import ProductCard from '../components/ProductCard'

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryFilter = searchParams.get('category') || 'all'
  const sortFilter = searchParams.get('sort') || 'recommended'

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  
  // Mobile filter state
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const [cats, prods] = await Promise.all([
          productService.getCategories(),
          productService.getProducts()
        ])
        setCategories(cats)
        setProducts(prods)
      } catch (error) {
        console.error("Error fetching shop data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Derived state for filtering and sorting
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products]

    // 1. Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.categoryName.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      )
    }

    // 2. Category Filter
    if (categoryFilter !== 'all') {
      result = result.filter(p => p.category === categoryFilter)
    }

    // 3. Sorting
    switch (sortFilter) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'popular':
        result.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      default: // recommended (fallback to default array order or featured first)
        result.sort((a, b) => (b.featured === a.featured) ? 0 : b.featured ? 1 : -1)
        break
    }

    return result
  }, [products, categoryFilter, searchQuery, sortFilter])

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    if (e.target.value) {
      searchParams.set('search', e.target.value)
    } else {
      searchParams.delete('search')
    }
    setSearchParams(searchParams)
  }

  const handleCategoryChange = (slug) => {
    if (slug === 'all') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', slug)
    }
    setSearchParams(searchParams)
  }

  const handleSortChange = (e) => {
    searchParams.set('sort', e.target.value)
    setSearchParams(searchParams)
  }

  return (
    <div className="bg-[#FAF8FC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-purple-light/50 pb-8">
          <div>
            <h1 className="text-4xl font-serif text-purple-deep mb-4">Find Something Special</h1>
            <p className="text-text-secondary text-lg">Explore our collection of handcrafted and personalized gifts.</p>
          </div>
          
          <div className="mt-6 md:mt-0 flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <input
                type="text"
                placeholder="Search gifts..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-3 rounded-full border border-purple-light/50 bg-white focus:outline-none focus:ring-2 focus:ring-purple-accent/50 transition-all shadow-sm"
              />
              <Search className="w-5 h-5 text-purple-accent absolute left-3.5 top-3.5" />
            </div>
            
            {/* Mobile filter toggle */}
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden bg-white p-3 rounded-full border border-purple-light shadow-sm text-purple-deep"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sidebar / Filters */}
          <div className={`w-full md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white p-6 rounded-2xl border border-purple-light/50 shadow-sm sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-purple-deep flex items-center">
                  <Filter className="w-4 h-4 mr-2" /> Categories
                </h3>
                <button className="md:hidden text-gray-400 hover:text-purple-accent" onClick={() => setShowFilters(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li>
                  <button
                    onClick={() => handleCategoryChange('all')}
                    className={`w-full text-left transition-colors font-medium text-sm ${categoryFilter === 'all' ? 'text-purple-accent' : 'text-text-secondary hover:text-purple-accent'}`}
                  >
                    All Gifts <span className="float-right text-xs opacity-60">({products.length})</span>
                  </button>
                </li>
                {categories.map(cat => {
                  const count = products.filter(p => p.category === cat.slug).length
                  return (
                    <li key={cat.id}>
                      <button
                        onClick={() => handleCategoryChange(cat.slug)}
                        className={`w-full text-left transition-colors font-medium text-sm ${categoryFilter === cat.slug ? 'text-purple-accent' : 'text-text-secondary hover:text-purple-accent'}`}
                      >
                        {cat.name} <span className="float-right text-xs opacity-60">({count})</span>
                      </button>
                    </li>
                  )
                })}
              </ul>

              <h3 className="font-bold text-lg text-purple-deep mb-4 flex items-center">
                Sort By
              </h3>
              <div className="relative">
                <select 
                  value={sortFilter}
                  onChange={handleSortChange}
                  className="w-full appearance-none bg-purple-50 border border-purple-100 text-purple-deep py-2.5 pl-4 pr-10 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-purple-accent/30 text-sm"
                >
                  <option value="recommended">Recommended</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="popular">Popular</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-purple-accent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Product Grid Area */}
          <div className="flex-1 w-full">
            <div className="mb-6 flex justify-between items-center text-sm text-text-secondary">
              <span>Showing <strong>{filteredAndSortedProducts.length}</strong> products</span>
              {searchQuery && (
                <button onClick={() => handleSearch({target: {value: ''}})} className="text-purple-accent hover:underline flex items-center">
                  Clear Search <X className="w-3 h-3 ml-1" />
                </button>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                  <div key={n} className="animate-pulse bg-white rounded-2xl p-4 border border-purple-50">
                    <div className="bg-purple-100 h-48 rounded-xl mb-4"></div>
                    <div className="bg-purple-100 h-4 w-3/4 mb-2 rounded"></div>
                    <div className="bg-purple-100 h-4 w-1/4 mb-4 rounded"></div>
                    <div className="bg-purple-100 h-10 w-full rounded-full"></div>
                  </div>
                ))}
              </div>
            ) : filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-purple-light shadow-sm">
                <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-purple-accent" />
                </div>
                <h3 className="text-2xl font-serif text-purple-deep mb-2">We couldn't find that gift.</h3>
                <p className="text-text-secondary mb-8">Try another search or explore our categories.</p>
                <button 
                  onClick={() => {
                    handleSearch({target: {value: ''}})
                    handleCategoryChange('all')
                  }}
                  className="btn-primary inline-flex"
                >
                  View All Gifts
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

