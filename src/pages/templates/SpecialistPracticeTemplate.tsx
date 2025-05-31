import { Award, Calendar, Clock, FileText, MapPin, Phone, Shield, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';

const SpecialistPracticeTemplate = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Stethoscope className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">Elite Dental</span>
            </div>
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Home</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Expertise</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Technology</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Team</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Contact</a>
              <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-sm transition-colors">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold leading-tight mb-6">
                Advanced Dental Care by Certified Specialists
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Utilizing cutting-edge technology and evidence-based practices to deliver 
                exceptional dental care.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 transition-colors">
                  Book Consultation
                </button>
                <button className="border border-white/30 hover:bg-white/10 px-8 py-3 transition-colors">
                  Our Services
                </button>
              </div>
              <div className="grid grid-cols-3 gap-8 mt-12">
                <div>
                  <p className="text-3xl font-bold">20+</p>
                  <p className="text-gray-400">Years Experience</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">15k+</p>
                  <p className="text-gray-400">Patients Treated</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">99%</p>
                  <p className="text-gray-400">Success Rate</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3845761/pexels-photo-3845761.jpeg" 
                alt="Specialist Practice" 
                className="rounded-sm shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-black p-6 rounded-sm shadow-xl">
                <div className="flex items-center gap-4">
                  <Award className="h-12 w-12 text-primary" />
                  <div>
                    <p className="font-bold">Certified Specialists</p>
                    <p className="text-sm text-gray-600">Board-certified dental experts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Specialized Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team of specialists provides advanced treatments using the latest 
              technology and techniques.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Implant Surgery',
                description: 'State-of-the-art dental implants with high success rates',
                icon: <Stethoscope className="h-8 w-8 text-primary" />
              },
              {
                title: 'Advanced Orthodontics',
                description: 'Cutting-edge orthodontic treatments for complex cases',
                icon: <Shield className="h-8 w-8 text-primary" />
              },
              {
                title: 'Periodontal Treatment',
                description: 'Comprehensive care for gum disease and oral health',
                icon: <FileText className="h-8 w-8 text-primary" />
              }
            ].map((service, index) => (
              <div key={index} className="bg-white p-8 border hover:shadow-xl transition-shadow">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button className="text-primary font-medium">Learn More →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Advanced Technology</h2>
              <p className="text-gray-600 mb-8">
                We invest in the latest dental technology to provide precise diagnoses 
                and effective treatments.
              </p>
              <div className="space-y-4">
                {[
                  '3D Imaging & Digital X-rays',
                  'Computer-Guided Implant Surgery',
                  'Digital Smile Design',
                  'Laser Dentistry'
                ].map((tech, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-primary rounded-full" />
                    <span className="font-medium">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-sm shadow-lg">
                  <img 
                    src="https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg" 
                    alt="Dental Technology" 
                    className="rounded-sm mb-4"
                  />
                  <h3 className="font-bold">Digital Imaging</h3>
                  <p className="text-sm text-gray-600">Precise diagnostic tools</p>
                </div>
                <div className="bg-white p-6 rounded-sm shadow-lg">
                  <img 
                    src="https://images.pexels.com/photos/3845741/pexels-photo-3845741.jpeg" 
                    alt="Dental Equipment" 
                    className="rounded-sm mb-4"
                  />
                  <h3 className="font-bold">Modern Equipment</h3>
                  <p className="text-sm text-gray-600">State-of-the-art facilities</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white p-6 rounded-sm shadow-lg">
                  <img 
                    src="https://images.pexels.com/photos/3845761/pexels-photo-3845761.jpeg" 
                    alt="Treatment Room" 
                    className="rounded-sm mb-4"
                  />
                  <h3 className="font-bold">Treatment Rooms</h3>
                  <p className="text-sm text-gray-600">Comfortable environment</p>
                </div>
                <div className="bg-white p-6 rounded-sm shadow-lg">
                  <img 
                    src="https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg" 
                    alt="Surgical Suite" 
                    className="rounded-sm mb-4"
                  />
                  <h3 className="font-bold">Surgical Suite</h3>
                  <p className="text-sm text-gray-600">Advanced procedures</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Schedule a Consultation</h2>
              <p className="text-gray-600 mb-8">
                Our specialists are ready to provide you with a comprehensive evaluation 
                and treatment plan.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-sm">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">(555) 123-4567</p>
                    <p className="text-sm text-gray-600">Mon-Fri 9am-5pm</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-sm">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">123 Specialist Ave</p>
                    <p className="text-sm text-gray-600">City, State 12345</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-sm">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Office Hours</p>
                    <p className="text-sm text-gray-600">Monday-Friday: 9am-5pm</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <form className="bg-white p-8 border">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Service Interested In</label>
                    <select className="w-full px-4 py-2 border focus:ring-2 focus:ring-primary">
                      <option>Select a service</option>
                      <option>Implant Surgery</option>
                      <option>Advanced Orthodontics</option>
                      <option>Periodontal Treatment</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 border focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <button className="w-full bg-primary hover:bg-primary-dark text-white py-3 transition-colors">
                    Request Consultation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpecialistPracticeTemplate;