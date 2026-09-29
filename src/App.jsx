import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CustomCursor from './components/ui/CustomCursor'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { AuthProvider } from './context/AuthContext'
import AdminRoute from './components/auth/AdminRoute'
import AdminLayout from './components/layout/AdminLayout'

// Lazy loaded pages for performance
const Home = lazy(() => import('./pages/Home'))
const Shop = lazy(() => import('./pages/Shop'))
const ProductDetails = lazy(() => import('./pages/ProductDetails'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Payment = lazy(() => import('./pages/Payment'))
const PaymentPending = lazy(() => import('./pages/PaymentPending'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Account = lazy(() => import('./pages/Account'))
const Categories = lazy(() => import('./pages/Categories'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Wishlist = lazy(() => import('./pages/Wishlist'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#faf5ff]">
    <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
  </div>
)

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <CustomCursor />
          <Router>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Public Routes with Navbar/Footer */}
                <Route element={
                  <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <main className="flex-grow">
                      <Outlet />
                    </main>
                    <Footer />
                  </div>
                }>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/product/:slug" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/payment-pending/:orderId" element={<PaymentPending />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="*" element={<NotFound />} />
                </Route>

                {/* Secure Admin Routes */}
                <Route path="/admin" element={<AdminRoute />}>
                  <Route element={<AdminLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="products" element={<div className="p-8">Products Management</div>} />
                    <Route path="categories" element={<div className="p-8">Categories Management</div>} />
                    <Route path="orders" element={<div className="p-8">Orders Management</div>} />
                    <Route path="payments" element={<div className="p-8">Payments Management</div>} />
                    <Route path="customers" element={<div className="p-8">Customers Management</div>} />
                    <Route path="notifications" element={<div className="p-8">Notifications Management</div>} />
                    <Route path="settings" element={<div className="p-8">Business Settings</div>} />
                  </Route>
                </Route>
              </Routes>
            </Suspense>
          </Router>
        </CartProvider>
    </WishlistProvider>
    </AuthProvider>
  )
}

export default App
