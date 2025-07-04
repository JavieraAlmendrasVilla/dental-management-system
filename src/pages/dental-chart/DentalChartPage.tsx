import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, FilePlus, History, Printer, Save, Clock, X, Plus, Trash2 } from 'lucide-react';
import DentalChart from './components/DentalChart';
import { useLanguage } from '../../lib/i18n/LanguageContext';
import { ADULT_TEETH } from './components/DentalChart';  // adjust the path



const TREATMENT_TYPES = [
  { id: 'caries', name: 'Caries', color: '#dc2626', cost: 0 },
  { id: 'filling', name: 'Filling', color: '#3b82f6', cost: 150 },
  { id: 'crown', name: 'Crown', color: '#f59e0b', cost: 800 },
  { id: 'extraction', name: 'Extraction', color: '#ef4444', cost: 200 },
  { id: 'rootcanal', name: 'Root Canal', color: '#8b5cf6', cost: 1000 },
  { id: 'implant', name: 'Implant', color: '#10b981', cost: 3000 },
  { id: 'bridge', name: 'Bridge', color: '#6366f1', cost: 2000 },
];

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
  const { t } = useLanguage();
  const { patientId } = useParams<{ patientId: string }>();
  const { patientName } = useParams<{ patientName: string }>();
  const [selectedTreatment, setSelectedTreatment] = useState(TREATMENT_TYPES[0].id);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showTreatmentPlanModal, setShowTreatmentPlanModal] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [treatmentPlan, setTreatmentPlan] = useState<TreatmentPlanItem[]>([]);
  const [teethData, setTeethData] = useState<Tooth[]>(ADULT_TEETH);
  const [newTreatmentItem, setNewTreatmentItem] = useState<TreatmentPlanItem>({
    id: '',
    toothNumber: '',
    treatment: TREATMENT_TYPES[0].id,
    cost: TREATMENT_TYPES[0].cost,
    notes: '',
    priority: 'medium'
  });

  const payload = {
  patient_id: parseInt(patientId || '0'),
  teeth: teethData.map((tooth: any) => ({
    id: tooth.id,
    name: tooth.name,
    adult: tooth.adult,
    position: tooth.position,
    type: tooth.type,
    areas: (tooth.areas || []).map((area: any) => ({
        id: tooth.id,
      name: area.name,
      treatment: area.treatment ?? null,
      condition: area.condition ?? null
    }))
  }))
};


  /*const patientName = 'John Smith';*/

  const getTreatmentName = (treatmentId: string) => {
    return t(`dentalChart.treatments.${treatmentId}`);
  };

  const handleSaveChart = async () => {
    try {
      console.log('Saving dental chart:', teethData);
      console.log("Sending payload:", {
  patient_id: parseInt(patientId || '0'),
  teeth: teethData,
});
      const response = await fetch(`http://localhost:8000/dental-chart/${patientId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },


        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to save dental chart: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Saved dental chart response:', data);

      setHasUnsavedChanges(false);
      alert('Dental chart saved successfully!');
    } catch (error) {
      console.error('Error saving dental chart:', error);
      alert('Error saving dental chart. Please try again.');
    }
  };

  const handleTeethUpdate = (updatedTeeth: any[]) => {
    setTeethData(updatedTeeth);
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

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const totalCost = treatmentPlan.reduce((sum, item) => sum + item.cost, 0);

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('dentalChart.title')}</h1>
          <p className="text-muted-foreground">
            {t('dentalChart.patient')} {t('dentalChart.patientId')}: {patientId}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
            <History className="mr-2 h-4 w-4" />
            {t('dentalChart.history')}
          </button>
          <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
            <Printer className="mr-2 h-4 w-4" />
            {t('dentalChart.print')}
          </button>
          {
            <button
              onClick={() => handleSaveChart([])}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
            >
              <Save className="mr-2 h-4 w-4" />
              {t('dentalChart.saveChanges')}
            </button>
          }
        </div>
      </div>

      {/* Schedule Appointment Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">{t('dentalChart.schedule.title')}</h2>
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleScheduleAppointment} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t('dentalChart.schedule.date')}</label>
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
                <label className="block text-sm font-medium mb-1">{t('dentalChart.schedule.time')}</label>
                <select
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">{t('dentalChart.schedule.selectTime')}</option>
                  {TIME_SLOTS.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('dentalChart.schedule.doctor')}</label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">{t('dentalChart.schedule.selectDoctor')}</option>
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
                  {t('dentalChart.schedule.cancel')}
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
                >
                  {t('dentalChart.schedule.schedule')}
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
              <h2 className="text-lg font-semibold">{t('dentalChart.treatmentPlanModal.title')}</h2>
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
                  <label className="block text-sm font-medium mb-1">{t('dentalChart.treatmentPlanModal.toothNumber')}</label>
                  <input
                    type="text"
                    value={newTreatmentItem.toothNumber}
                    onChange={(e) => setNewTreatmentItem({...newTreatmentItem, toothNumber: e.target.value})}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder={t('dentalChart.treatmentPlanModal.toothPlaceholder')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t('dentalChart.treatmentPlanModal.treatment')}</label>
                  <select
                    value={newTreatmentItem.treatment}
                    onChange={(e) => handleTreatmentChange(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {TREATMENT_TYPES.map((treatment) => (
                      <option key={treatment.id} value={treatment.id}>
                        {getTreatmentName(treatment.id)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t('dentalChart.treatmentPlanModal.cost')}</label>
                  <input
                    type="number"
                    value={newTreatmentItem.cost}
                    onChange={(e) => setNewTreatmentItem({...newTreatmentItem, cost: Number(e.target.value)})}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t('dentalChart.treatmentPlanModal.priority')}</label>
                  <select
                    value={newTreatmentItem.priority}
                    onChange={(e) => setNewTreatmentItem({...newTreatmentItem, priority: e.target.value as 'high' | 'medium' | 'low'})}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="high">{t('dentalChart.treatmentPlanModal.priorities.high')}</option>
                    <option value="medium">{t('dentalChart.treatmentPlanModal.priorities.medium')}</option>
                    <option value="low">{t('dentalChart.treatmentPlanModal.priorities.low')}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('dentalChart.treatmentPlanModal.notes')}</label>
                <textarea
                  value={newTreatmentItem.notes}
                  onChange={(e) => setNewTreatmentItem({...newTreatmentItem, notes: e.target.value})}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  rows={2}
                  placeholder={t('dentalChart.treatmentPlanModal.notesPlaceholder')}
                />
              </div>
              <button
                onClick={handleAddTreatmentItem}
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
              >
                <Plus className="mr-2 h-4 w-4" />
                {t('dentalChart.treatmentPlanModal.addTreatment')}
              </button>

              {/* Treatment List */}
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">{t('dentalChart.treatmentPlanModal.treatmentItems')}</h3>
                <div className="border rounded-md divide-y">
                  {treatmentPlan.map((item) => (
                    <div key={item.id} className="p-3 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">#{item.toothNumber}</span>
                          <span className="text-muted-foreground">
                            {getTreatmentName(item.treatment)}
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
                            {t(`dentalChart.treatmentPlanModal.priorities.${item.priority}`)}
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
                      {t('dentalChart.treatmentPlanModal.noTreatments')}
                    </div>
                  )}
                </div>
              </div>

              {/* Total Cost */}
              {treatmentPlan.length > 0 && (
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="font-medium">{t('dentalChart.treatmentPlanModal.totalCost')}</span>
                  <span className="text-lg font-bold">${totalCost}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  onClick={() => setShowTreatmentPlanModal(false)}
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
                >
                  {t('common.cancel')}
                </button>
                <button
                  onClick={handleSaveTreatmentPlan}
                  disabled={treatmentPlan.length === 0}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('dentalChart.treatmentPlanModal.save')}
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
              <h2 className="font-semibold">{t('dentalChart.treatmentTypes')}</h2>
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
                  {getTreatmentName(treatment.id)}
                </button>
              ))}
            </div>
          </div>

          {/* Patient Info */}
          <div className="rounded-lg border bg-card">
            <div className="p-4 border-b">
              <h2 className="font-semibold">{t('dentalChart.patientInformation')}</h2>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{t('dentalChart.lastUpdated')}</p>
                <p className="text-sm">November 15, 2023</p>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-muted-foreground">{t('dentalChart.nextAppointment')}</p>
                <p className="text-sm">December 15, 2023</p>
              </div>
              <div className="mt-4">
                <button 
                  onClick={() => setShowScheduleModal(true)}
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium w-full hover:bg-muted transition-colors"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {t('dentalChart.scheduleAppointment')}
                </button>
              </div>
            </div>
          </div>

          {/* Treatment Plan */}
          <div className="rounded-lg border bg-card">
            <div className="p-4 border-b">
              <h2 className="font-semibold">{t('dentalChart.treatmentPlan')}</h2>
            </div>
            <div className="p-4">
              <button 
                onClick={() => setShowTreatmentPlanModal(true)}
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium w-full text-white hover:bg-primary-dark transition-colors"
              >
                <FilePlus className="mr-2 h-4 w-4" />
                {t('dentalChart.createTreatmentPlan')}
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
                initialTeeth={teethData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DentalChartPage;