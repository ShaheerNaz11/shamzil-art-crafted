import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Star, Truck, Heart, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  const navigate = useNavigate()
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#faf5ff] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop')] bg-cover bg-center opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 relative">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              initial="hidden" animate="visible" variants={fadeIn}
              className="text-5xl md:text-6xl font-serif text-[#2e1065] mb-6 leading-tight"
            >
              Made With Love, <br/><span className="text-[#9333ea] italic">Crafted For You.</span>
            </motion.h1>
            <motion.p 
              initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 mb-10"
            >
              Beautiful customized gifts created specially for your most memorable moments. Handcrafted with precision and personalized just for you.
            </motion.p>
            <motion.div 
              initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <Link to="/shop" className="btn-accent flex items-center">
                Explore Gifts <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link to="/custom" className="btn-secondary">
                Create Your Gift
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-[#2e1065] mb-4">Popular Categories</h2>
            <div className="w-24 h-1 bg-[#d8b4fe] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Scrapbooks", slug: "scrapbooks", img: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop" },
              { title: "Explosion Boxes", slug: "explosion-boxes", img: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=800&auto=format&fit=crop" },
              { title: "Hamper Boxes", slug: "hampers", img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop" }
            ].map((cat, i) => (
              <motion.div 
                key={i} 
                onClick={() => navigate(`/shop?category=${cat.slug}`)}
                whileHover={{ y: -10 }}
                className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-2xl font-serif text-white mb-2">{cat.title}</h3>
                  <span className="text-[#d8b4fe] flex items-center text-sm font-medium">
                    Shop Now <ArrowRight className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#faf5ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center p-6">
              <div className="w-16 h-16 bg-[#d8b4fe] rounded-full flex items-center justify-center mb-4 text-[#2e1065]">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium mb-2">100% Handmade</h3>
              <p className="text-gray-500 text-sm">Every detail is crafted by hand with immense love and care.</p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="w-16 h-16 bg-[#e9d5ff] rounded-full flex items-center justify-center mb-4 text-[#2e1065]">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium mb-2">Premium Quality</h3>
              <p className="text-gray-500 text-sm">We use only the finest materials for a luxurious finish.</p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="w-16 h-16 bg-[#d8b4fe] rounded-full flex items-center justify-center mb-4 text-[#2e1065]">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium mb-2">Secure Payments</h3>
              <p className="text-gray-500 text-sm">Safe and secure transactions via UPI and GPay.</p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="w-16 h-16 bg-[#e9d5ff] rounded-full flex items-center justify-center mb-4 text-[#2e1065]">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium mb-2">Pan India Delivery</h3>
              <p className="text-gray-500 text-sm">Delivering happiness across India (20 days prior notice required).</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
