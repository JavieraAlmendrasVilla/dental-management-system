import React, { useState } from 'react';

interface Tooth {
  id: number;
  name: string;
  adult: boolean;
  treatments: string[];
}

interface DentalChartProps {
  selectedTreatment: string;
}

// Define treatment colors for visualization
const TREATMENT_COLORS: Record<string, string> = {
  'filling': '#3b82f6',
  'crown': '#f59e0b',
  'extraction': '#ef4444',
  'root-canal': '#8b5cf6',
  'implant': '#10b981',
  'bridge': '#6366f1',
};

// Adult teeth (simplified model)
const ADULT_TEETH: Tooth[] = Array.from({ length: 32 }, (_, index) => ({
  id: index + 1,
  name: (index + 1).toString(),
  adult: true,
  treatments: [],
}));

const DentalChart: React.FC<DentalChartProps> = ({ selectedTreatment }) => {
  const [teeth, setTeeth] = useState<Tooth[]>(ADULT_TEETH);

  const handleToothClick = (toothId: number) => {
    if (!selectedTreatment) return;
    
    setTeeth((prevTeeth) =>
      prevTeeth.map((tooth) => {
        if (tooth.id === toothId) {
          // If treatment already exists, remove it
          if (tooth.treatments.includes(selectedTreatment)) {
            return {
              ...tooth,
              treatments: tooth.treatments.filter((t) => t !== selectedTreatment),
            };
          }
          // Otherwise add the treatment
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

  // Group teeth into upper and lower jaws
  const upperTeeth = teeth.slice(0, 16);
  const lowerTeeth = teeth.slice(16, 32);

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-medium mb-4">Adult Teeth</h3>
      
      {/* Upper jaw */}
      <div className="mb-8">
        <div className="flex justify-center mb-2">
          {upperTeeth.slice(0, 8).map((tooth) => (
            <div 
              key={tooth.id} 
              className="flex flex-col items-center mx-1"
              onClick={() => handleToothClick(tooth.id)}
            >
              <div 
                className="w-10 h-12 border border-gray-400 flex items-center justify-center cursor-pointer hover:bg-muted transition-colors relative"
                style={{ 
                  backgroundColor: getToothColor(tooth),
                  borderColor: tooth.treatments.length > 0 ? 'black' : '#e5e7eb',
                  borderWidth: tooth.treatments.length > 0 ? '2px' : '1px'
                }}
              >
                <span className="text-xs font-medium">{tooth.id}</span>
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
          ))}
        </div>
        
        <div className="flex justify-center">
          {upperTeeth.slice(8, 16).reverse().map((tooth) => (
            <div 
              key={tooth.id} 
              className="flex flex-col items-center mx-1"
              onClick={() => handleToothClick(tooth.id)}
            >
              <div 
                className="w-10 h-12 border border-gray-400 flex items-center justify-center cursor-pointer hover:bg-muted transition-colors relative"
                style={{ 
                  backgroundColor: getToothColor(tooth),
                  borderColor: tooth.treatments.length > 0 ? 'black' : '#e5e7eb',
                  borderWidth: tooth.treatments.length > 0 ? '2px' : '1px'
                }}
              >
                <span className="text-xs font-medium">{tooth.id}</span>
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
          ))}
        </div>
      </div>
      
      {/* Jaw separator */}
      <div className="w-full border-t border-dashed border-gray-400 mb-8"></div>
      
      {/* Lower jaw */}
      <div>
        <div className="flex justify-center">
          {lowerTeeth.slice(0, 8).map((tooth) => (
            <div 
              key={tooth.id} 
              className="flex flex-col items-center mx-1"
              onClick={() => handleToothClick(tooth.id)}
            >
              <span className="text-xs mb-1">{tooth.name}</span>
              <div 
                className="w-10 h-12 border border-gray-400 flex items-center justify-center cursor-pointer hover:bg-muted transition-colors relative"
                style={{ 
                  backgroundColor: getToothColor(tooth),
                  borderColor: tooth.treatments.length > 0 ? 'black' : '#e5e7eb',
                  borderWidth: tooth.treatments.length > 0 ? '2px' : '1px'
                }}
              >
                <span className="text-xs font-medium">{tooth.id}</span>
                {tooth.treatments.length > 0 && (
                  <div className="absolute -top-2 -right-2 h-4 w-4 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-[10px] text-white font-bold">
                      {tooth.treatments.length}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-2">
          {lowerTeeth.slice(8, 16).reverse().map((tooth) => (
            <div 
              key={tooth.id} 
              className="flex flex-col items-center mx-1"
              onClick={() => handleToothClick(tooth.id)}
            >
              <span className="text-xs mb-1">{tooth.name}</span>
              <div 
                className="w-10 h-12 border border-gray-400 flex items-center justify-center cursor-pointer hover:bg-muted transition-colors relative"
                style={{ 
                  backgroundColor: getToothColor(tooth),
                  borderColor: tooth.treatments.length > 0 ? 'black' : '#e5e7eb',
                  borderWidth: tooth.treatments.length > 0 ? '2px' : '1px'
                }}
              >
                <span className="text-xs font-medium">{tooth.id}</span>
                {tooth.treatments.length > 0 && (
                  <div className="absolute -top-2 -right-2 h-4 w-4 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-[10px] text-white font-bold">
                      {tooth.treatments.length}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
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