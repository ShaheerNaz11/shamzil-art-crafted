import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingCart, Heart, Search, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const location = useLocation()
  const { user, profile, logout } = useAuth()
  const { cart } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <nav className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-300 ${scrolled ? 'shadow-md py-2' : 'border-b border-purple-light/50 py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img src="/logo.png" alt="Shamzil Art Crafted Logo" className="h-14 w-auto object-contain rounded-full hover:scale-105 transition-transform duration-300" />
              <div className="flex flex-col">
                <span className="text-xl font-serif font-bold text-purple-deep tracking-widest leading-tight">SHAMZIL</span>
                <span className="text-xs text-text-secondary tracking-[0.2em] uppercase">Art Crafted</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {links.map(link => (
              <Link key={link.name} to={link.path} className="text-text-secondary hover:text-purple-primary text-sm uppercase tracking-wider font-medium transition-colors">
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6 relative">
            <button className="text-text-secondary hover:text-purple-primary transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link to="/wishlist" className="text-text-secondary hover:text-purple-primary transition-colors">
              <Heart className="w-5 h-5" />
            </Link>
            
            {/* User Profile Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsProfileOpen(true)}
              onMouseLeave={() => setIsProfileOpen(false)}
            >
              <button className="text-text-secondary hover:text-purple-primary transition-colors flex items-center">
                <User className="w-5 h-5" />
              </button>
              
              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 overflow-hidden transition-all">
                  {user ? (
                    <>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {profile?.full_name || profile?.fullName || user.email?.split('@')[0] || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-primary transition-colors">
                        My Account
                      </Link>
                      <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-primary transition-colors">
                        My Orders
                      </Link>
                      <button 
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                        }}
                        className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">Welcome</p>
                        <p className="text-xs text-gray-500">To access account and manage orders</p>
                      </div>
                      <Link to="/account" className="block px-4 py-3 text-sm text-center font-medium text-purple-primary bg-purple-50 hover:bg-purple-100 transition-colors mx-2 my-2 rounded-md">
                        Login / Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <Link to="/cart" className="text-text-secondary hover:text-purple-primary transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-accent text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="text-text-secondary hover:text-purple-primary transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-accent text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-secondary hover:text-purple-primary focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-purple-light/50 absolute w-full shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {links.map(link => (
              <Link key={link.name} to={link.path} className="block px-3 py-3 text-base font-medium text-text-main hover:text-purple-primary hover:bg-purple-light/20 rounded-lg transition-colors">
                {link.name}
              </Link>
            ))}
            <div className="border-t border-purple-light/30 my-2 pt-2">
              <Link to="/wishlist" className="flex items-center px-3 py-3 text-base font-medium text-text-main hover:text-purple-primary hover:bg-purple-light/20 rounded-lg transition-colors">
                <Heart className="w-5 h-5 mr-3" /> Wishlist
              </Link>
              <button className="w-full flex items-center px-3 py-3 text-base font-medium text-text-main hover:text-purple-primary hover:bg-purple-light/20 rounded-lg transition-colors text-left">
                <Search className="w-5 h-5 mr-3" /> Search
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
