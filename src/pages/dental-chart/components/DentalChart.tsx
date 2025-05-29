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

  const getToothPath = (tooth: Tooth): string => {
  const isUpper = tooth.position === 'upper';

  switch (tooth.type) {
    case 'molar':
      return isUpper
        ? `M20,20
           C25,10 75,10 80,20
           C85,25 85,55 80,60
           C75,70 25,70 20,60
           C15,55 15,25 20,20
           M30,60 L30,90
           M70,60 L70,90
           M25,40 L75,40`
        : `M20,80
           C25,70 75,70 80,80
           C85,85 85,115 80,120
           C75,130 25,130 20,120
           C15,115 15,85 20,80
           M30,120 L30,150
           M70,120 L70,150
           M25,100 L75,100`;

    case 'premolar':
      return isUpper
        ? `M35,20
           C40,10 60,10 65,20
           C70,25 70,55 65,60
           C60,70 40,70 35,60
           C30,55 30,25 35,20
           M40,60 L40,90
           M60,60 L60,90
           M35,40 L65,40`
        : `M35,80
           C40,70 60,70 65,80
           C70,85 70,115 65,120
           C60,130 40,130 35,120
           C30,115 30,85 35,80
           M40,120 L40,150
           M60,120 L60,150
           M35,100 L65,100`;

    case 'canine':
      return isUpper
        ? `M45,20
           C48,10 52,10 55,20
           C60,35 60,55 55,65
           C52,70 48,70 45,65
           C40,55 40,35 45,20
           M50,65 L50,95`
        : `M45,80
           C48,70 52,70 55,80
           C60,95 60,115 55,125
           C52,130 48,130 45,125
           C40,115 40,95 45,80
           M50,125 L50,155`;

    case 'incisor':
      return isUpper
        ? `M40,20
           C42,10 58,10 60,20
           C62,30 62,55 60,65
           C58,70 42,70 40,65
           C38,55 38,30 40,20
           M50,65 L50,95`
        : `M40,80
           C42,70 58,70 60,80
           C62,90 62,115 60,125
           C58,130 42,130 40,125
           C38,115 38,90 40,80
           M50,125 L50,155`;

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