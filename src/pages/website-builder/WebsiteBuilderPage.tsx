import { useState } from 'react';
import { Code, Layout, Palette, Plus, Wand2, Loader2, ArrowRight } from 'lucide-react';
import { generateWebsite } from '../../lib/openai';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../lib/i18n/LanguageContext';

// Website templates
const TEMPLATES = [
  {
    id: 'modern-clinic',
    name: 'Modern Clinic',
    description: 'A clean, modern design perfect for contemporary dental practices',
    preview: 'https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg',
    path: '/templates/modern-clinic'
  },
  {
    id: 'family-dentistry',
    name: 'Family Dentistry',
    description: 'Warm and welcoming design ideal for family dental practices',
    preview: 'https://images.pexels.com/photos/3845741/pexels-photo-3845741.jpeg',
    path: '/templates/family-dentistry'
  },
  {
    id: 'specialist-practice',
    name: 'Specialist Practice',
    description: 'Professional design for specialized dental services',
    preview: 'https://images.pexels.com/photos/3845761/pexels-photo-3845761.jpeg',
    path: '/templates/specialist-practice'
  }
];

const WebsiteBuilderPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = TEMPLATES.find(t => t.id === templateId);
    if (template) {
      navigate(template.path);
    }
  };

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    
    try {
      const content = await generateWebsite(aiPrompt);
      setGeneratedContent(content);
      setShowAIPrompt(false);
    } catch (err) {
      if (err instanceof Error && err.message.includes('API key is not configured')) {
        setError(t('websiteBuilder.ai.error'));
      } else {
        setError(t('common.error'));
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('websiteBuilder.title')}</h1>
          <p className="text-muted-foreground">
            {t('websiteBuilder.subtitle')}
          </p>
        </div>
        <button 
          onClick={() => setShowAIPrompt(true)}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
        >
          <Wand2 className="mr-2 h-4 w-4" />
          {t('websiteBuilder.aiGenerator')}
        </button>
      </div>

      {/* AI Prompt Modal */}
      {showAIPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg shadow-lg w-full max-w-lg p-6">
            <h2 className="text-lg font-semibold mb-4">{t('websiteBuilder.ai.title')}</h2>
            <p className="text-sm text-muted-foreground mb-4">
              {t('websiteBuilder.ai.description')}
            </p>
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder={t('websiteBuilder.ai.placeholder')}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[120px] mb-4"
              disabled={isGenerating}
            />
            {error && (
              <div className="bg-error/10 text-error px-4 py-3 rounded-md mb-4">
                {error}
              </div>
            )}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowAIPrompt(false);
                  setError(null);
                }}
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
                disabled={isGenerating}
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleAIGenerate}
                disabled={isGenerating || !aiPrompt.trim()}
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('websiteBuilder.ai.generating')}
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    {t('websiteBuilder.generateWebsite')}
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
                alt={t(`websiteBuilder.templates.${template.id}.name`)}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{t(`websiteBuilder.templates.${template.id}.name`)}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {t(`websiteBuilder.templates.${template.id}.description`)}
              </p>
              <button className="mt-4 text-primary font-medium flex items-center gap-2 group">
                {t('websiteBuilder.previewTemplate')}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
        
        {/* Custom Template Option */}
        <div className="rounded-lg border border-dashed bg-card p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Plus className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold">{t('websiteBuilder.customTemplate.title')}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {t('websiteBuilder.customTemplate.description')}
          </p>
        </div>
      </div>

      {/* Builder Tools */}
      {(selectedTemplate || generatedContent) && (
        <div className="grid gap-6 md:grid-cols-4">
          <div className="space-y-4">
            <div className="rounded-lg border bg-card">
              <div className="p-4 border-b">
                <h2 className="font-semibold">{t('common.layout')}</h2>
              </div>
              <div className="p-4">
                <button className="w-full flex items-center justify-between rounded-lg border p-3 hover:bg-muted transition-colors">
                  <div className="flex items-center space-x-3">
                    <Layout className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{t('common.pageStructure')}</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="rounded-lg border bg-card">
              <div className="p-4 border-b">
                <h2 className="font-semibold">{t('common.design')}</h2>
              </div>
              <div className="p-4">
                <button className="w-full flex items-center justify-between rounded-lg border p-3 hover:bg-muted transition-colors">
                  <div className="flex items-center space-x-3">
                    <Palette className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{t('common.colorsAndFonts')}</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="rounded-lg border bg-card">
              <div className="p-4 border-b">
                <h2 className="font-semibold">{t('common.customCode')}</h2>
              </div>
              <div className="p-4">
                <button className="w-full flex items-center justify-between rounded-lg border p-3 hover:bg-muted transition-colors">
                  <div className="flex items-center space-x-3">
                    <Code className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{t('common.cssAndJavaScript')}</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 rounded-lg border bg-card">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-semibold">{t('websiteBuilder.preview.title')}</h2>
              <div className="flex gap-2">
                <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors">
                  {t('websiteBuilder.preview.mobile')}
                </button>
                <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors">
                  {t('websiteBuilder.preview.tablet')}
                </button>
                <button className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-dark transition-colors">
                  {t('websiteBuilder.preview.desktop')}
                </button>
              </div>
            </div>
            <div className="p-4">
              {generatedContent ? (
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-sm">
                    {generatedContent}
                  </pre>
                </div>
              ) : (
                <div className="aspect-[16/9] bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                  {t('websiteBuilder.selectTemplate')}
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