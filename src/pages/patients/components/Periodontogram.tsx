import React, { useState } from 'react';

interface ToothMeasurements {
  values: number[];
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
    values: [0, 0, 0, 0], // Top, Right, Bottom, Left
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

  const handleMeasurementChange = (toothId: number, index: number, value: number) => {
    setTeeth((prevTeeth) =>
      prevTeeth.map((tooth) =>
        tooth.id === toothId
          ? {
              ...tooth,
              measurements: {
                ...tooth.measurements,
                values: tooth.measurements.values.map((v, i) => i === index ? value : v)
              }
            }
          : tooth
      )
    );
    onUpdate();
  };

  const getToothPath = (tooth: Tooth): string => {
    const cx = 50;
    const cy = 50;
    const outerR = 40;
    const innerR = 10;
    const sqrt2over2 = 0.7071;

    const outerCircle = `M${cx + outerR},${cy}
      A${outerR},${outerR} 0 1,0 ${cx - outerR},${cy}
      A${outerR},${outerR} 0 1,0 ${cx + outerR},${cy}`;

    const innerCircle = `M${cx + innerR},${cy}
      A${innerR},${innerR} 0 1,0 ${cx - innerR},${cy}
      A${innerR},${innerR} 0 1,0 ${cx + innerR},${cy}`;

    const lines = [
      `M${cx + outerR * sqrt2over2},${cy - outerR * sqrt2over2} 
       L${cx + innerR * sqrt2over2},${cy - innerR * sqrt2over2}`,
      
      `M${cx - outerR * sqrt2over2},${cy - outerR * sqrt2over2} 
       L${cx - innerR * sqrt2over2},${cy - innerR * sqrt2over2}`,
      
      `M${cx - outerR * sqrt2over2},${cy + outerR * sqrt2over2} 
       L${cx - innerR * sqrt2over2},${cy + innerR * sqrt2over2}`,
      
      `M${cx + outerR * sqrt2over2},${cy + outerR * sqrt2over2} 
       L${cx + innerR * sqrt2over2},${cy + innerR * sqrt2over2}`
    ];

    return [outerCircle, innerCircle, ...lines].join(' ');
  };

  const getMeasurementPosition = (index: number): { x: number; y: number } => {
    const cx = 50;
    const cy = 50;
    const r = 25;

    switch (index) {
      case 0: // Top
        return { x: cx, y: cy - r };
      case 1: // Right
        return { x: cx + r, y: cy };
      case 2: // Bottom
        return { x: cx, y: cy + r };
      case 3: // Left
        return { x: cx - r, y: cy };
      default:
        return { x: cx, y: cy };
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, toothId: number, index: number) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= 0 && value <= 10) {
      handleMeasurementChange(toothId, index, value);
    }
  };

  const renderTooth = (tooth: Tooth) => {
    return (
      <div key={tooth.id} className="flex flex-col items-center mx-2">
        <span className="text-xs font-medium mb-1">{tooth.name}</span>
        <div className="w-20 h-20 relative">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d={getToothPath(tooth)}
              fill="none"
              stroke="#666"
              strokeWidth="1"
            />
          </svg>
          
          {tooth.measurements.values.map((value, index) => {
            const pos = getMeasurementPosition(index);
            return (
              <input
                key={`measurement-${index}`}
                type="number"
                min="0"
                max="10"
                value={value}
                onChange={(e) => handleInputChange(e, tooth.id, index)}
                className="absolute w-8 h-8 text-center text-sm border rounded bg-white"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const upperRight = teeth.filter(t => t.id >= 11 && t.id <= 18).sort((a, b) => b.id - a.id);
  const upperLeft = teeth.filter(t => t.id >= 21 && t.id <= 28).sort((a, b) => a.id - b.id);
  const lowerLeft = teeth.filter(t => t.id >= 31 && t.id <= 38).sort((a, b) => a.id - b.id);
  const lowerRight = teeth.filter(t => t.id >= 41 && t.id <= 48).sort((a, b) => b.id - a.id);

  return (
    <div className="flex flex-col items-center">      
      <div className="mb-8">
        <div className="flex justify-center mb-4">
          {upperRight.map(renderTooth)}
        </div>
        <div className="flex justify-center">
          {upperLeft.map(renderTooth)}
        </div>
      </div>
      
      <div className="w-full border-t-2 border-dashed border-gray-400 mb-8"></div>
      
      <div>
        <div className="flex justify-center mb-4">
          {lowerLeft.map(renderTooth)}
        </div>
        <div className="flex justify-center">
          {lowerRight.map(renderTooth)}
        </div>
      </div>
      
      <div className="mt-4 text-sm text-center text-muted-foreground">
        Enter values between 0-10 for each measurement
      </div>
    </div>
  );
};

export default Periodontogram;