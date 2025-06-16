import { useState, useEffect } from 'react';
import { Filter, Plus, Search, User, Stethoscope, Activity, FileText, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../lib/utils';
import { useLanguage } from '../../lib/i18n/LanguageContext';

interface Treatment {
  id: string;
  name: string;
  category: string;
  duration: number;
  cost: number;
  description: string;
}
const TreatmentsPage = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddTreatmentModal, setShowAddTreatmentModal] = useState(false);
  const [newTreatment, setNewTreatment] = useState({
    name: '',
    category: '',
    duration: '',
    cost: '',
    description: '',
  });


  const [treatments, setTreatments] = useState<Treatment[]>([]);


   // Fetch treatments from backend API on mount
  useEffect(() => {
    async function fetchTreatments() {
      try {
        const res = await fetch('http://localhost:8000/treatments');
        if (!res.ok) throw new Error('Failed to fetch treatments');
        const data: Treatment[] = await res.json();
        setTreatments(data);
      } catch (error) {
        console.error('Error fetching treatments:', error);
      }
    }
    fetchTreatments();
  }, []);

  const filteredTreatments = treatments.filter((treatment) => {
    const matchesSearch = treatment.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || treatment.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(treatments.map((t) => t.category)))];

  const handleAddTreatment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/treatments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newTreatment.name,
          category: newTreatment.category,
          duration: Number(newTreatment.duration),
          cost: Number(newTreatment.cost),
          description: newTreatment.description,
        }),
      });
      if (!res.ok) throw new Error('Failed to add treatment');
      const addedTreatment = await res.json();
      setTreatments((current) => [...current, addedTreatment]);
      setShowAddTreatmentModal(false);
      setNewTreatment({ name: '', category: '', duration: '', cost: '', description: '' });
    } catch (error) {
      console.error('Error adding treatment:', error);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('treatments.title')}</h1>
          <p className="text-muted-foreground">
            {t('treatments.subtitle')}
          </p>
        </div>
        <button 
          onClick={() => setShowAddTreatmentModal(true)}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          {t('treatments.addNew')}
        </button>
      </div>

      {/* Add Treatment Modal */}
      {showAddTreatmentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg shadow-lg w-full max-w-md max-h-[90vh] flex flex-col">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">{t('treatments.addNew')}</h2>
            </div>
            
            <form onSubmit={handleAddTreatment} className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">{t('treatments.name')}</label>
                  <input
                    type="text"
                    value={newTreatment.name}
                    onChange={(e) => setNewTreatment({ ...newTreatment, name: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t('treatments.category')}</label>
                  <input
                    type="text"
                    value={newTreatment.category}
                    onChange={(e) => setNewTreatment({ ...newTreatment, category: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t('treatments.duration')}</label>
                  <input
                    type="number"
                    value={newTreatment.duration}
                    onChange={(e) => setNewTreatment({ ...newTreatment, duration: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t('treatments.cost')}</label>
                  <input
                    type="number"
                    value={newTreatment.cost}
                    onChange={(e) => setNewTreatment({ ...newTreatment, cost: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t('treatments.description')}</label>
                  <textarea
                    value={newTreatment.description}
                    onChange={(e) => setNewTreatment({ ...newTreatment, description: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    rows={3}
                    required
                  />
                </div>
              </div>
            </form>

            <div className="p-6 border-t">
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddTreatmentModal(false)}
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
                >
                  {t('common.cancel')}
                </button>
                <button
                  onClick={handleAddTreatment}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
                >
                  {t('treatments.addNew')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-7">
        {/* Treatment List */}
        <div className="md:col-span-4">
          <div className="rounded-lg border bg-card">
            <div className="p-4 border-b">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder={t('treatments.search')}
                    className="w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <select
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                  <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-muted transition-colors">
                    <Filter className="mr-2 h-4 w-4" />
                    {t('common.filter')}
                  </button>
                </div>
              </div>
            </div>

            <div className="divide-y">
              {filteredTreatments.map((treatment) => (
                <div key={treatment.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{treatment.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{treatment.description}</p>
                      <div className="mt-2 flex items-center gap-4 text-sm">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          {treatment.category}
                        </span>
                        <span className="text-muted-foreground">
                          {treatment.duration} {t('treatments.duration')}
                        </span>
                        <span className="text-muted-foreground">
                          ${treatment.cost}
                        </span>
                      </div>
                    </div>
                    <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background hover:bg-muted">
                      <FileText className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
       </div>
      </div>

  );
};




export default TreatmentsPage;