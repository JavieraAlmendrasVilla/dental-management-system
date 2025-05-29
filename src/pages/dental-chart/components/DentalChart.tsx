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
  filling: '#3b82f6',
  crown: '#f59e0b',
  extraction: '#ef4444',
  'root-canal': '#8b5cf6',
  implant: '#10b981',
  bridge: '#6366f1',
};

const ADULT_TEETH: Tooth[] = [
  // Upper Right (FDI 18–11)
  ...Array.from({ length: 8 }, (_, i): Tooth => ({
    id: 18 - i,
    name: (18 - i).toString(),
    adult: true,
    treatments: [],
    position: 'upper',
    type: i < 3 ? 'molar' : i < 5 ? 'premolar' : i < 6 ? 'canine' : 'incisor',
  })),
  // Upper Left (FDI 21–28)
  ...Array.from({ length: 8 }, (_, i): Tooth => ({
    id: 21 + i,
    name: (21 + i).toString(),
    adult: true,
    treatments: [],
    position: 'upper',
    type: i < 2 ? 'incisor' : i < 3 ? 'canine' : i < 5 ? 'premolar' : 'molar',
  })),
  // Lower Left (FDI 38–31)
  ...Array.from({ length: 8 }, (_, i): Tooth => ({
    id: 38 - i,
    name: (38 - i).toString(),
    adult: true,
    treatments: [],
    position: 'lower',
    type: i < 3 ? 'molar' : i < 5 ? 'premolar' : i < 6 ? 'canine' : 'incisor',
  })),
  // Lower Right (FDI 41–48)
  ...Array.from({ length: 8 }, (_, i): Tooth => ({
    id: 41 + i,
    name: (41 + i).toString(),
    adult: true,
    treatments: [],
    position: 'lower',
    type: i < 2 ? 'incisor' : i < 3 ? 'canine' : i < 5 ? 'premolar' : 'molar',
  })),
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

  const renderTooth = (tooth: Tooth) => {
    const isUpper = tooth.position === 'upper';

    return (
      <div
        key={tooth.id}
        className="flex flex-col items-center mx-1 cursor-pointer group"
        onClick={() => handleToothClick(tooth.id)}
      >
        <span className="text-xs font-medium mb-1">{tooth.name}</span>
        <div className="relative w-10 h-14 sm:w-12 sm:h-16 md:w-14 md:h-20">
          <svg viewBox="0 0 100 160" className="w-full h-full transition-transform group-hover:scale-110">
            {/* Crown */}
            <path
              d={isUpper
                ? `M50,10 C30,10 10,25 10,50 C10,65 20,75 35,85 C45,92 50,95 50,100 C50,95 55,92 65,85 C80,75 90,65 90,50 C90,25 70,10 50,10 Z`
                : `M50,60 C30,60 10,75 10,100 C10,115 20,125 35,135 C45,142 50,145 50,150 C50,145 55,142 65,135 C80,125 90,115 90,100 C90,75 70,60 50,60 Z`
              }
              fill={getToothColor(tooth)}
              stroke="#666"
              strokeWidth="2"
            />
            {/* Root */}
            <path
              d={isUpper
                ? `M35,85 C45,92 50,95 50,100 L50,150 M65,85 C55,92 50,95 50,100`
                : `M35,135 C45,142 50,145 50,150 L50,100 M65,135 C55,142 50,145 50,150`
              }
              fill="none"
              stroke="#666"
              strokeWidth="2"
              strokeLinecap="round"
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

  const quadrant1 = teeth.filter(t => t.id >= 11 && t.id <= 18).sort((a, b) => b.id - a.id);
  const quadrant2 = teeth.filter(t => t.id >= 21 && t.id <= 28).sort((a, b) => a.id - b.id);
  const quadrant3 = teeth.filter(t => t.id >= 31 && t.id <= 38).sort((a, b) => a.id - b.id);
  const quadrant4 = teeth.filter(t => t.id >= 41 && t.id <= 48).sort((a, b) => b.id - a.id);

  return (
    <div className="flex flex-col items-center w-full px-2 sm:px-4">
      <h3 className="text-lg font-medium mb-4 text-center">Adult Teeth (FDI System)</h3>

      {/* Upper Jaw */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <div className="flex flex-wrap justify-center">{quadrant1.map(renderTooth)}</div>
        <div className="flex flex-wrap justify-center">{quadrant2.map(renderTooth)}</div>
      </div>

      <div className="w-full border-t-2 border-dashed border-gray-400 mb-8" />

      {/* Lower Jaw */}
      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex flex-wrap justify-center">{quadrant4.map(renderTooth)}</div>
        <div className="flex flex-wrap justify-center">{quadrant3.map(renderTooth)}</div>
      </div>

      <div className="mt-6 text-sm text-center text-muted-foreground max-w-md">
        {selectedTreatment ? (
          <>Click on a tooth to add or remove <strong>{selectedTreatment}</strong>.</>
        ) : (
          <>Select a treatment from the list to begin.</>
        )}
      </div>
    </div>
  );
};

export default DentalChart;
