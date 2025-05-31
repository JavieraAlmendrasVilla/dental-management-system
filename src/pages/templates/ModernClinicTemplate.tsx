import { Shield, User, Clock, Phone, Mail, MapPin, Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ModernClinicTemplate = () => {
  const content = {
    hero: {
      title: 'Advanced Dental Care for Your Entire Family',
      subtitle: 'Experience modern dentistry in a comfortable, state-of-the-art environment',
      image: 'https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg'
    },
    features: [
      {
        icon: Shield,
        title: 'Advanced Technology',
        description: 'State-of-the-art equipment for precise diagnostics and treatment'
      },
      {
        icon: User,
        title: 'Expert Team',
        description: 'Highly qualified professionals dedicated to your dental health'
      },
      {
        icon: Clock,
        title: 'Flexible Hours',
        description: 'Extended hours and weekend appointments available'
      }
    ],
    contact: {
      address: '123 Dental Street, City, State 12345',
      phone: '(555) 123-4567',
      email: 'info@moderndentalclinic.com',
      hours: 'Mon-Fri: 8am-6pm, Sat: 9am-2pm'
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">Modern Dental</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-700 hover:text-primary">Services</a>
              <a href="#about" className="text-gray-700 hover:text-primary">About</a>
              <a href="#contact" className="text-gray-700 hover:text-primary">Contact</a>
              <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors">
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[600px]">
        <div className="absolute inset-0">
          <img
            src={content.hero.image}
            alt="Modern Dental Clinic"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/60"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {content.hero.title}
            </h1>
            <p className="text-xl text-white/90 mb-8">
              {content.hero.subtitle}
            </p>
            <button className="bg-primary text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-primary-dark transition-colors">
              Schedule Your Visit
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
            <p className="mt-4 text-xl text-gray-600">Experience the difference of modern dental care</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {content.features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Comprehensive Dental Services</h2>
              <div className="space-y-4">
                {[
                  'General Dentistry',
                  'Cosmetic Dentistry',
                  'Orthodontics',
                  'Dental Implants',
                  'Emergency Care'
                ].map((service, index) => (
                  <div key={index} className="flex items-center">
                    <ChevronRight className="h-5 w-5 text-primary mr-2" />
                    <span className="text-lg">{service}</span>
                  </div>
                ))}
              </div>
              <button className="mt-8 bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-dark transition-colors">
                View All Services
              </button>
            </div>
            <div className="relative h-96">
              <img
                src="https://images.pexels.com/photos/3779709/pexels-photo-3779709.jpeg"
                alt="Dental Services"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-3" />
                  <span>{content.contact.address}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-3" />
                  <span>{content.contact.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <span>{content.contact.email}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-primary mr-3" />
                  <span>{content.contact.hours}</span>
                </div>
              </div>
            </div>
            <div>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
                <button className="w-full bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-dark transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-primary" />
                <span className="ml-2 text-xl font-bold">Modern Dental</span>
              </div>
              <p className="text-gray-400">
                Providing advanced dental care with a gentle touch
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white">Services</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">General Dentistry</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cosmetic Dentistry</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Orthodontics</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Dental Implants</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  {content.contact.phone}
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  {content.contact.email}
                </li>
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {content.contact.address}
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Modern Dental. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ModernClinicTemplate;