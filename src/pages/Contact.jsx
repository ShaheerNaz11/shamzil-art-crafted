import { Mail, Phone, Camera, MapPin } from 'lucide-react'

export default function Contact() {
  return (
    <div className="bg-[#faf5ff] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-[#2e1065] mb-4">Get In Touch</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you! Whether you have a question about our custom crafted items, pricing, or anything else, our team is ready to answer all your questions.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-purple-100">
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* Contact Information */}
            <div className="bg-[#4c1d95] p-10 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-purple-600 opacity-50 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-[#7c3aed] opacity-50 blur-2xl"></div>

              <div className="relative z-10">
                <h3 className="text-2xl font-serif font-bold mb-6">Contact Information</h3>

                <div className="space-y-8 mt-12">
                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-purple-200 mt-1" />
                    <div>
                      <p className="font-medium text-lg">Phone</p>
                      <p className="text-purple-200 mt-1">+91 6369431258</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-purple-200 mt-1" />
                    <div>
                      <p className="font-medium text-lg">Email</p>
                      <p className="text-purple-200 mt-1">your_email@example.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Camera className="w-6 h-6 text-purple-200 mt-1" />
                    <div>
                      <p className="font-medium text-lg">Instagram</p>
                      <p className="text-purple-200 mt-1">@shamzil_handmade_gifts</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-purple-200 mt-1" />
                    <div>
                      <p className="font-medium text-lg">Location</p>
                      <p className="text-purple-200 mt-1">Coimbatore, Tamil Nadu, India</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Placeholder */}
            <div className="p-10">
              <h3 className="text-2xl font-serif font-bold text-[#2e1065] mb-6">Send us a message</h3>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button type="button" className="w-full bg-[#7c3aed] text-white font-medium py-3 px-6 rounded-xl hover:bg-[#6d28d9] transition-colors shadow-md shadow-purple-500/30">
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
