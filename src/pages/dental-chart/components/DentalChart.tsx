import React, { useState } from 'react';

interface Tooth {
  id: number;
  name: string;
  adult: boolean;
  treatments: string[];
  position: 'upper' | 'lower';
  type: 'molar' | 'premolar' | 'canine' | 'incisor';
}

interface DentalChartProps {
  selectedTreatment: string;
  onSave: (teeth: Tooth[]) => void;
  initialTeeth?: Tooth[];
}

const TREATMENT_COLORS: Record<string, string> = {
  'filling': '#3b82f6',
  'crown': '#f59e0b',
  'extraction': '#ef4444',
  'root-canal': '#8b5cf6',
  'implant': '#10b981',
  'bridge': '#6366f1',
};

// Create adult teeth with FDI numbering system
const ADULT_TEETH: Tooth[] = [
  // Upper Right (18-11)
  ...Array.from({ length: 8 }, (_, i): Tooth => ({
    id: 18 - i,
    name: (18 - i).toString(),
    adult: true,
    treatments: [],
    position: 'upper',
    type: i < 3 ? 'molar' : i < 5 ? 'premolar' : i < 6 ? 'canine' : 'incisor'
  })),
  // Upper Left (21-28)
  ...Array.from({ length: 8 }, (_, i): Tooth => ({
    id: 21 + i,
    name: (21 + i).toString(),
    adult: true,
    treatments: [],
    position: 'upper',
    type: i < 2 ? 'incisor' : i < 3 ? 'canine' : i < 5 ? 'premolar' : 'molar'
  })),
  // Lower Left (38-31)
  ...Array.from({ length: 8 }, (_, i): Tooth => ({
    id: 38 - i,
    name: (38 - i).toString(),
    adult: true,
    treatments: [],
    position: 'lower',
    type: i < 3 ? 'molar' : i < 5 ? 'premolar' : i < 6 ? 'canine' : 'incisor'
  })),
  // Lower Right (41-48)
  ...Array.from({ length: 8 }, (_, i): Tooth => ({
    id: 41 + i,
    name: (41 + i).toString(),
    adult: true,
    treatments: [],
    position: 'lower',
    type: i < 2 ? 'incisor' : i < 3 ? 'canine' : i < 5 ? 'premolar' : 'molar'
  }))
];

const DentalChart: React.FC<DentalChartProps> = ({ selectedTreatment, onSave, initialTeeth }) => {
  const [teeth, setTeeth] = useState<Tooth[]>(initialTeeth || ADULT_TEETH);
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleToothClick = (toothId: number) => {
    setSelectedTooth(toothId);
  };

  const handleTreatmentApply = () => {
    if (!selectedTooth || !selectedTreatment) return;
    
    setTeeth((prevTeeth) =>
      prevTeeth.map((tooth) =>
        tooth.id === selectedTooth
          ? {
              ...tooth,
              treatments: tooth.treatments.includes(selectedTreatment)
                ? tooth.treatments.filter((t) => t !== selectedTreatment)
                : [...tooth.treatments, selectedTreatment],
            }
          : tooth
      )
    );
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    onSave(teeth);
    setHasUnsavedChanges(false);
  };

  const getToothColor = (tooth: Tooth) => {
    if (tooth.id === selectedTooth) return '#e5e7eb'; // Light gray for selected tooth
    if (tooth.treatments.length === 0) return '#ffffff';
    return TREATMENT_COLORS[tooth.treatments[tooth.treatments.length - 1]] || '#ffffff';
  };

  const getToothPath = (tooth: Tooth): string => {
    const type = tooth.type;
    const position = tooth.position;
    
    // Base dimensions
    const width = 40;
    const height = position === 'upper' ? 60 : 60;
    const x = 30;
    const y = position === 'upper' ? 20 : 20;

    switch (type) {
      case 'molar':
        return `
          M ${x} ${y}
          h ${width}
          v ${height}
          h -${width}
          Z
          M ${x} ${y + height * 0.25}
          h ${width}
          M ${x} ${y + height * 0.5}
          h ${width}
          M ${x} ${y + height * 0.75}
          h ${width}
          M ${x + width * 0.33} ${y}
          v ${height}
          M ${x + width * 0.67} ${y}
          v ${height}
        `;

      case 'premolar':
        return `
          M ${x} ${y}
          h ${width}
          v ${height}
          h -${width}
          Z
          M ${x} ${y + height * 0.33}
          h ${width}
          M ${x} ${y + height * 0.67}
          h ${width}
          M ${x + width * 0.5} ${y}
          v ${height}
        `;

      case 'canine':
        return `
          M ${x} ${y}
          h ${width}
          l -${width/2} ${height}
          l -${width/2} -${height}
          Z
        `;

      case 'incisor':
        return `
          M ${x} ${y}
          h ${width}
          v ${height * 0.8}
          l -${width/2} ${height * 0.2}
          l -${width/2} -${height * 0.2}
          v -${height * 0.8}
          Z
        `;

      default:
        return '';
    }
  };

  const renderTooth = (tooth: Tooth) => {
    const isSelected = tooth.id === selectedTooth;
    
    return (
      <div 
        key={tooth.id}
        className="flex flex-col items-center mx-1 cursor-pointer group"
        onClick={() => handleToothClick(tooth.id)}
      >
        <span className="text-xs font-medium mb-1">{tooth.name}</span>
        <div className="relative w-12 h-16">
          <svg
            viewBox="0 0 100 100"
            className={`w-full h-full transition-transform ${
              isSelected ? 'scale-110' : 'group-hover:scale-105'
            }`}
          >
            <path
              d={getToothPath(tooth)}
              fill={getToothColor(tooth)}
              stroke={isSelected ? '#3b82f6' : '#666'}
              strokeWidth={isSelected ? '3' : '2'}
            />
          </svg>
          {tooth.treatments.length > 0 && (
            <div className="absolute -top-2 -right-2 h-4 w-4 bg-primary rounded-full flex items-center justify-center">
              <span className="text-[10px] text-white font-bold">
                {tooth.treatments.length}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Group teeth into quadrants
  const upperRight = teeth.filter(t => t.id >= 11 && t.id <= 18).sort((a, b) => b.id - a.id);
  const upperLeft = teeth.filter(t => t.id >= 21 && t.id <= 28).sort((a, b) => a.id - b.id);
  const lowerLeft = teeth.filter(t => t.id >= 31 && t.id <= 38).sort((a, b) => a.id - b.id);
  const lowerRight = teeth.filter(t => t.id >= 41 && t.id <= 48).sort((a, b) => b.id - a.id);

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-medium mb-4">Adult Teeth (FDI System)</h3>
      
      {/* Upper jaw */}
      <div className="mb-8">
        <div className="flex justify-center mb-2">
          {upperRight.map(renderTooth)}
        </div>
        <div className="flex justify-center">
          {upperLeft.map(renderTooth)}
        </div>
      </div>
      
      {/* Jaw separator */}
      <div className="w-full border-t-2 border-dashed border-gray-400 mb-8"></div>
      
      {/* Lower jaw */}
      <div>
        <div className="flex justify-center">
          {lowerLeft.map(renderTooth)}
        </div>
        <div className="flex justify-center mt-2">
          {lowerRight.map(renderTooth)}
        </div>
      </div>

      {/* Treatment Application */}
      {selectedTooth && (
        <div className="mt-8 flex items-center gap-4">
          <span className="text-sm font-medium">
            Selected Tooth: {teeth.find(t => t.id === selectedTooth)?.name}
          </span>
          <button
            onClick={handleTreatmentApply}
            disabled={!selectedTreatment}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Apply {selectedTreatment || 'Treatment'}
          </button>
          {hasUnsavedChanges && (
            <button
              onClick={handleSave}
              className="inline-flex items-center justify-center rounded-md bg-success px-4 py-2 text-sm font-medium text-white hover:bg-success/90 transition-colors"
            >
              Save Changes
            </button>
          )}
        </div>
      )}
      
      <div className="mt-4 text-sm text-center text-muted-foreground">
        {!selectedTooth ? (
          <>Click on a tooth to select it</>
        ) : !selectedTreatment ? (
          <>Select a treatment to apply to tooth {teeth.find(t => t.id === selectedTooth)?.name}</>
        ) : (
          <>Click Apply to add {selectedTreatment} to tooth {teeth.find(t => t.id === selectedTooth)?.name}</>
        )}
      </div>
    </div>
  );
};

export default DentalChart;