import { useState } from 'react';
import { useParams } from 'react-router-dom';
import DentalChart from './components/DentalChart';
import { Calendar, FilePlus, History, Printer, Save } from 'lucide-react';

const TREATMENT_TYPES = [
  { id: 'filling', name: 'Filling', color: '#3b82f6' },
  { id: 'crown', name: 'Crown', color: '#f59e0b' },
  { id: 'extraction', name: 'Extraction', color: '#ef4444' },
  { id: 'root-canal', name: 'Root Canal', color: '#8b5cf6' },
  { id: 'implant', name: 'Implant', color: '#10b981' },
  { id: 'bridge', name: 'Bridge', color: '#6366f1' },
];

const DentalChartPage = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [selectedTreatment, setSelectedTreatment] = useState(TREATMENT_TYPES[0].id);

  const patientName = 'John Smith';

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dental Chart</h1>
          <p className="text-muted-foreground">
            Patient: {patientName} (ID: {patientId})
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
            <History className="mr-2 h-4 w-4" />
            History
          </button>
          <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </button>
          <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 md:grid-cols-4">
        {/* Treatment Options Panel */}
        <div className="md:col-span-1 space-y-6">
          {/* Treatment Types */}
          <div className="rounded-lg border bg-card">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Treatment Types</h2>
            </div>
            <div className="p-4 space-y-2">
              {TREATMENT_TYPES.map((treatment) => (
                <button
                  key={treatment.id}
                  className={`flex items-center w-full rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    selectedTreatment === treatment.id
                      ? 'bg-primary text-white'
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => setSelectedTreatment(treatment.id)}
                >
                  <span
                    className="mr-2 h-3 w-3 rounded-full"
                    style={{ backgroundColor: treatment.color }}
                  />
                  {treatment.name}
                </button>
              ))}
            </div>
          </div>

          {/* Patient Info */}
          <div className="rounded-lg border bg-card">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Patient Information</h2>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="text-sm">November 15, 2023</p>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-muted-foreground">Next Appointment</p>
                <p className="text-sm">December 15, 2023</p>
              </div>
              <div className="mt-4">
                <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium w-full hover:bg-muted transition-colors">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Appointment
                </button>
              </div>
            </div>
          </div>

          {/* Treatment Plan */}
          <div className="rounded-lg border bg-card">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Treatment Plan</h2>
            </div>
            <div className="p-4">
              <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium w-full text-white hover:bg-primary-dark transition-colors">
                <FilePlus className="mr-2 h-4 w-4" />
                Create Treatment Plan
              </button>
            </div>
          </div>
        </div>

        {/* Dental Chart Section */}
        <div className="md:col-span-3">
          <div className="rounded-lg border bg-card p-4 w-full max-w-full overflow-x-auto">
            <div className="mx-auto max-w-[1024px]">
              <DentalChart selectedTreatment={selectedTreatment} />
            </div>
          </div>
        </div>

      {/* Notes and Legend */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Notes */}
        <div className="rounded-lg border bg-card">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Chart Notes</h2>
          </div>
          <div className="p-4">
            <textarea
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring min-h-[120px]"
              placeholder="Add notes about the patient's dental chart..."
            ></textarea>
          </div>
        </div>

        {/* Legend */}
        <div className="rounded-lg border bg-card">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Legend</h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              {TREATMENT_TYPES.map((treatment) => (
                <div key={treatment.id} className="flex items-center">
                  <div
                    className="mr-2 h-4 w-4 rounded-full"
                    style={{ backgroundColor: treatment.color }}
                  />
                  <span className="text-sm">{treatment.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DentalChartPage;
