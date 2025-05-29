import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, FilePlus, History, Printer, Save, Clock, X, Plus, Trash2 } from 'lucide-react';
import DentalChart from './components/DentalChart';

const TREATMENT_TYPES = [
  { id: 'filling', name: 'Filling', color: '#3b82f6', cost: 150 },
  { id: 'crown', name: 'Crown', color: '#f59e0b', cost: 800 },
  { id: 'extraction', name: 'Extraction', color: '#ef4444', cost: 200 },
  { id: 'root-canal', name: 'Root Canal', color: '#8b5cf6', cost: 1000 },
  { id: 'implant', name: 'Implant', color: '#10b981', cost: 3000 },
  { id: 'bridge', name: 'Bridge', color: '#6366f1', cost: 2000 },
];

// Available time slots
const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
];

interface TreatmentPlanItem {
  id: string;
  toothNumber: string;
  treatment: string;
  cost: number;
  notes: string;
  priority: 'high' | 'medium' | 'low';
}

const DentalChartPage = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [selectedTreatment, setSelectedTreatment] = useState(TREATMENT_TYPES[0].id);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showTreatmentPlanModal, setShowTreatmentPlanModal] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [treatmentPlan, setTreatmentPlan] = useState<TreatmentPlanItem[]>([]);
  const [newTreatmentItem, setNewTreatmentItem] = useState<TreatmentPlanItem>({
    id: '',
    toothNumber: '',
    treatment: TREATMENT_TYPES[0].id,
    cost: TREATMENT_TYPES[0].cost,
    notes: '',
    priority: 'medium'
  });

  const patientName = 'John Smith';

  const handleSaveChart = (teeth: any) => {
    console.log('Saving dental chart:', teeth);
    setHasUnsavedChanges(false);
    alert('Dental chart saved successfully!');
  };

  const handleTeethUpdate = () => {
    setHasUnsavedChanges(true);
  };

  const handleScheduleAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Scheduling appointment:', {
      patientId,
      date: appointmentDate,
      time: appointmentTime,
      doctor: selectedDoctor
    });
    alert('Appointment scheduled successfully!');
    setShowScheduleModal(false);
  };

  const handleAddTreatmentItem = () => {
    if (!newTreatmentItem.toothNumber || !newTreatmentItem.treatment) return;

    const newItem = {
      ...newTreatmentItem,
      id: Math.random().toString(36).substring(7)
    };

    setTreatmentPlan([...treatmentPlan, newItem]);
    setNewTreatmentItem({
      id: '',
      toothNumber: '',
      treatment: TREATMENT_TYPES[0].id,
      cost: TREATMENT_TYPES[0].cost,
      notes: '',
      priority: 'medium'
    });
  };

  const handleRemoveTreatmentItem = (id: string) => {
    setTreatmentPlan(treatmentPlan.filter(item => item.id !== id));
  };

  const handleTreatmentChange = (treatmentId: string) => {
    const treatment = TREATMENT_TYPES.find(t => t.id === treatmentId);
    if (treatment) {
      setNewTreatmentItem({
        ...newTreatmentItem,
        treatment: treatmentId,
        cost: treatment.cost
      });
    }
  };

  const handleSaveTreatmentPlan = () => {
    console.log('Saving treatment plan:', treatmentPlan);
    alert('Treatment plan saved successfully!');
    setShowTreatmentPlanModal(false);
  };

  // Get tomorrow's date as the minimum date for scheduling
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const totalCost = treatmentPlan.reduce((sum, item) => sum + item.cost, 0);

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dental Chart</h1>
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
              onClick={() => handleSaveChart([])}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </button>
          )}
        </div>
      </div>

      {/* Schedule Appointment Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Schedule Appointment</h2>
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleScheduleAppointment} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  min={minDate}
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <select
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">Select a time</option>
                  {TIME_SLOTS.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Doctor</label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">Select a doctor</option>
                  <option value="dr-morgan">Dr. Morgan</option>
                  <option value="dr-anderson">Dr. Anderson</option>
                </select>
              </div>
              <div className="pt-4 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
                >
                  Schedule Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Treatment Plan Modal */}
      {showTreatmentPlanModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg shadow-lg w-full max-w-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Create Treatment Plan</h2>
              <button 
                onClick={() => setShowTreatmentPlanModal(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              {/* Add Treatment Form */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Tooth #</label>
                  <input
                    type="text"
                    value={newTreatmentItem.toothNumber}
                    onChange={(e) => setNewTreatmentItem({...newTreatmentItem, toothNumber: e.target.value})}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="e.g., 18"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Treatment</label>
                  <select
                    value={newTreatmentItem.treatment}
                    onChange={(e) => handleTreatmentChange(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {TREATMENT_TYPES.map((treatment) => (
                      <option key={treatment.id} value={treatment.id}>
                        {treatment.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Cost ($)</label>
                  <input
                    type="number"
                    value={newTreatmentItem.cost}
                    onChange={(e) => setNewTreatmentItem({...newTreatmentItem, cost: Number(e.target.value)})}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Priority</label>
                  <select
                    value={newTreatmentItem.priority}
                    onChange={(e) => setNewTreatmentItem({...newTreatmentItem, priority: e.target.value as 'high' | 'medium' | 'low'})}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea
                  value={newTreatmentItem.notes}
                  onChange={(e) => setNewTreatmentItem({...newTreatmentItem, notes: e.target.value})}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  rows={2}
                  placeholder="Add any additional notes..."
                />
              </div>
              <button
                onClick={handleAddTreatmentItem}
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Treatment
              </button>

              {/* Treatment List */}
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Treatment Items</h3>
                <div className="border rounded-md divide-y">
                  {treatmentPlan.map((item) => (
                    <div key={item.id} className="p-3 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Tooth #{item.toothNumber}</span>
                          <span className="text-muted-foreground">
                            {TREATMENT_TYPES.find(t => t.id === item.treatment)?.name}
                          </span>
                          <span
                            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                              item.priority === 'high'
                                ? 'bg-error/10 text-error'
                                : item.priority === 'medium'
                                ? 'bg-warning/10 text-warning'
                                : 'bg-success/10 text-success'
                            }`}
                          >
                            {item.priority}
                          </span>
                        </div>
                        {item.notes && (
                          <p className="text-sm text-muted-foreground mt-1">{item.notes}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-medium">${item.cost}</span>
                        <button
                          onClick={() => handleRemoveTreatmentItem(item.id)}
                          className="text-muted-foreground hover:text-error transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {treatmentPlan.length === 0 && (
                    <div className="p-4 text-center text-muted-foreground">
                      No treatments added yet
                    </div>
                  )}
                </div>
              </div>

              {/* Total Cost */}
              {treatmentPlan.length > 0 && (
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="font-medium">Total Cost</span>
                  <span className="text-lg font-bold">${totalCost}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  onClick={() => setShowTreatmentPlanModal(false)}
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveTreatmentPlan}
                  disabled={treatmentPlan.length === 0}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Treatment Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                <button 
                  onClick={() => setShowScheduleModal(true)}
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium w-full hover:bg-muted transition-colors"
                >
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
              <button 
                onClick={() => setShowTreatmentPlanModal(true)}
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium w-full text-white hover:bg-primary-dark transition-colors"
              >
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
              <DentalChart 
                selectedTreatment={selectedTreatment}
                onSave={handleSaveChart}
                onUpdate={handleTeethUpdate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DentalChartPage;