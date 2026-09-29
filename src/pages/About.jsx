export default function About() {
  return (
    <div className="bg-[#FAF8FC] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-purple-deep mb-4">About Us</h1>
          <p className="text-xl text-purple-primary font-serif italic mb-8">
            "Crafting Your Moments, Creating Your Memories."
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-purple-light space-y-6 text-gray-700 leading-relaxed">
          <p className="text-lg">
            Welcome to <strong>SHAMZIL ART CRAFTED</strong>, your premium destination for exquisite, handcrafted gifts. We believe that every special moment deserves a unique memory.
          </p>
          
          <p>
            Whether it's a birthday, an anniversary, a wedding, or a nikkah, our artisan team pours love and meticulous detail into every single order. We specialize in bespoke Explosion Boxes, Custom Scrapbooks, Name Wallets, and luxurious Gift Hampers.
          </p>
          
          <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 my-8">
            <h3 className="text-xl font-serif text-purple-deep mb-3">Our 100% Handcrafted Promise</h3>
            <p className="text-sm text-gray-600">
              Because our gifts are entirely handmade and customized to your specific preferences, we require a minimum of <strong>20 days</strong> for preparation. This ensures that the quality, personalization, and artistic integrity of your gift are never compromised.
            </p>
          </div>
          
          <p>
            Thank you for allowing us to be a part of your beautiful celebrations. 
          </p>
        </div>
      </div>
    </div>
  )
}
