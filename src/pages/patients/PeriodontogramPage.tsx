import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, FilePlus, History, Printer, Save } from 'lucide-react';
import Periodontogram from './components/Periodontogram';

const PeriodontogramPage = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  const patientName = 'John Smith';

  const handleSave = (data: any) => {
    console.log('Saving periodontogram:', data);
    setHasUnsavedChanges(false);
    alert('Periodontogram saved successfully!');
  };

  const handleUpdate = () => {
    setHasUnsavedChanges(true);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Periodontogram</h1>
          <p className="text-muted-foreground">
            Patient: {patientName} (ID: {patientId})
          </p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
            <History className="mr-2 h-4 w-4" />
            History
          </button>
          <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </button>
          {hasUnsavedChanges && (
            <button 
              onClick={() => handleSave([])}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {/* Info Panel */}
        <div className="md:col-span-1 space-y-6">
          <div className="rounded-lg border bg-card">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Legend</h2>
            </div>
            <div className="p-4 space-y-2 text-sm">
              <p>• Probing Depth (PD): 1-10mm</p>
              <p>• Clinical Attachment Level (CAL): 1-10mm</p>
              <p>• Gingival Margin (GM): -5 to +5mm</p>
              <p>• Bleeding on Probing (BOP): Click to toggle</p>
              <p>• Plaque: Click to toggle</p>
            </div>
          </div>

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

        {/* Periodontogram Section */}
        <div className="md:col-span-3">
          <div className="rounded-lg border bg-card p-4 w-full max-w-full overflow-x-auto">
            <div className="mx-auto max-w-[1024px]">
              <Periodontogram 
                onSave={handleSave}
                onUpdate={handleUpdate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeriodontogramPage;