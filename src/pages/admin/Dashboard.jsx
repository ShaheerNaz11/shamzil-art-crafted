import { Activity, Clock, PackageCheck, IndianRupee, TrendingUp } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif text-purple-deep">Dashboard Overview</h1>
        <div className="bg-white px-4 py-2 rounded-lg border border-purple-light shadow-sm text-sm text-gray-600">
          Last 30 Days
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-purple-light shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">TOTAL ORDERS</p>
              <h3 className="text-3xl font-bold text-purple-deep">128</h3>
            </div>
            <div className="p-3 bg-purple-50 rounded-xl">
              <Activity className="w-6 h-6 text-purple-primary" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-purple-light shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">PENDING PAYMENTS</p>
              <h3 className="text-3xl font-bold text-orange-600">7</h3>
            </div>
            <div className="p-3 bg-orange-50 rounded-xl">
              <Clock className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-purple-light shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">PROCESSING</p>
              <h3 className="text-3xl font-bold text-blue-600">18</h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl">
              <PackageCheck className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-purple-light shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">REVENUE</p>
              <h3 className="text-3xl font-bold text-green-600">₹1,24,500</h3>
            </div>
            <div className="p-3 bg-green-50 rounded-xl">
              <IndianRupee className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-purple-light shadow-sm">
        <div className="flex items-center justify-between mb-6 border-b border-purple-light/50 pb-4">
          <h2 className="text-xl font-medium text-purple-deep">Recent Orders</h2>
          <button className="text-sm text-purple-accent hover:text-purple-primary font-medium">View All</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-purple-light">
                <th className="pb-3 font-medium">Order Number</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Total</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-gray-50 hover:bg-purple-50/50 transition-colors">
                <td className="py-4 font-medium text-purple-deep">SAC-20260928-001</td>
                <td className="py-4 text-gray-600">Shaheer A</td>
                <td className="py-4 font-medium">₹1,599</td>
                <td className="py-4"><span className="px-3 py-1 bg-green-50 text-green-600 border border-green-100 rounded-full text-xs">Confirmed</span></td>
              </tr>
              <tr className="border-b border-gray-50 hover:bg-purple-50/50 transition-colors">
                <td className="py-4 font-medium text-purple-deep">SAC-20260927-002</td>
                <td className="py-4 text-gray-600">Customer B</td>
                <td className="py-4 font-medium">₹899</td>
                <td className="py-4"><span className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-full text-xs">Processing</span></td>
              </tr>
              <tr className="hover:bg-purple-50/50 transition-colors">
                <td className="py-4 font-medium text-purple-deep">SAC-20260926-003</td>
                <td className="py-4 text-gray-600">Customer C</td>
                <td className="py-4 font-medium">₹2,499</td>
                <td className="py-4"><span className="px-3 py-1 bg-purple-50 text-purple-600 border border-purple-100 rounded-full text-xs">Ready</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
