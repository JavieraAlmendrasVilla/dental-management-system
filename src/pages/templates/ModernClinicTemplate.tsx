import { ArrowRight, Calendar, MapPin, Phone, Clock, Star, CheckCircle2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const ModernClinicTemplate = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative h-screen">
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg" 
            alt="Modern Dental Clinic" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        
        <nav className="relative z-10 container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">DentalCare</h1>
            <div className="hidden md:flex items-center space-x-8 text-white">
              <a href="#services" className="hover:text-primary transition-colors">Services</a>
              <a href="#about" className="hover:text-primary transition-colors">About</a>
              <a href="#team" className="hover:text-primary transition-colors">Team</a>
              <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
              <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full transition-colors">
                Book Appointment
              </button>
            </div>
          </div>
        </nav>

        <div className="relative z-10 container mx-auto px-6 h-[calc(100vh-120px)] flex items-center">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold text-white mb-6">Modern Dental Care for Your Family</h2>
            <p className="text-xl text-white/90 mb-8">
              Experience state-of-the-art dentistry in a comfortable and welcoming environment.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full text-lg transition-colors">
                Book Your Visit
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full text-lg hover:bg-white hover:text-black transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'General Dentistry',
                description: 'Comprehensive dental care for the whole family',
                icon: <CheckCircle2 className="h-8 w-8 text-primary" />
              },
              {
                title: 'Cosmetic Dentistry',
                description: 'Transform your smile with our aesthetic treatments',
                icon: <Star className="h-8 w-8 text-primary" />
              },
              {
                title: 'Emergency Care',
                description: '24/7 emergency dental services when you need them',
                icon: <Phone className="h-8 w-8 text-primary" />
              }
            ].map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                <button className="mt-4 text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all">
                  Learn More <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                We're here to help you achieve the smile you deserve.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-gray-600">123 Dental Street, City, State</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-gray-600">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Hours</h3>
                    <p className="text-gray-600">Mon-Fri: 9am-6pm</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModernClinicTemplate;