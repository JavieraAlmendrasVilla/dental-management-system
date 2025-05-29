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

const DentalChart: React.FC<DentalChartProps> = ({ selectedTreatment }) => {
  const [teeth, setTeeth] = useState<Tooth[]>(ADULT_TEETH);

  const handleToothClick = (toothId: number) => {
    if (!selectedTreatment) return;
    
    setTeeth((prevTeeth) =>
      prevTeeth.map((tooth) =>
        tooth.id === toothId
          ? {
              ...tooth,
              treatments: tooth.treatments.includes(selectedTreatment)
                ? tooth.treatments.filter((t) => t !== selectedTreatment)
                : [...tooth.treatments, selectedTreatment],
            }
          : tooth
      )
    );
  };

  const getToothColor = (tooth: Tooth) => {
    if (tooth.treatments.length === 0) return '#ffffff';
    return TREATMENT_COLORS[tooth.treatments[tooth.treatments.length - 1]] || '#ffffff';
  };

  const getToothPath = (tooth: Tooth) => {
    const isUpper = tooth.position === 'upper';

    switch (tooth.type) {
      case 'molar':
        return isUpper
          ? 'M20,10 L80,10 Q90,10 90,20 L90,70 Q90,80 80,80 L20,80 Q10,80 10,70 L10,20 Q10,10 20,10 Z M30,80 L30,150 M70,80 L70,150'
          : 'M20,80 L80,80 Q90,80 90,90 L90,140 Q90,150 80,150 L20,150 Q10,150 10,140 L10,90 Q10,80 20,80 Z M30,10 L30,80 M70,10 L70,80';
      
      case 'premolar':
        return isUpper
          ? 'M35,10 L65,10 Q75,10 75,20 L75,70 Q75,80 65,80 L35,80 Q25,80 25,70 L25,20 Q25,10 35,10 Z M40,80 L40,150 M60,80 L60,150'
          : 'M35,80 L65,80 Q75,80 75,90 L75,140 Q75,150 65,150 L35,150 Q25,150 25,140 L25,90 Q25,80 35,80 Z M40,10 L40,80 M60,10 L60,80';
      
      case 'canine':
        return isUpper
          ? 'M40,10 L60,10 Q70,10 70,20 L70,70 Q70,80 60,80 L40,80 Q30,80 30,70 L30,20 Q30,10 40,10 Z M45,80 L45,150'
          : 'M40,80 L60,80 Q70,80 70,90 L70,140 Q70,150 60,150 L40,150 Q30,150 30,140 L30,90 Q30,80 40,80 Z M45,10 L45,80';
      
      case 'incisor':
        return isUpper
          ? 'M40,10 L60,10 Q65,10 65,15 L65,70 Q65,80 55,80 L45,80 Q35,80 35,70 L35,15 Q35,10 40,10 Z M45,80 L45,150'
          : 'M40,80 L60,80 Q65,80 65,85 L65,140 Q65,150 55,150 L45,150 Q35,150 35,140 L35,85 Q35,80 40,80 Z M45,10 L45,80';
      
      default:
        return '';
    }
  };

  const renderTooth = (tooth: Tooth) => {
    return (
      <div 
        key={tooth.id}
        className="flex flex-col items-center mx-1 cursor-pointer group"
        onClick={() => handleToothClick(tooth.id)}
      >
        <span className="text-xs font-medium mb-1">{tooth.name}</span>
        <div className="relative w-12 h-16">
          <svg
            viewBox="0 0 100 160"
            className="w-full h-full transition-transform group-hover:scale-110"
          >
            <path
              d={getToothPath(tooth)}
              fill={getToothColor(tooth)}
              stroke="#666"
              strokeWidth="2"
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
      
      <div className="mt-8 text-sm text-center text-muted-foreground">
        {selectedTreatment ? (
          <>Click on a tooth to add or remove {selectedTreatment}</>
        ) : (
          <>Select a treatment from the list to begin</>
        )}
      </div>
    </div>
  );
};

export default DentalChart;