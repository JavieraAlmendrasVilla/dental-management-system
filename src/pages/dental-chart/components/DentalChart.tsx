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
  molar: 'M4,2 C2,2 0,3.5 0,6 C0,7.5 0.5,8.5 1.5,9.5 C2.5,10.5 4,11 4,12 C4,13 2.5,13.5 1.5,14.5 C0.5,15.5 0,16.5 0,18 C0,20.5 2,22 4,22 C6,22 8,20.5 8,18 C8,16.5 7.5,15.5 6.5,14.5 C5.5,13.5 4,13 4,12 C4,11 5.5,10.5 6.5,9.5 C7.5,8.5 8,7.5 8,6 C8,3.5 6,2 4,2 Z M4,4 C5,4 6,4.5 6,6 C6,7 5.5,7.5 5,8 C4.5,8.5 4,9 4,9.5 C4,10 4.5,10.5 5,11 C5.5,11.5 6,12 6,13 C6,14.5 5,15 4,15 C3,15 2,14.5 2,13 C2,12 2.5,11.5 3,11 C3.5,10.5 4,10 4,9.5 C4,9 3.5,8.5 3,8 C2.5,7.5 2,7 2,6 C2,4.5 3,4 4,4 Z',
  premolar: 'M4,2 C2,2 0,3.5 0,6 C0,7.5 0.5,8.5 1.5,9.5 C2.5,10.5 4,11 4,12 C4,13 2.5,13.5 1.5,14.5 C0.5,15.5 0,16.5 0,18 C0,20.5 2,22 4,22 C6,22 8,20.5 8,18 C8,16.5 7.5,15.5 6.5,14.5 C5.5,13.5 4,13 4,12 C4,11 5.5,10.5 6.5,9.5 C7.5,8.5 8,7.5 8,6 C8,3.5 6,2 4,2 Z M4,4 C5,4 6,4.5 6,6 C6,7 5.5,7.5 5,8 C4.5,8.5 4,9 4,9.5 C4,10 4.5,10.5 5,11 C5.5,11.5 6,12 6,13 C6,14.5 5,15 4,15 C3,15 2,14.5 2,13 C2,12 2.5,11.5 3,11 C3.5,10.5 4,10 4,9.5 C4,9 3.5,8.5 3,8 C2.5,7.5 2,7 2,6 C2,4.5 3,4 4,4 Z',
  canine: 'M4,2 C2,2 0,3.5 0,6 C0,8 1,9.5 2,10.5 C3,11.5 4,12 4,13 C4,14 3,14.5 2,15.5 C1,16.5 0,18 0,20 C0,21.5 2,22 4,22 C6,22 8,21.5 8,20 C8,18 7,16.5 6,15.5 C5,14.5 4,14 4,13 C4,12 5,11.5 6,10.5 C7,9.5 8,8 8,6 C8,3.5 6,2 4,2 Z M4,4 C5,4 6,4.5 6,6 C6,7 5.5,7.5 5,8 C4.5,8.5 4,9 4,9.5 C4,10 4.5,10.5 5,11 C5.5,11.5 6,12 6,13 C6,14.5 5,15 4,15 C3,15 2,14.5 2,13 C2,12 2.5,11.5 3,11 C3.5,10.5 4,10 4,9.5 C4,9 3.5,8.5 3,8 C2.5,7.5 2,7 2,6 C2,4.5 3,4 4,4 Z',
  incisor: 'M4,2 C2,2 0,3.5 0,6 C0,8 1,9.5 2,10.5 C3,11.5 4,12 4,13 C4,14 3,14.5 2,15.5 C1,16.5 0,18 0,20 C0,21.5 2,22 4,22 C6,22 8,21.5 8,20 C8,18 7,16.5 6,15.5 C5,14.5 4,14 4,13 C4,12 5,11.5 6,10.5 C7,9.5 8,8 8,6 C8,3.5 6,2 4,2 Z M4,4 C5,4 6,4.5 6,6 C6,7 5.5,7.5 5,8 C4.5,8.5 4,9 4,9.5 C4,10 4.5,10.5 5,11 C5.5,11.5 6,12 6,13 C6,14.5 5,15 4,15 C3,15 2,14.5 2,13 C2,12 2.5,11.5 3,11 C3.5,10.5 4,10 4,9.5 C4,9 3.5,8.5 3,8 C2.5,7.5 2,7 2,6 C2,4.5 3,4 4,4 Z'
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
      className="flex flex-col items-center mx-1 cursor-pointer group"
      onClick={() => handleToothClick(tooth.id)}
    >
      <div className="relative w-10 h-14">
        <svg
          viewBox="0 0 8 24"
          className={`w-full h-full transition-transform ${
            tooth.position === 'lower' ? 'rotate-180' : ''
          } group-hover:scale-110`}
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
      <span className="text-xs mt-1 font-medium">{tooth.name}</span>
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
      <div className="w-full border-t-2 border-dashed border-gray-400 mb-8"></div>
      
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