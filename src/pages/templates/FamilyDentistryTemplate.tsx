import { Calendar, Heart, Smile, Users, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FamilyDentistryTemplate = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">Family Smile</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Home</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Services</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">About</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Contact</a>
              <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-md transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Caring for Your Family's Smiles
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Providing gentle and comprehensive dental care for patients of all ages in a warm, 
                family-friendly environment.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-md transition-colors">
                  Schedule Visit
                </button>
                <button className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-md transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3845741/pexels-photo-3845741.jpeg" 
                alt="Family Dentistry" 
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Book Your Visit</p>
                    <p className="text-sm text-gray-600">Same-day appointments available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive dental care for your entire family in a comfortable 
              and welcoming environment.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="h-10 w-10 text-primary" />,
                title: 'Family-Focused Care',
                description: 'Dental care for every member of your family, from toddlers to grandparents'
              },
              {
                icon: <Heart className="h-10 w-10 text-primary" />,
                title: 'Gentle Approach',
                description: 'We ensure your comfort during every procedure with our gentle touch'
              },
              {
                icon: <Smile className="h-10 w-10 text-primary" />,
                title: 'Preventive Care',
                description: 'Focus on preventing dental issues before they become problems'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-white border hover:shadow-lg transition-shadow">
                <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              'Regular Checkups',
              'Teeth Cleaning',
              'Cavity Treatment',
              'Emergency Care',
              'Orthodontics',
              'Pediatric Dentistry'
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-4">{service}</h3>
                <p className="text-gray-600 mb-4">
                  Professional dental care tailored to your family's needs.
                </p>
                <button className="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all">
                  Learn More <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-12 bg-primary text-white">
                <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
                <p className="mb-8">
                  We're here to help with all your family's dental needs.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Phone className="h-6 w-6" />
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="h-6 w-6" />
                    <span>contact@familysmile.com</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin className="h-6 w-6" />
                    <span>123 Family Drive, City, State</span>
                  </div>
                </div>
              </div>
              <div className="p-12">
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <button className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-md transition-colors">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FamilyDentistryTemplate;