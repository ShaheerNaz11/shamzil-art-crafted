import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, ShoppingBag, Tags, ListOrdered, CreditCard, Users, Bell, Settings } from 'lucide-react'

export default function AdminLayout() {
  const location = useLocation()
  
  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: ShoppingBag },
    { name: 'Categories', path: '/admin/categories', icon: Tags },
    { name: 'Orders', path: '/admin/orders', icon: ListOrdered },
    { name: 'Payments', path: '/admin/payments', icon: CreditCard },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Notifications', path: '/admin/notifications', icon: Bell },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ]

  return (
    <div className="flex min-h-screen bg-[#FAF8FC]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-purple-light flex-shrink-0 hidden md:block">
        <div className="p-6 border-b border-purple-light">
          <h2 className="text-xl font-serif text-purple-deep">Admin Panel</h2>
          <p className="text-xs text-text-secondary mt-1">SHAMZIL ART CRAFTED</p>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-xl transition-colors ${
                location.pathname === item.path 
                  ? 'bg-purple-50 text-purple-primary font-medium' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-purple-deep'
              }`}
            >
              <item.icon className={`w-5 h-5 mr-3 ${location.pathname === item.path ? 'text-purple-primary' : 'text-gray-400'}`} />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
