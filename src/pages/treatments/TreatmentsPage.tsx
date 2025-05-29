import { useState } from 'react';
import { Calendar, FileText, Filter, Plus, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../lib/utils';

// Mock treatment data
const TREATMENTS = [
  {
    id: '1',
    name: 'Root Canal Treatment',
    category: 'Endodontics',
    duration: 60,
    cost: 800,
    description: 'Complete root canal treatment including cleaning and filling',
  },
  {
    id: '2',
    name: 'Dental Crown',
    category: 'Restorative',
    duration: 45,
    cost: 1200,
    description: 'Full porcelain crown installation',
  },
  {
    id: '3',
    name: 'Deep Cleaning',
    category: 'Periodontics',
    duration: 60,
    cost: 300,
    description: 'Deep cleaning and scaling treatment',
  },
  {
    id: '4',
    name: 'Tooth Extraction',
    category: 'Oral Surgery',
    duration: 30,
    cost: 200,
    description: 'Simple tooth extraction procedure',
  },
  {
    id: '5',
    name: 'Dental Implant',
    category: 'Implantology',
    duration: 90,
    cost: 3000,
    description: 'Complete dental implant procedure',
  },
];

// Mock recent treatments
const RECENT_TREATMENTS = [
  {
    id: '1',
    patientName: 'John Smith',
    patientId: '101',
    treatment: 'Root Canal Treatment',
    date: '2024-03-10',
    dentist: 'Dr. Morgan',
    status: 'completed',
  },
  {
    id: '2',
    patientName: 'Sarah Johnson',
    patientId: '102',
    treatment: 'Dental Crown',
    date: '2024-03-09',
    dentist: 'Dr. Anderson',
    status: 'in-progress',
  },
  {
    id: '3',
    patientName: 'Michael Brown',
    patientId: '103',
    treatment: 'Deep Cleaning',
    date: '2024-03-08',
    dentist: 'Dr. Morgan',
    status: 'scheduled',
  },
];

const TreatmentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTreatments = TREATMENTS.filter((treatment) => {
    const matchesSearch = treatment.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || treatment.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(TREATMENTS.map((t) => t.category))];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Treatments</h1>
          <p className="text-muted-foreground">
            Manage dental treatments and procedures
          </p>
        </div>
        <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors">
          <Plus className="mr-2 h-4 w-4" />
          Add Treatment
        </button>
      </div>

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
                    placeholder="Search treatments..."
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
                    Filter
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
                          {treatment.duration} minutes
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

        {/* Recent Treatments */}
        <div className="md:col-span-3">
          <div className="rounded-lg border bg-card">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Recent Treatments</h2>
            </div>
            <div className="divide-y">
              {RECENT_TREATMENTS.map((treatment) => (
                <div key={treatment.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/patients/${treatment.patientId}`}
                        className="font-medium hover:underline"
                      >
                        {treatment.patientName}
                      </Link>
                      <div className="mt-1 flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-4 w-4" />
                        <span>{formatDate(treatment.date)}</span>
                        <span className="mx-1">•</span>
                        <span>{treatment.treatment}</span>
                      </div>
                    </div>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        treatment.status === 'completed'
                          ? 'bg-success/10 text-success'
                          : treatment.status === 'in-progress'
                          ? 'bg-warning/10 text-warning'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      {treatment.status.charAt(0).toUpperCase() + treatment.status.slice(1)}
                    </span>
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