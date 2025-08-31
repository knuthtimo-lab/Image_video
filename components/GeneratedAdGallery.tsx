import React from 'react';
import type { GeneratedAd, AdVariation } from '../types';
import Loader from './Loader';

interface GeneratedAdGalleryProps {
  ads: GeneratedAd[];
  onGenerateVariations: (adId: string) => void;
  generatingVariationsForAdId: string | null;
  onOpenEditModal: (ad: GeneratedAd) => void;
}

const VariationCard: React.FC<{ variation: AdVariation, formatName: string }> = ({ variation, formatName }) => {
  const getFilename = () => {
    const safeFormatName = formatName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const variationId = variation.id.split('-').pop();
    return `ai_ad_${safeFormatName}_variation_${variationId}.png`;
  };

  return (
    <div className="relative group bg-black rounded-md overflow-hidden">
      <img src={variation.imageUrl} alt="Ad variation" className="w-full h-full object-cover" />
      <a
        href={variation.imageUrl}
        download={getFilename()}
        className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label="Download variation"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </a>
    </div>
  );
};

const GeneratedAdCard: React.FC<{ 
  ad: GeneratedAd,
  onGenerateVariations: (adId: string) => void;
  isGeneratingVariations: boolean;
  onOpenEditModal: (ad: GeneratedAd) => void;
}> = ({ ad, onGenerateVariations, isGeneratingVariations, onOpenEditModal }) => {
  const getFilename = () => {
    const safeFormatName = ad.formatName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    return `ai_ad_${safeFormatName}.png`;
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 animate-fade-in flex flex-col">
      <div className="p-4 bg-gray-700/50">
        <h3 className="font-bold text-lg text-indigo-400">{ad.formatName}</h3>
      </div>
      <div className="p-4 flex-grow">
        <img
          src={ad.imageUrl}
          alt={`Generated ad for ${ad.formatName}`}
          className="w-full h-auto object-contain rounded-md mb-4 bg-black"
        />
        {ad.slogan && (
            <div className="mb-3 p-3 bg-gray-900/50 rounded">
                <p className="text-sm text-gray-300">
                    <span className="font-semibold text-indigo-300">Slogan Used:</span> "{ad.slogan}"
                </p>
            </div>
        )}
        {ad.text && (
            <div className="p-3 bg-gray-900/50 rounded">
                <p className="text-sm text-gray-300 italic">
                    <span className="font-semibold text-indigo-300">AI Note:</span> "{ad.text}"
                </p>
            </div>
        )}
      </div>
      <div className="p-4 bg-gray-800/50 border-t border-gray-700 space-y-3">
        <a
          href={ad.imageUrl}
          download={getFilename()}
          className="w-full inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors duration-300 text-white font-semibold text-center"
          aria-label={`Download ad image for ${ad.formatName}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Download Image</span>
        </a>
        <button
          onClick={() => onOpenEditModal(ad)}
          className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md transition-colors duration-300 text-white font-semibold text-center"
          aria-label={`Edit ad image for ${ad.formatName}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
          </svg>
          <span>Edit Image</span>
        </button>
        <button
          onClick={() => onGenerateVariations(ad.id)}
          disabled={isGeneratingVariations}
          className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md transition-colors duration-300 text-white font-semibold text-center disabled:opacity-50 disabled:cursor-wait"
          aria-label={`Generate variations for ${ad.formatName}`}
        >
          {isGeneratingVariations ? (
            <>
              <Loader small />
              <span className="ml-2">Generating...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M5.5 9.5a7.5 7.5 0 100 5.3" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 20v-5h-5M18.5 14.5a7.5 7.5 0 100-5.3" />
              </svg>
              <span>Generate Variations</span>
            </>
          )}
        </button>
      </div>
      {ad.variations && ad.variations.length > 0 && (
        <div className="p-4 bg-gray-900/50 border-t border-gray-700">
          <h4 className="font-semibold text-gray-300 mb-3 text-sm">Variations:</h4>
          <div className="grid grid-cols-2 gap-3">
            {ad.variations.map(variation => (
              <VariationCard key={variation.id} variation={variation} formatName={ad.formatName} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


const GeneratedAdGallery: React.FC<GeneratedAdGalleryProps> = ({ ads, onGenerateVariations, generatingVariationsForAdId, onOpenEditModal }) => {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">Generated Ads</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ads.map((ad) => (
          <GeneratedAdCard 
            key={ad.id} 
            ad={ad} 
            onGenerateVariations={onGenerateVariations}
            isGeneratingVariations={generatingVariationsForAdId === ad.id}
            onOpenEditModal={onOpenEditModal}
          />
        ))}
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default GeneratedAdGallery;