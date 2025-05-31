import { useState } from 'react';
import { Code, Layout, Palette, Plus, Wand2, Loader2, Globe, Phone, Mail, MapPin, Calendar, Clock, User, Shield } from 'lucide-react';
import { generateWebsite } from '../../lib/openai';

// Website templates
const TEMPLATES = [
  {
    id: 'modern-clinic',
    name: 'Modern Clinic',
    description: 'A clean, modern design perfect for contemporary dental practices',
    preview: 'https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg',
    content: {
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
    }
  },
  {
    id: 'family-dentistry',
    name: 'Family Dentistry',
    description: 'Warm and welcoming design ideal for family dental practices',
    preview: 'https://images.pexels.com/photos/3845741/pexels-photo-3845741.jpeg',
    content: {
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
    }
  },
  {
    id: 'specialist-practice',
    name: 'Specialist Practice',
    description: 'Professional design for specialized dental services',
    preview: 'https://images.pexels.com/photos/3845761/pexels-photo-3845761.jpeg',
    content: {
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
    }
  }
];

const WebsiteBuilderPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  
  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setGeneratedContent(null);
  };

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    
    try {
      if (!import.meta.env.VITE_OPENAI_API_KEY) {
        throw new Error('OpenAI API key is not configured. Please add VITE_OPENAI_API_KEY to your environment variables.');
      }
      
      const content = await generateWebsite(aiPrompt);
      setGeneratedContent(content);
      setShowAIPrompt(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate website content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const selectedTemplateContent = selectedTemplate 
    ? TEMPLATES.find(t => t.id === selectedTemplate)?.content 
    : null;

  const renderTemplatePreview = () => {
    if (!selectedTemplateContent) return null;

    return (
      <div className={`transition-all duration-300 ${
        previewMode === 'mobile' 
          ? 'max-w-[375px]' 
          : previewMode === 'tablet' 
          ? 'max-w-[768px]'
          : 'max-w-none'
      }`}>
        {/* Hero Section */}
        <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
          <img 
            src={selectedTemplateContent.hero.image} 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
            <div className="p-8 text-white max-w-2xl">
              <h1 className="text-4xl font-bold mb-4">{selectedTemplateContent.hero.title}</h1>
              <p className="text-xl">{selectedTemplateContent.hero.subtitle}</p>
              <button className="mt-6 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors">
                Book Appointment
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {selectedTemplateContent.features.map((feature, index) => (
            <div key={index} className="bg-card rounded-lg p-6 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-card rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{selectedTemplateContent.contact.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>{selectedTemplateContent.contact.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>{selectedTemplateContent.contact.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <span>{selectedTemplateContent.contact.hours}</span>
              </div>
            </div>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              />
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              />
              <button className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Website Builder</h1>
          <p className="text-muted-foreground">
            Create a professional website for your dental practice
          </p>
        </div>
        <button 
          onClick={() => setShowAIPrompt(true)}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
        >
          <Wand2 className="mr-2 h-4 w-4" />
          AI Website Generator
        </button>
      </div>

      {/* AI Prompt Modal */}
      {showAIPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg shadow-lg w-full max-w-lg p-6">
            <h2 className="text-lg font-semibold mb-4">AI Website Generator</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Describe your ideal dental practice website, and our AI will generate a custom design for you.
            </p>
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Example: I want a modern, professional website for my orthodontic practice with a focus on teen and adult patients..."
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[120px] mb-4"
              disabled={isGenerating}
            />
            {error && (
              <p className="text-sm text-error mb-4">{error}</p>
            )}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAIPrompt(false)}
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
                disabled={isGenerating}
              >
                Cancel
              </button>
              <button
                onClick={handleAIGenerate}
                disabled={isGenerating || !aiPrompt.trim()}
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Website
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Template Selection */}
      <div className="grid gap-6 md:grid-cols-3">
        {TEMPLATES.map((template) => (
          <div 
            key={template.id}
            className={`rounded-lg border bg-card overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
              selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => handleTemplateSelect(template.id)}
          >
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={template.preview} 
                alt={template.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{template.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {template.description}
              </p>
            </div>
          </div>
        ))}
        
        {/* Custom Template Option */}
        <div 
          className="rounded-lg border border-dashed bg-card p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => setShowAIPrompt(true)}
        >
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Plus className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold">Custom Template</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Create a unique design from scratch
          </p>
        </div>
      </div>

      {/* Builder Tools */}
      {(selectedTemplate || generatedContent) && (
        <div className="grid gap-6 md:grid-cols-4">
          <div className="space-y-4">
            <div className="rounded-lg border bg-card">
              <div className="p-4 border-b">
                <h2 className="font-semibold">Layout</h2>
              </div>
              <div className="p-4">
                <button className="w-full flex items-center justify-between rounded-lg border p-3 hover:bg-muted transition-colors">
                  <div className="flex items-center space-x-3">
                    <Layout className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Page Structure</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="rounded-lg border bg-card">
              <div className="p-4 border-b">
                <h2 className="font-semibold">Design</h2>
              </div>
              <div className="p-4">
                <button className="w-full flex items-center justify-between rounded-lg border p-3 hover:bg-muted transition-colors">
                  <div className="flex items-center space-x-3">
                    <Palette className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Colors & Fonts</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="rounded-lg border bg-card">
              <div className="p-4 border-b">
                <h2 className="font-semibold">Custom Code</h2>
              </div>
              <div className="p-4">
                <button className="w-full flex items-center justify-between rounded-lg border p-3 hover:bg-muted transition-colors">
                  <div className="flex items-center space-x-3">
                    <Code className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">CSS & JavaScript</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 rounded-lg border bg-card">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-semibold">Preview</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setPreviewMode('mobile')}
                  className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    previewMode === 'mobile'
                      ? 'bg-primary text-white'
                      : 'border border-input bg-background hover:bg-muted'
                  }`}
                >
                  Mobile
                </button>
                <button 
                  onClick={() => setPreviewMode('tablet')}
                  className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    previewMode === 'tablet'
                      ? 'bg-primary text-white'
                      : 'border border-input bg-background hover:bg-muted'
                  }`}
                >
                  Tablet
                </button>
                <button 
                  onClick={() => setPreviewMode('desktop')}
                  className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    previewMode === 'desktop'
                      ? 'bg-primary text-white'
                      : 'border border-input bg-background hover:bg-muted'
                  }`}
                >
                  Desktop
                </button>
              </div>
            </div>
            <div className="p-4 overflow-x-auto">
              {generatedContent ? (
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-sm">
                    {generatedContent}
                  </pre>
                </div>
              ) : selectedTemplate ? (
                renderTemplatePreview()
              ) : (
                <div className="aspect-[16/9] bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                  Select a template or use the AI generator to get started
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsiteBuilderPage;