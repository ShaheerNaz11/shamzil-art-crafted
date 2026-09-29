import { useState, useEffect } from 'react'
import { User, MapPin, Package, Settings, LogOut, CheckCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

export default function Account() {
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [authForm, setAuthForm] = useState({ email: '', password: '', name: '', phone: '' })
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState('')
  
  const { user, profile, login, register, logout, isLoading: authContextLoading } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [isSaved, setIsSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pinCode: ''
  })

  useEffect(() => {
    if (user || profile) {
      setProfileData({
        fullName: profile?.full_name || profile?.fullName || user?.user_metadata?.full_name || '',
        email: user?.email || '',
        phone: profile?.phone || user?.user_metadata?.phone || '',
        address: profile?.address || '',
        city: profile?.city || '',
        state: profile?.state || '',
        pinCode: profile?.pinCode || profile?.pin_code || ''
      })
    }
  }, [user, profile])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({ ...prev, [name]: value }))
    setIsSaved(false)
  }

  const handleAuthChange = (e) => {
    const { name, value } = e.target
    setAuthForm(prev => ({ ...prev, [name]: value }))
    setAuthError('')
  }

  const handleAuthSubmit = async (e) => {
    e.preventDefault()
    setAuthLoading(true)
    setAuthError('')
    
    try {
      if (isLoginMode) {
        await login(authForm.email, authForm.password)
      } else {
        await register(authForm.email, authForm.password, authForm.name, authForm.phone)
      }
    } catch (err) {
      setAuthError(err.message)
    } finally {
      setAuthLoading(false)
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!user) return

    setIsSaving(true)
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: profileData.fullName,
          phone: profileData.phone,
          address: profileData.address,
          city: profileData.city,
          state: profileData.state,
          pin_code: profileData.pinCode,
          updated_at: new Date()
        })

      if (error) throw error

      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 3000)
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile.')
    } finally {
      setIsSaving(false)
    }
  }

  if (authContextLoading) {
    return (
      <div className="bg-[#faf5ff] min-h-screen py-12 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="bg-[#faf5ff] min-h-screen py-16 px-4 flex justify-center items-center">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-purple-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-[#2e1065] mb-2">
              {isLoginMode ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-500">
              {isLoginMode ? 'Enter your details to access your account.' : 'Sign up to manage your orders and profile.'}
            </p>
          </div>

          {authError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center border border-red-100">
              {authError}
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-5">
            {!isLoginMode && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" name="name" value={authForm.name} onChange={handleAuthChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" name="phone" value={authForm.phone} onChange={handleAuthChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                </div>
              </>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" name="email" value={authForm.email} onChange={handleAuthChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" name="password" value={authForm.password} onChange={handleAuthChange} required minLength="6" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
            </div>

            <button type="submit" disabled={authLoading} className="w-full bg-[#7c3aed] text-white font-medium py-3 rounded-xl hover:bg-[#6d28d9] transition-colors shadow-md disabled:opacity-70 mt-4">
              {authLoading ? 'Please wait...' : (isLoginMode ? 'Log In' : 'Sign Up')}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            {isLoginMode ? "Don't have an account? " : "Already have an account? "}
            <button type="button" onClick={() => setIsLoginMode(!isLoginMode)} className="text-purple-600 font-medium hover:underline">
              {isLoginMode ? 'Sign up' : 'Log in'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#faf5ff] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif text-[#2e1065] mb-8">My Account</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center space-x-4 bg-purple-50">
                <div className="w-12 h-12 rounded-full bg-[#d8b4fe] flex items-center justify-center text-[#2e1065] font-bold text-xl">
                  {profileData.fullName ? profileData.fullName.charAt(0).toUpperCase() : <User className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="font-bold text-[#2e1065] truncate w-32">{profileData.fullName || 'User'}</h3>
                  <p className="text-xs text-gray-500">Customer</p>
                </div>
              </div>
              
              <nav className="flex flex-col p-2">
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'profile' ? 'bg-[#9333ea] text-white' : 'text-gray-600 hover:bg-purple-50'}`}
                >
                  <User className="w-5 h-5" /> <span>Profile Details</span>
                </button>
                <button 
                  onClick={() => setActiveTab('orders')}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'orders' ? 'bg-[#9333ea] text-white' : 'text-gray-600 hover:bg-purple-50'}`}
                >
                  <Package className="w-5 h-5" /> <span>My Orders</span>
                </button>
                <button 
                  onClick={() => setActiveTab('addresses')}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'addresses' ? 'bg-[#9333ea] text-white' : 'text-gray-600 hover:bg-purple-50'}`}
                >
                  <MapPin className="w-5 h-5" /> <span>Saved Addresses</span>
                </button>
                <div className="border-t border-gray-100 my-2"></div>
                <button onClick={logout} className="flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-500 hover:bg-red-50 transition-colors">
                  <LogOut className="w-5 h-5" /> <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {activeTab === 'profile' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[var(--border)] shadow-sm">
                <h2 className="text-xl font-medium text-[#2e1065] mb-6 pb-2 border-b">Personal Information</h2>
                
                {isSaved && (
                  <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" /> Profile updated successfully!
                  </div>
                )}
                
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Full Name</label>
                      <input type="text" name="fullName" value={profileData.fullName} onChange={handleChange} className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Email Address</label>
                      <input type="email" name="email" value={profileData.email} disabled className="input-field bg-gray-50 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Phone Number</label>
                      <input type="tel" name="phone" value={profileData.phone} onChange={handleChange} className="input-field" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium text-[#2e1065] pt-4 border-t">Default Shipping Address</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm text-gray-700 mb-1">Full Address</label>
                      <input type="text" name="address" value={profileData.address} onChange={handleChange} className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">City</label>
                      <input type="text" name="city" value={profileData.city} onChange={handleChange} className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">State</label>
                      <input type="text" name="state" value={profileData.state} onChange={handleChange} className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">PIN Code</label>
                      <input type="text" name="pinCode" value={profileData.pinCode} onChange={handleChange} className="input-field" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <button type="submit" disabled={isSaving} className="btn-accent px-8 disabled:opacity-50">
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[var(--border)] shadow-sm">
                <h2 className="text-xl font-medium text-[#2e1065] mb-6 pb-2 border-b">Order History</h2>
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No orders yet</h3>
                  <p className="text-gray-500">When you place your first order, it will appear here.</p>
                </div>
              </div>
            )}
            
            {activeTab === 'addresses' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[var(--border)] shadow-sm">
                <h2 className="text-xl font-medium text-[#2e1065] mb-6 pb-2 border-b">Saved Addresses</h2>
                <div className="p-4 border-2 border-[#9333ea] rounded-xl bg-purple-50 relative">
                  <span className="absolute top-4 right-4 bg-[#9333ea] text-white text-xs px-2 py-1 rounded-full">Default</span>
                  <p className="font-bold text-[#2e1065]">{profileData.fullName}</p>
                  <p className="text-sm text-gray-600 mt-1">{profileData.address || 'No address saved yet'}</p>
                  {profileData.city && <p className="text-sm text-gray-600">{profileData.city}, {profileData.state} {profileData.pinCode}</p>}
                  <p className="text-sm text-gray-600 mt-2">Phone: {profileData.phone}</p>
                  <div className="mt-4 flex space-x-4 text-sm font-medium">
                    <button onClick={() => setActiveTab('profile')} className="text-[#9333ea] hover:text-[#7e22ce]">Edit</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
