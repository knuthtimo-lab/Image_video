import React, { useState } from 'react';
import type { AdFormat, AdFormatCategory } from '../types';
import Loader from './Loader';

interface AdFormatSelectorProps {
  categories: AdFormatCategory[];
  onSelect: (format: AdFormat) => void;
  isLoading: boolean;
  activeId: string | null;
}

const AdFormatCard: React.FC<{
  format: AdFormat;
  onSelect: () => void;
  isLoading: boolean;
  isActive: boolean;
}> = ({ format, onSelect, isLoading, isActive }) => {
  const isDisabled = isLoading && !isActive;
  return (
    <button
      onClick={onSelect}
      disabled={isDisabled}
      className={`p-4 bg-gray-800 rounded-lg border border-gray-700 text-left w-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-indigo-500/20 hover:shadow-lg hover:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${isActive ? 'ring-2 ring-indigo-500 border-indigo-500' : ''}
      `}
      aria-label={`Select ${format.name} ad format`}
    >
      <div className="flex items-center space-x-4">
        <div>{format.icon}</div>
        <div>
            <h3 className="font-semibold text-white">{format.name}</h3>
        </div>
        {isActive && <div className="ml-auto"><Loader small /></div>}
      </div>
    </button>
  );
};


const AdFormatSelector: React.FC<AdFormatSelectorProps> = ({ categories, onSelect, isLoading, activeId }) => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.name || '');

  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold mb-6 text-center md:text-left text-gray-300">Choose Ad Format</h3>
      
      <div className="flex space-x-1 sm:space-x-2 border-b border-gray-700 mb-6 overflow-x-auto" role="tablist" aria-label="Ad Format Categories">
        {categories.map(category => (
          <button
            key={category.name}
            onClick={() => setActiveCategory(category.name)}
            className={`flex-shrink-0 px-3 sm:px-4 py-2 -mb-px font-semibold text-sm rounded-t-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500
              ${activeCategory === category.name 
                ? 'border-b-2 border-indigo-500 text-indigo-400' 
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
            `}
            role="tab"
            aria-selected={activeCategory === category.name}
            aria-controls={`panel-${category.name.replace(/\s+/g, '-')}`}
            id={`tab-${category.name.replace(/\s+/g, '-')}`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      <div>
        {categories.map(category => (
          <div 
            key={category.name}
            id={`panel-${category.name.replace(/\s+/g, '-')}`}
            role="tabpanel"
            aria-labelledby={`tab-${category.name.replace(/\s+/g, '-')}`}
            hidden={activeCategory !== category.name}
            className="animate-fade-in-fast"
          >
            {activeCategory === category.name && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.formats.map(format => (
                  <AdFormatCard
                    key={format.id}
                    format={format}
                    onSelect={() => onSelect(format)}
                    isLoading={isLoading}
                    isActive={activeId === format.id}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes fade-in-fast {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-fast {
          animation: fade-in-fast 0.3s ease-out forwards;
        }
        /* For Firefox */
        .overflow-x-auto {
          scrollbar-width: thin;
          scrollbar-color: #4f46e5 #374151;
        }
        /* For Chrome, Safari, and Opera */
        .overflow-x-auto::-webkit-scrollbar {
          height: 6px;
        }
        .overflow-x-auto::-webkit-scrollbar-track {
          background: #374151;
        }
        .overflow-x-auto::-webkit-scrollbar-thumb {
          background-color: #4f46e5;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default AdFormatSelector;
