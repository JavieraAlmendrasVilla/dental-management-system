import React, { useState } from 'react';

interface ToothMeasurements {
  probingDepth: number[];
  attachmentLevel: number[];
  gingivalMargin: number[];
  bleeding: boolean[];
  plaque: boolean[];
}

interface Tooth {
  id: number;
  name: string;
  measurements: ToothMeasurements;
}

interface PeriodontogramProps {
  onSave: (data: any) => void;
  onUpdate: () => void;
}

const createInitialTeeth = (): Tooth[] => {
  const createMeasurements = (): ToothMeasurements => ({
    probingDepth: [3, 3, 3],
    attachmentLevel: [3, 3, 3],
    gingivalMargin: [0, 0, 0],
    bleeding: [false, false, false],
    plaque: [false, false, false],
  });

  return [
    // Upper Right (18-11)
    ...Array.from({ length: 8 }, (_, i): Tooth => ({
      id: 18 - i,
      name: (18 - i).toString(),
      measurements: createMeasurements(),
    })),
    // Upper Left (21-28)
    ...Array.from({ length: 8 }, (_, i): Tooth => ({
      id: 21 + i,
      name: (21 + i).toString(),
      measurements: createMeasurements(),
    })),
    // Lower Left (38-31)
    ...Array.from({ length: 8 }, (_, i): Tooth => ({
      id: 38 - i,
      name: (38 - i).toString(),
      measurements: createMeasurements(),
    })),
    // Lower Right (41-48)
    ...Array.from({ length: 8 }, (_, i): Tooth => ({
      id: 41 + i,
      name: (41 + i).toString(),
      measurements: createMeasurements(),
    }))
  ];
};

const Periodontogram: React.FC<PeriodontogramProps> = ({ onSave, onUpdate }) => {
  const [teeth, setTeeth] = useState<Tooth[]>(createInitialTeeth());
  const [selectedMeasurement, setSelectedMeasurement] = useState<'pd' | 'cal' | 'gm'>('pd');

  const handleMeasurementChange = (toothId: number, index: number, value: number) => {
    setTeeth((prevTeeth) =>
      prevTeeth.map((tooth) =>
        tooth.id === toothId
          ? {
              ...tooth,
              measurements: {
                ...tooth.measurements,
                [selectedMeasurement === 'pd' ? 'probingDepth' :
                 selectedMeasurement === 'cal' ? 'attachmentLevel' : 'gingivalMargin']:
                  tooth.measurements[selectedMeasurement === 'pd' ? 'probingDepth' :
                                   selectedMeasurement === 'cal' ? 'attachmentLevel' : 'gingivalMargin']
                    .map((v, i) => i === index ? value : v)
              }
            }
          : tooth
      )
    );
    onUpdate();
  };

  const handleBleedingToggle = (toothId: number, index: number) => {
    setTeeth((prevTeeth) =>
      prevTeeth.map((tooth) =>
        tooth.id === toothId
          ? {
              ...tooth,
              measurements: {
                ...tooth.measurements,
                bleeding: tooth.measurements.bleeding.map((v, i) => i === index ? !v : v)
              }
            }
          : tooth
      )
    );
    onUpdate();
  };

  const handlePlaqueToggle = (toothId: number, index: number) => {
    setTeeth((prevTeeth) =>
      prevTeeth.map((tooth) =>
        tooth.id === toothId
          ? {
              ...tooth,
              measurements: {
                ...tooth.measurements,
                plaque: tooth.measurements.plaque.map((v, i) => i === index ? !v : v)
              }
            }
          : tooth
      )
    );
    onUpdate();
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
      <div key={tooth.id} className="flex flex-col items-center mx-2">
        <span className="text-xs font-medium mb-1">{tooth.name}</span>
        <div className="space-y-1">
          {/* Plaque indicators */}
          <div className="flex justify-center gap-1">
            {tooth.measurements.plaque.map((hasPlaque, index) => (
              <button
                key={`plaque-${index}`}
                className={`w-6 h-6 rounded-full border ${
                  hasPlaque ? 'bg-blue-200 border-blue-500' : 'bg-white border-gray-300'
                }`}
                onClick={() => handlePlaqueToggle(tooth.id, index)}
              >
                P
              </button>
            ))}
          </div>

          {/* Tooth diagram */}
          <div className="w-20 h-20">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d={getToothPath(tooth)}
                fill="none"
                stroke="#666"
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* Measurements */}
          <div className="flex justify-center gap-1">
            {tooth.measurements[selectedMeasurement === 'pd' ? 'probingDepth' :
                              selectedMeasurement === 'cal' ? 'attachmentLevel' : 'gingivalMargin']
              .map((value, index) => (
                <input
                  key={`measurement-${index}`}
                  type="number"
                  min={selectedMeasurement === 'gm' ? -5 : 1}
                  max={selectedMeasurement === 'gm' ? 5 : 10}
                  value={value}
                  onChange={(e) => handleMeasurementChange(tooth.id, index, parseInt(e.target.value) || 0)}
                  className="w-6 h-6 text-center border rounded p-0 text-sm"
                />
            ))}
          </div>

          {/* Bleeding indicators */}
          <div className="flex justify-center gap-1">
            {tooth.measurements.bleeding.map((isBleeeding, index) => (
              <button
                key={`bleeding-${index}`}
                className={`w-6 h-6 rounded-full border ${
                  isBleeeding ? 'bg-red-200 border-red-500' : 'bg-white border-gray-300'
                }`}
                onClick={() => handleBleedingToggle(tooth.id, index)}
              >
                B
              </button>
            ))}
          </div>
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
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setSelectedMeasurement('pd')}
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            selectedMeasurement === 'pd'
              ? 'bg-primary text-white'
              : 'bg-muted hover:bg-muted/80'
          }`}
        >
          Probing Depth
        </button>
        <button
          onClick={() => setSelectedMeasurement('cal')}
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            selectedMeasurement === 'cal'
              ? 'bg-primary text-white'
              : 'bg-muted hover:bg-muted/80'
          }`}
        >
          Clinical Attachment
        </button>
        <button
          onClick={() => setSelectedMeasurement('gm')}
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            selectedMeasurement === 'gm'
              ? 'bg-primary text-white'
              : 'bg-muted hover:bg-muted/80'
          }`}
        >
          Gingival Margin
        </button>
      </div>
      
      {/* Upper jaw */}
      <div className="mb-8">
        <div className="flex justify-center mb-4">
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
        <div className="flex justify-center mb-4">
          {lowerLeft.map(renderTooth)}
        </div>
        <div className="flex justify-center">
          {lowerRight.map(renderTooth)}
        </div>
      </div>
      
      <div className="mt-4 text-sm text-center text-muted-foreground">
        Enter measurements for {
          selectedMeasurement === 'pd' ? 'Probing Depth' :
          selectedMeasurement === 'cal' ? 'Clinical Attachment Level' :
          'Gingival Margin'
        }
      </div>
    </div>
  );
};

export default Periodontogram;