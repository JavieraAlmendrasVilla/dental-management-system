import { useState } from 'react';
import { Code, Layout, Palette, Plus, Wand2, Loader2, Globe, Phone, Mail, MapPin, Calendar, Clock, User, Shield, ChevronDown, Image, Type, Grid } from 'lucide-react';
import { generateWebsite } from '../../lib/openai';

// Website templates
const TEMPLATES = [
  {
    id: 'modern-clinic',
    name: 'Modern Clinic',
    description: 'A clean, modern design perfect for contemporary dental practices',
    preview: 'https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg',
    url: '/templates/modern-clinic',
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
    url: '/templates/family-dentistry',
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
    url: '/templates/specialist-practice',
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
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTemplateSelect = (templateId: string) => {
    const template = TEMPLATES.find(t => t.id === templateId);
    if (template) {
      window.open(template.url, '_blank');
    }
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
            onClick={() => handleTemplateSelect(template.id)}
            className="rounded-lg border bg-card overflow-hidden cursor-pointer transition-all hover:shadow-lg"
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
              <button className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors w-full">
                <Globe className="mr-2 h-4 w-4" />
                Preview Template
              </button>
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

      {/* Generated Content Display */}
      {generatedContent && (
        <div className="rounded-lg border bg-card">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Generated Website Content</h2>
          </div>
          <div className="p-4">
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-sm">
                {generatedContent}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsiteBuilderPage;