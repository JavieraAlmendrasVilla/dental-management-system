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
  // All teeth use the same simplified schematic: outer circle, inner circle, and diagonal lines
  const cx = 50;
  const cy = 50;
  const outerR = 40;
  const innerR = 10;
  const sqrt2over2 = 0.7071;

  // Coordinates for outer circle
  const outerCircle = `M${cx + outerR},${cy}
    A${outerR},${outerR} 0 1,0 ${cx - outerR},${cy}
    A${outerR},${outerR} 0 1,0 ${cx + outerR},${cy}`;

  // Coordinates for inner circle
  const innerCircle = `M${cx + innerR},${cy}
    A${innerR},${innerR} 0 1,0 ${cx - innerR},${cy}
    A${innerR},${innerR} 0 1,0 ${cx + innerR},${cy}`;

  // Diagonal lines (outer to inner circle border)
  const lines = [
    // NE ↙ SW
    `M${cx + outerR * sqrt2over2},${cy - outerR * sqrt2over2} 
     L${cx + innerR * sqrt2over2},${cy - innerR * sqrt2over2}`,
    
    // NW ↘ SE
    `M${cx - outerR * sqrt2over2},${cy - outerR * sqrt2over2} 
     L${cx - innerR * sqrt2over2},${cy - innerR * sqrt2over2}`,
    
    // SW ↗ NE
    `M${cx - outerR * sqrt2over2},${cy + outerR * sqrt2over2} 
     L${cx - innerR * sqrt2over2},${cy + innerR * sqrt2over2}`,
    
    // SE ↖ NW
    `M${cx + outerR * sqrt2over2},${cy + outerR * sqrt2over2} 
     L${cx + innerR * sqrt2over2},${cy + innerR * sqrt2over2}`
  ];

  return [outerCircle, innerCircle, ...lines].join(' ');
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