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
          ? `M 20,10 
             L 80,10 
             C 85,10 90,15 90,20 
             L 90,60 
             C 90,65 85,70 80,70 
             L 20,70 
             C 15,70 10,65 10,60 
             L 10,20 
             C 10,15 15,10 20,10 
             M 30,70 L 30,150 
             M 70,70 L 70,150
             M 20,30 L 80,30
             M 20,50 L 80,50`
          : `M 20,90 
             L 80,90 
             C 85,90 90,95 90,100 
             L 90,140 
             C 90,145 85,150 80,150 
             L 20,150 
             C 15,150 10,145 10,140 
             L 10,100 
             C 10,95 15,90 20,90 
             M 30,10 L 30,90 
             M 70,10 L 70,90
             M 20,110 L 80,110
             M 20,130 L 80,130`;
      
      case 'premolar':
        return isUpper
          ? `M 35,10 
             L 65,10 
             C 70,10 75,15 75,20 
             L 75,60 
             C 75,65 70,70 65,70 
             L 35,70 
             C 30,70 25,65 25,60 
             L 25,20 
             C 25,15 30,10 35,10 
             M 40,70 L 40,150 
             M 60,70 L 60,150
             M 35,30 L 65,30
             M 35,50 L 65,50`
          : `M 35,90 
             L 65,90 
             C 70,90 75,95 75,100 
             L 75,140 
             C 75,145 70,150 65,150 
             L 35,150 
             C 30,150 25,145 25,140 
             L 25,100 
             C 25,95 30,90 35,90 
             M 40,10 L 40,90 
             M 60,10 L 60,90
             M 35,110 L 65,110
             M 35,130 L 65,130`;
      
      case 'canine':
        return isUpper
          ? `M 40,10 
             L 60,10 
             C 65,10 70,15 70,20 
             L 70,60 
             C 70,65 65,70 60,70 
             L 40,70 
             C 35,70 30,65 30,60 
             L 30,20 
             C 30,15 35,10 40,10 
             M 50,70 L 50,150`
          : `M 40,90 
             L 60,90 
             C 65,90 70,95 70,100 
             L 70,140 
             C 70,145 65,150 60,150 
             L 40,150 
             C 35,150 30,145 30,140 
             L 30,100 
             C 30,95 35,90 40,90 
             M 50,10 L 50,90`;
      
      case 'incisor':
        return isUpper
          ? `M 40,10 
             L 60,10 
             C 65,10 70,15 70,20 
             L 70,60 
             C 70,65 65,70 60,70 
             L 40,70 
             C 35,70 30,65 30,60 
             L 30,20 
             C 30,15 35,10 40,10 
             M 50,70 L 50,150`
          : `M 40,90 
             L 60,90 
             C 65,90 70,95 70,100 
             L 70,140 
             C 70,145 65,150 60,150 
             L 40,150 
             C 35,150 30,145 30,140 
             L 30,100 
             C 30,95 35,90 40,90 
             M 50,10 L 50,90`;
      
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