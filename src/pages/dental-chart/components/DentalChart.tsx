import React, { useState } from 'react';

interface ToothArea {
  name: 'lingual' | 'mesial' | 'buccal' | 'distal' | 'occlusal';
  treatment?: string;
}

interface Tooth {
  id: number;
  name: string;
  adult: boolean;
  treatments: string[];
  position: 'upper' | 'lower';
  type: 'molar' | 'premolar' | 'canine' | 'incisor';
  areas: ToothArea[];
}

interface DentalChartProps {
  selectedTreatment: string;
  onSave: (teeth: Tooth[]) => void;
  onUpdate: () => void;
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
const createAdultTeeth = (): Tooth[] => {
  const createToothAreas = (): ToothArea[] => [
    { name: 'lingual' },
    { name: 'mesial' },
    { name: 'buccal' },
    { name: 'distal' },
    { name: 'occlusal' }
  ];

  return [
    // Upper Right (18-11)
    ...Array.from({ length: 8 }, (_, i): Tooth => ({
      id: 18 - i,
      name: (18 - i).toString(),
      adult: true,
      treatments: [],
      position: 'upper',
      type: i < 3 ? 'molar' : i < 5 ? 'premolar' : i < 6 ? 'canine' : 'incisor',
      areas: createToothAreas()
    })),
    // Upper Left (21-28)
    ...Array.from({ length: 8 }, (_, i): Tooth => ({
      id: 21 + i,
      name: (21 + i).toString(),
      adult: true,
      treatments: [],
      position: 'upper',
      type: i < 2 ? 'incisor' : i < 3 ? 'canine' : i < 5 ? 'premolar' : 'molar',
      areas: createToothAreas()
    })),
    // Lower Left (38-31)
    ...Array.from({ length: 8 }, (_, i): Tooth => ({
      id: 38 - i,
      name: (38 - i).toString(),
      adult: true,
      treatments: [],
      position: 'lower',
      type: i < 3 ? 'molar' : i < 5 ? 'premolar' : i < 6 ? 'canine' : 'incisor',
      areas: createToothAreas()
    })),
    // Lower Right (41-48)
    ...Array.from({ length: 8 }, (_, i): Tooth => ({
      id: 41 + i,
      name: (41 + i).toString(),
      adult: true,
      treatments: [],
      position: 'lower',
      type: i < 2 ? 'incisor' : i < 3 ? 'canine' : i < 5 ? 'premolar' : 'molar',
      areas: createToothAreas()
    }))
  ];
};

const ADULT_TEETH = createAdultTeeth();

const DentalChart: React.FC<DentalChartProps> = ({ selectedTreatment, onSave, onUpdate, initialTeeth }) => {
  const [teeth, setTeeth] = useState<Tooth[]>(initialTeeth || ADULT_TEETH);
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const handleToothClick = (toothId: number) => {
    if (selectedTooth === toothId) {
      setSelectedTooth(null);
      setSelectedArea(null);
    } else {
      setSelectedTooth(toothId);
      setSelectedArea(null);
    }
  };

  const handleAreaClick = (e: React.MouseEvent, toothId: number, areaName: string) => {
    e.stopPropagation();
    if (!selectedTreatment) return;

    setTeeth((prevTeeth) =>
      prevTeeth.map((tooth) =>
        tooth.id === toothId
          ? {
              ...tooth,
              areas: tooth.areas.map(area =>
                area.name === areaName
                  ? { ...area, treatment: area.treatment === selectedTreatment ? undefined : selectedTreatment }
                  : area
              )
            }
          : tooth
      )
    );
    onUpdate();
  };

  const getAreaColor = (area: ToothArea) => {
    if (!area.treatment) return '#ffffff';
    return TREATMENT_COLORS[area.treatment] || '#ffffff';
  };

  const getToothPath = (tooth: Tooth): { [key: string]: string } => {
    const cx = 50;
    const cy = 50;
    const outerR = 40;
    const innerR = 15;

    // Calculate points for the five areas
    const paths: { [key: string]: string } = {
      occlusal: `M${cx + innerR},${cy} A${innerR},${innerR} 0 1,0 ${cx - innerR},${cy} A${innerR},${innerR} 0 1,0 ${cx + innerR},${cy}`,
      buccal: `M${cx + innerR},${cy} L${cx + outerR},${cy} A${outerR},${outerR} 0 0,1 ${cx},${cy + outerR} L${cx},${cy + innerR} A${innerR},${innerR} 0 0,0 ${cx + innerR},${cy}`,
      lingual: `M${cx - innerR},${cy} L${cx - outerR},${cy} A${outerR},${outerR} 0 0,0 ${cx},${cy - outerR} L${cx},${cy - innerR} A${innerR},${innerR} 0 0,1 ${cx - innerR},${cy}`,
      mesial: `M${cx},${cy - innerR} L${cx},${cy - outerR} A${outerR},${outerR} 0 0,1 ${cx + outerR},${cy} L${cx + innerR},${cy} A${innerR},${innerR} 0 0,0 ${cx},${cy - innerR}`,
      distal: `M${cx},${cy + innerR} L${cx},${cy + outerR} A${outerR},${outerR} 0 0,0 ${cx - outerR},${cy} L${cx - innerR},${cy} A${innerR},${innerR} 0 0,1 ${cx},${cy + innerR}`
    };

    return paths;
  };

  const renderTooth = (tooth: Tooth) => {
    const isSelected = tooth.id === selectedTooth;
    const paths = getToothPath(tooth);
    
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
            {tooth.areas.map((area) => (
              <path
                key={area.name}
                d={paths[area.name]}
                fill={getAreaColor(area)}
                stroke={isSelected ? '#3b82f6' : '#666'}
                strokeWidth={isSelected ? '2' : '1'}
                onClick={(e) => handleAreaClick(e, tooth.id, area.name)}
                className="transition-colors hover:brightness-95"
              />
            ))}
          </svg>
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
      
      <div className="mt-4 text-sm text-center text-muted-foreground">
        {!selectedTooth ? (
          <>Click on a tooth to select it</>
        ) : !selectedTreatment ? (
          <>Select a treatment to apply to tooth {teeth.find(t => t.id === selectedTooth)?.name}</>
        ) : (
          <>Click on a tooth area to apply {selectedTreatment}</>
        )}
      </div>
    </div>
  );
};

export default DentalChart;