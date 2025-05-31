import { User, Shield, Calendar, Phone, Mail, MapPin, Heart, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FamilyDentistryTemplate = () => {
  const content = {
    hero: {
      title: 'Caring for Smiles of All Ages',
      subtitle: 'Your family\'s dental health is our top priority',
      image: 'https://images.pexels.com/photos/3845741/pexels-photo-3845741.jpeg'
    },
    features: [
      {
        icon: User,
        title: 'Kid-Friendly',
        description: 'Creating positive dental experiences for children'
      },
      {
        icon: Shield,
        title: 'Gentle Care',
        description: 'Comfortable and stress-free dental visits'
      },
      {
        icon: Calendar,
        title: 'Family Scheduling',
        description: 'Convenient appointment times for the whole family'
      }
    ],
    contact: {
      address: '456 Family Drive, City, State 12345',
      phone: '(555) 234-5678',
      email: 'info@familydentalcare.com',
      hours: 'Mon-Thu: 8am-5pm, Fri: 8am-2pm'
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">Family Dental Care</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-700 hover:text-primary">Services</a>
              <a href="#about" className="text-gray-700 hover:text-primary">About</a>
              <a href="#contact" className="text-gray-700 hover:text-primary">Contact</a>
              <button className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition-colors">
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
            alt="Family Dental Care"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary-dark/80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {content.hero.title}
            </h1>
            <p className="text-xl text-white/90 mb-8">
              {content.hero.subtitle}
            </p>
            <button className="bg-white text-primary px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors">
              Schedule a Family Visit
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our Commitment to Your Family</h2>
            <p className="mt-4 text-xl text-gray-600">Providing gentle, comprehensive care for every smile</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {content.features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px]">
              <img
                src="https://images.pexels.com/photos/3779709/pexels-photo-3779709.jpeg"
                alt="Family Dental Services"
                className="absolute inset-0 w-full h-full object-cover rounded-3xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center gap-2">
                  <Star className="h-6 w-6 text-yellow-400 fill-current" />
                  <Star className="h-6 w-6 text-yellow-400 fill-current" />
                  <Star className="h-6 w-6 text-yellow-400 fill-current" />
                  <Star className="h-6 w-6 text-yellow-400 fill-current" />
                  <Star className="h-6 w-6 text-yellow-400 fill-current" />
                </div>
                <p className="mt-2 text-gray-600">"Amazing with kids!"</p>
                <p className="text-sm text-gray-500">- Happy Parent</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Family-Focused Services</h2>
              <div className="space-y-4">
                {[
                  'Pediatric Dentistry',
                  'Preventive Care',
                  'Dental Sealants',
                  'Fluoride Treatments',
                  'Emergency Care'
                ].map((service, index) => (
                  <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                    <ChevronRight className="h-5 w-5 text-primary mr-2" />
                    <span className="text-lg">{service}</span>
                  </div>
                ))}
              </div>
              <button className="mt-8 bg-primary text-white px-8 py-4 rounded-full font-medium hover:bg-primary-dark transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                We're here to answer any questions about your family's dental health
              </p>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Visit Us</h3>
                    <p className="text-gray-600">{content.contact.address}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Call Us</h3>
                    <p className="text-gray-600">{content.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email Us</h3>
                    <p className="text-gray-600">{content.contact.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Office Hours</h3>
                    <p className="text-gray-600">{content.contact.hours}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <form className="bg-white p-8 rounded-2xl shadow-sm">
                <h3 className="text-2xl font-semibold mb-6">Schedule an Appointment</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="tel"
                    placeholder="Your Phone"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <textarea
                    placeholder="Message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  ></textarea>
                  <button className="w-full bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors">
                    Request Appointment
                  </button>
                </div>
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
                <Heart className="h-8 w-8 text-primary" />
                <span className="ml-2 text-xl font-bold">Family Dental Care</span>
              </div>
              <p className="text-gray-400">
                Creating healthy smiles for the whole family
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
                <li><a href="#" className="text-gray-400 hover:text-white">Pediatric Dentistry</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Preventive Care</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Emergency Care</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Family Dentistry</a></li>
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
            <p>&copy; {new Date().getFullYear()} Family Dental Care. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FamilyDentistryTemplate;