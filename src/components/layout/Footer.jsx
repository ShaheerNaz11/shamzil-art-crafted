import { Link } from 'react-router-dom'
import { MessageCircle, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-purple-deep text-purple-light pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-serif tracking-widest text-white mb-4">SHAMZIL ART CRAFTED</h3>
            <p className="text-purple-lavender mb-6 italic">"Crafting Your Moments, Creating Your Memories."</p>
            <div className="flex space-x-4">
              <a href="#" className="text-purple-lavender hover:text-white transition-colors">
                <span className="w-5 h-5 block">IG</span>
              </a>
              <a href="#" className="text-purple-lavender hover:text-[#25D366] transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="text-purple-lavender hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-white mb-4 uppercase tracking-wider text-sm">Explore</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-purple-lavender hover:text-white transition-colors text-sm">Home</Link></li>
              <li><Link to="/shop" className="text-purple-lavender hover:text-white transition-colors text-sm">Shop</Link></li>
              <li><Link to="/categories" className="text-purple-lavender hover:text-white transition-colors text-sm">Categories</Link></li>
              <li><Link to="/about" className="text-purple-lavender hover:text-white transition-colors text-sm">About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-medium text-white mb-4 uppercase tracking-wider text-sm">Support</h4>
            <ul className="space-y-3">
              <li><Link to="/contact" className="text-purple-lavender hover:text-white transition-colors text-sm">Contact</Link></li>
              <li><Link to="/faq" className="text-purple-lavender hover:text-white transition-colors text-sm">FAQ</Link></li>
              <li><Link to="/orders" className="text-purple-lavender hover:text-white transition-colors text-sm">Track Order</Link></li>
            </ul>
          </div>

          {/* Business Rules */}
          <div>
            <h4 className="font-medium text-white mb-4 uppercase tracking-wider text-sm">Important Note</h4>
            <div className="bg-purple-primary/20 p-4 rounded-lg border border-purple-accent/30 text-sm text-purple-lavender space-y-2">
              <p>🎨 Every order is customized specially for you.</p>
              <p>⏰ Orders must be placed at least <strong>20 days</strong> before the required delivery date.</p>
              <p>🚫 No Cash on Delivery. Advance payment required.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-primary/50 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-purple-lavender text-sm mb-4 md:mb-0">
            &copy; 2026 SHAMZIL ART CRAFTED. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-purple-lavender">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms & Conditions</Link>
            <Link to="/refund" className="hover:text-white">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
