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

const TOOTH_PATHS = {
  molar: 'M3,2 C1.5,2 0,3 0,5.5 C0,7 1,8.5 2,9.5 C3,10.5 4,11 4,12 C4,13 3,13.5 2,14.5 C1,15.5 0,17 0,18.5 C0,21 1.5,22 3,22 C4.5,22 6,21 6,18.5 C6,17 5,15.5 4,14.5 C3,13.5 2,13 2,12 C2,11 3,10.5 4,9.5 C5,8.5 6,7 6,5.5 C6,3 4.5,2 3,2z',
  premolar: 'M3,2 C1.5,2 0,3 0,5.5 C0,7 0.5,8 2,9 C3.5,10 4,10.5 4,12 C4,13.5 3.5,14 2,15 C0.5,16 0,17 0,18.5 C0,21 1.5,22 3,22 C4.5,22 6,21 6,18.5 C6,17 5.5,16 4,15 C2.5,14 2,13.5 2,12 C2,10.5 2.5,10 4,9 C5.5,8 6,7 6,5.5 C6,3 4.5,2 3,2z',
  canine: 'M3,2 C1.5,2 0,3 0,5.5 C0,7 0.5,8 1.5,9 C2.5,10 3,10.5 3,12 C3,13.5 2.5,14 1.5,15 C0.5,16 0,17 0,18.5 C0,21 1.5,22 3,22 C4.5,22 6,21 6,18.5 C6,17 5.5,16 4.5,15 C3.5,14 3,13.5 3,12 C3,10.5 3.5,10 4.5,9 C5.5,8 6,7 6,5.5 C6,3 4.5,2 3,2z',
  incisor: 'M3,2 C1.5,2 0,3 0,5.5 C0,7 0.5,8 1,9 C1.5,10 2,10.5 2,12 C2,13.5 1.5,14 1,15 C0.5,16 0,17 0,18.5 C0,21 1.5,22 3,22 C4.5,22 6,21 6,18.5 C6,17 5.5,16 5,15 C4.5,14 4,13.5 4,12 C4,10.5 4.5,10 5,9 C5.5,8 6,7 6,5.5 C6,3 4.5,2 3,2z'
};

// Create adult teeth with proper types
const ADULT_TEETH: Tooth[] = [
  // Upper teeth (1-16)
  ...Array.from({ length: 16 }, (_, index): Tooth => ({
    id: index + 1,
    name: (index + 1).toString(),
    adult: true,
    treatments: [],
    position: 'upper',
    type: index < 3 || index > 12 ? 'molar' 
        : index < 5 || index > 10 ? 'premolar'
        : index < 6 || index > 9 ? 'canine'
        : 'incisor'
  })),
  // Lower teeth (17-32)
  ...Array.from({ length: 16 }, (_, index): Tooth => ({
    id: index + 17,
    name: (index + 17).toString(),
    adult: true,
    treatments: [],
    position: 'lower',
    type: index < 3 || index > 12 ? 'molar'
        : index < 5 || index > 10 ? 'premolar'
        : index < 6 || index > 9 ? 'canine'
        : 'incisor'
  }))
];

const DentalChart: React.FC<DentalChartProps> = ({ selectedTreatment }) => {
  const [teeth, setTeeth] = useState<Tooth[]>(ADULT_TEETH);

  const handleToothClick = (toothId: number) => {
    if (!selectedTreatment) return;
    
    setTeeth((prevTeeth) =>
      prevTeeth.map((tooth) => {
        if (tooth.id === toothId) {
          if (tooth.treatments.includes(selectedTreatment)) {
            return {
              ...tooth,
              treatments: tooth.treatments.filter((t) => t !== selectedTreatment),
            };
          }
          return {
            ...tooth,
            treatments: [...tooth.treatments, selectedTreatment],
          };
        }
        return tooth;
      })
    );
  };

  const getToothColor = (tooth: Tooth) => {
    if (tooth.treatments.length === 0) return '#ffffff';
    return TREATMENT_COLORS[tooth.treatments[tooth.treatments.length - 1]] || '#ffffff';
  };

  const renderTooth = (tooth: Tooth) => (
    <div 
      key={tooth.id}
      className="flex flex-col items-center mx-1 cursor-pointer"
      onClick={() => handleToothClick(tooth.id)}
    >
      <div className="relative w-8 h-12">
        <svg
          viewBox="0 0 6 24"
          className="w-full h-full"
          style={{
            transform: tooth.position === 'lower' ? 'rotate(180deg)' : 'none'
          }}
        >
          <path
            d={TOOTH_PATHS[tooth.type]}
            fill={getToothColor(tooth)}
            stroke={tooth.treatments.length > 0 ? '#000' : '#666'}
            strokeWidth="0.2"
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
      <span className="text-xs mt-1">{tooth.name}</span>
    </div>
  );

  // Group teeth into upper and lower jaws
  const upperTeeth = teeth.slice(0, 16);
  const lowerTeeth = teeth.slice(16, 32);

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-medium mb-4">Adult Teeth</h3>
      
      {/* Upper jaw */}
      <div className="mb-8">
        <div className="flex justify-center mb-2">
          {upperTeeth.slice(0, 8).map(renderTooth)}
        </div>
        <div className="flex justify-center">
          {upperTeeth.slice(8, 16).reverse().map(renderTooth)}
        </div>
      </div>
      
      {/* Jaw separator */}
      <div className="w-full border-t border-dashed border-gray-400 mb-8"></div>
      
      {/* Lower jaw */}
      <div>
        <div className="flex justify-center">
          {lowerTeeth.slice(0, 8).map(renderTooth)}
        </div>
        <div className="flex justify-center mt-2">
          {lowerTeeth.slice(8, 16).reverse().map(renderTooth)}
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