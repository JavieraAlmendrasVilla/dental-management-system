import { Shield, User, Clock, Phone, Mail, MapPin, Award, Star, ChevronRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const SpecialistPracticeTemplate = () => {
  const content = {
    hero: {
      title: 'Excellence in Specialized Dental Care',
      subtitle: 'Advanced treatments and exceptional results',
      image: 'https://images.pexels.com/photos/3845761/pexels-photo-3845761.jpeg'
    },
    features: [
      {
        icon: Shield,
        title: 'Specialized Expertise',
        description: 'Advanced procedures and specialized treatments'
      },
      {
        icon: User,
        title: 'Board Certified',
        description: 'Highly qualified specialists in their field'
      },
      {
        icon: Clock,
        title: 'Personalized Care',
        description: 'Tailored treatment plans for optimal results'
      }
    ],
    contact: {
      address: '789 Specialist Court, City, State 12345',
      phone: '(555) 345-6789',
      email: 'info@specialistdental.com',
      hours: 'Mon-Fri: 9am-5pm'
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">Specialist Dental</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#expertise" className="text-gray-700 hover:text-primary">Expertise</a>
              <a href="#treatments" className="text-gray-700 hover:text-primary">Treatments</a>
              <a href="#contact" className="text-gray-700 hover:text-primary">Contact</a>
              <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors">
                Request Consultation
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
            alt="Specialist Dental Practice"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-primary/60"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <div className="flex items-center mb-6">
              <Award className="h-6 w-6 text-primary" />
              <span className="ml-2 text-white/90">Board Certified Specialists</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {content.hero.title}
            </h1>
            <p className="text-xl text-white/90 mb-8">
              {content.hero.subtitle}
            </p>
            <div className="flex gap-4">
              <button className="bg-primary text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-primary-dark transition-colors">
                Book Consultation
              </button>
              <button className="bg-white text-primary px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors">
                Our Expertise
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20" id="expertise">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Specialized Dental Excellence</h2>
            <p className="mt-4 text-xl text-gray-600">Advanced treatments with proven results</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {content.features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-t-4 border-primary">
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

      {/* Treatments Section */}
      <section className="py-20 bg-gray-50" id="treatments">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Advanced Treatment Options</h2>
              <div className="space-y-4">
                {[
                  'Dental Implants',
                  'Complex Root Canal Therapy',
                  'Periodontal Surgery',
                  'Orthodontic Treatment',
                  'TMJ Therapy'
                ].map((treatment, index) => (
                  <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span className="text-lg">{treatment}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-primary/10 rounded-lg">
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-primary" />
                  <h3 className="ml-2 text-lg font-semibold">Why Choose Us</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-primary mr-2" />
                    <span>Latest Technology & Equipment</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-primary mr-2" />
                    <span>Experienced Specialist Team</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-primary mr-2" />
                    <span>Comprehensive Treatment Plans</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3779709/pexels-photo-3779709.jpeg"
                alt="Advanced Dental Treatments"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">98% Success Rate</span>
                </div>
                <p className="text-sm text-gray-600">Based on patient outcomes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Schedule a Consultation</h2>
              <p className="text-gray-600 mb-8">
                Take the first step towards specialized dental care. Our team is ready to help you achieve optimal oral health.
              </p>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-gray-600">{content.contact.address}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-gray-600">{content.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600">{content.contact.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Hours</h3>
                    <p className="text-gray-600">{content.contact.hours}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <form className="bg-white p-8 rounded-lg shadow-lg">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Treatment Interest</label>
                    <select className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
                      <option>Select a treatment</option>
                      <option>Dental Implants</option>
                      <option>Root Canal Therapy</option>
                      <option>Periodontal Surgery</option>
                      <option>Orthodontic Treatment</option>
                      <option>TMJ Therapy</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    ></textarea>
                  </div>
                  <button className="w-full bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-dark transition-colors">
                    Request Consultation
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
                <Award className="h-8 w-8 text-primary" />
                <span className="ml-2 text-xl font-bold">Specialist Dental</span>
              </div>
              <p className="text-gray-400">
                Leading the way in specialized dental care
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#expertise" className="text-gray-400 hover:text-white">Expertise</a></li>
                <li><a href="#treatments" className="text-gray-400 hover:text-white">Treatments</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Treatments</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Dental Implants</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Root Canal Therapy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Periodontal Surgery</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">TMJ Therapy</a></li>
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
            <p>&copy; {new Date().getFullYear()} Specialist Dental. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SpecialistPracticeTemplate;