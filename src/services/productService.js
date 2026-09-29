import { supabase } from '../lib/supabase'
import { products as localProducts, categories as localCategories } from '../data/products';

export const productService = {
  getProducts: async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories(name, slug),
          product_images(url, is_primary)
        `)
        .eq('is_active', true)
      
      if (error) throw error
      if (!data || data.length === 0) return localProducts
      
      return data.map(mapProductData)
    } catch (error) {
      console.error('Supabase fetch error:', error)
      return localProducts
    }
  },

  getProductBySlug: async (slug) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories(name, slug),
          product_images(url, is_primary),
          product_customization_options(
            customization_options(*)
          )
        `)
        .eq('slug', slug)
        .eq('is_active', true)
        .single()
        
      if (error || !data) {
        return localProducts.find(p => p.slug === slug)
      }
      return mapProductData(data)
    } catch (error) {
      console.error('Supabase fetch error:', error)
      return localProducts.find(p => p.slug === slug)
    }
  },

  getProductsByCategory: async (categorySlug) => {
    try {
      if (categorySlug === 'all') return productService.getProducts()
      
      const { data: category } = await supabase.from('categories').select('id').eq('slug', categorySlug).single()
      if (!category) return []

      const { data, error } = await supabase
        .from('products')
        .select('*, categories(name, slug), product_images(url, is_primary)')
        .eq('category_id', category.id)
        .eq('is_active', true)
        
      if (error) throw error
      if (!data || data.length === 0) return localProducts.filter(p => p.category === categorySlug)
      
      return data.map(mapProductData)
    } catch (error) {
      console.error('Supabase fetch error:', error)
      if (categorySlug === 'all') return localProducts
      return localProducts.filter(p => p.category === categorySlug)
    }
  },

  searchProducts: async (query) => {
    const products = await productService.getProducts()
    const lowercaseQuery = query.toLowerCase()
    return products.filter(p => 
      p.name.toLowerCase().includes(lowercaseQuery) || 
      p.description.toLowerCase().includes(lowercaseQuery) ||
      (p.tags && p.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)))
    );
  },

  getFeaturedProducts: async () => {
    const products = await productService.getProducts()
    return products.filter(p => p.featured)
  },

  getRelatedProducts: async (productId) => {
    try {
      // For simplicity in UI logic without complex DB relations:
      const allProducts = await productService.getProducts()
      const product = allProducts.find(p => p.id === productId)
      if (!product) return []
      
      return allProducts
        .filter(p => p.id !== productId && (p.category === product.category || (p.tags && product.tags && p.tags.some(tag => product.tags.includes(tag)))))
        .slice(0, 3);
    } catch (error) {
      return []
    }
  },
  
  getCategories: async () => {
    try {
      const { data, error } = await supabase.from('categories').select('*').eq('is_active', true)
      if (error) throw error
      if (!data || data.length === 0) return localCategories
      return data
    } catch (error) {
      console.error('Supabase fetch error:', error)
      return localCategories
    }
  }
};

// Helper function to map Supabase structure to frontend expected structure
function mapProductData(dbProduct) {
  const images = dbProduct.product_images?.map(img => img.url) || []
  if (images.length === 0) images.push('https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=800&auto=format&fit=crop')
  
  const options = dbProduct.product_customization_options?.map(pco => ({
    id: pco.customization_options.id,
    name: pco.customization_options.name,
    price: pco.customization_options.additional_price || 0,
    type: pco.customization_options.option_type
  })) || []

  return {
    id: dbProduct.id,
    name: dbProduct.name,
    slug: dbProduct.slug,
    category: dbProduct.categories?.slug || 'unknown',
    categoryName: dbProduct.categories?.name || 'Unknown',
    description: dbProduct.description,
    shortDescription: dbProduct.short_description || dbProduct.description?.substring(0, 50),
    price: Number(dbProduct.price) || 0,
    originalPrice: dbProduct.original_price ? Number(dbProduct.original_price) : null,
    images: images,
    featured: dbProduct.featured,
    bestseller: dbProduct.bestseller,
    available: dbProduct.availability === 'MADE_TO_ORDER' || dbProduct.stock > 0,
    stock: dbProduct.stock || 10,
    rating: dbProduct.rating || 4.8,
    reviewCount: dbProduct.review_count || 12,
    preparationDays: dbProduct.preparation_days || 20,
    customizationAvailable: dbProduct.customization_available,
    tags: dbProduct.tags || [],
    customizationOptions: options
  }
}

