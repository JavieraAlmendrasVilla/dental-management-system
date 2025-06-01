import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, FilePlus, History, Printer, Save, Clock, X, Plus, Trash2, CalendarHeart as Tooth } from 'lucide-react';
import DentalChart from './components/DentalChart';

interface Treatment {
  id: string;
  name: string;
  description: string;
  date: string;
}

const DentalChartPage = () => {
  const { patientId } = useParams();
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Mock data - in production this would come from your backend
  const patientName = "John Doe";
  const mockTreatments: Treatment[] = [
    {
      id: "1",
      name: "Root Canal",
      description: "Root canal treatment on tooth 14",
      date: "2024-01-15"
    },
    {
      id: "2",
      name: "Filling",
      description: "Composite filling on tooth 26",
      date: "2024-01-10"
    }
  ];

  const handleTreatmentSelect = (treatment: Treatment) => {
    setSelectedTreatment(treatment);
  };

  const handleSave = () => {
    // Implement save functionality
    setHasUnsavedChanges(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dental Chart</h1>
          <p className="text-gray-600">Patient: {patientName}</p>
        </div>
        <div className="flex gap-3">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={handleSave}
            disabled={!hasUnsavedChanges}
          >
            <Save size={20} />
            Save Changes
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            <Printer size={20} />
            Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            <History size={20} />
            History
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-9 bg-white rounded-xl shadow-sm p-6">
          <DentalChart />
        </div>

        <div className="col-span-3 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Treatments</h3>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Plus size={20} />
              </button>
            </div>
            <div className="space-y-2">
              {mockTreatments.map((treatment) => (
                <div
                  key={treatment.id}
                  className={`p-3 rounded-lg cursor-pointer ${
                    selectedTreatment?.id === treatment.id
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleTreatmentSelect(treatment)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{treatment.name}</span>
                    <span className="text-sm text-gray-500">
                      <Clock size={16} className="inline mr-1" />
                      {treatment.date}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{treatment.description}</p>
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