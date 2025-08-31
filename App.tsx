import React, { useState, useCallback } from 'react';
import { AdFormat, GeneratedAd, AdVariation } from './types';
import { AD_FORMAT_CATEGORIES } from './constants';
import { generateAdImage, generateSlogan, editAdImage } from './services/geminiService';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import AdFormatSelector from './components/AdFormatSelector';
import GeneratedAdGallery from './components/GeneratedAdGallery';
import Loader from './components/Loader';
import Footer from './components/Footer';
import EditImageModal from './components/EditImageModal';

export default function App() {
  const [productImageBase64, setProductImageBase64] = useState<string | null>(null);
  const [productImageMimeType, setProductImageMimeType] = useState<string | null>(null);
  const [slogan, setSlogan] = useState<string>('');
  const [isGeneratingSlogan, setIsGeneratingSlogan] = useState<boolean>(false);
  const [generatedAds, setGeneratedAds] = useState<GeneratedAd[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeAdFormatId, setActiveAdFormatId] = useState<string | null>(null);
  const [generatingVariationsForAdId, setGeneratingVariationsForAdId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editingAd, setEditingAd] = useState<GeneratedAd | null>(null);

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1];
      setProductImageBase64(base64Data);
      setProductImageMimeType(file.type);
      setGeneratedAds([]); // Clear previous results on new image upload
      setError(null);
      setSlogan('');
    };
    reader.onerror = () => {
      setError("Failed to read the image file.");
    };
    reader.readAsDataURL(file);
  }, []);

  const handleGenerateSlogan = useCallback(async () => {
    if (!productImageBase64 || !productImageMimeType) {
      setError("Cannot generate slogan without an image.");
      return;
    }
    setIsGeneratingSlogan(true);
    setError(null);
    try {
      const generatedSlogan = await generateSlogan(productImageBase64, productImageMimeType);
      setSlogan(generatedSlogan);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate a slogan.");
    } finally {
      setIsGeneratingSlogan(false);
    }
  }, [productImageBase64, productImageMimeType]);

  const handleAdFormatSelect = useCallback(async (format: AdFormat) => {
    if (!productImageBase64 || !productImageMimeType) {
      setError("Please upload a product image first.");
      return;
    }
    if (isLoading) return;

    setIsLoading(true);
    setActiveAdFormatId(format.id);
    setError(null);

    try {
      const result = await generateAdImage(productImageBase64, productImageMimeType, format.prompt, slogan);
      const newAd: GeneratedAd = {
        id: `${format.id}-${Date.now()}`,
        imageUrl: result.imageUrl,
        text: result.text,
        originalPrompt: format.prompt,
        formatName: format.name,
        slogan: slogan,
        variations: [],
      };
      setGeneratedAds(prevAds => [newAd, ...prevAds]);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred while generating the ad.");
    } finally {
      setIsLoading(false);
      setActiveAdFormatId(null);
    }
  }, [productImageBase64, productImageMimeType, isLoading, slogan]);

  const handleGenerateVariations = useCallback(async (adId: string) => {
    const adToVary = generatedAds.find(ad => ad.id === adId);
    if (!adToVary || !productImageBase64 || !productImageMimeType || generatingVariationsForAdId) return;

    setGeneratingVariationsForAdId(adId);
    setError(null);

    try {
        const variationPrompts = [
            `${adToVary.originalPrompt}, with a slightly different composition and viewpoint.`,
            `${adToVary.originalPrompt}, in a different but complementary visual style.`
        ];

        const variationPromises = variationPrompts.map(prompt => 
            generateAdImage(productImageBase64, productImageMimeType, prompt, adToVary.slogan)
        );

        const results = await Promise.all(variationPromises);

        const newVariations: AdVariation[] = results.map((result, index) => ({
            id: `${adId}-var-${index}-${Date.now()}`,
            imageUrl: result.imageUrl,
            text: result.text
        }));

        setGeneratedAds(prevAds => prevAds.map(ad => 
            ad.id === adId 
                ? { ...ad, variations: [...(ad.variations || []), ...newVariations] }
                : ad
        ));
    } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "An unknown error occurred while generating variations.");
    } finally {
        setGeneratingVariationsForAdId(null);
    }
}, [generatedAds, productImageBase64, productImageMimeType, generatingVariationsForAdId]);

  const handleOpenEditModal = (ad: GeneratedAd) => {
    setEditingAd(ad);
    setIsEditModalOpen(true);
  };
  
  const handleCloseEditModal = () => {
    setEditingAd(null);
    setIsEditModalOpen(false);
  };

  const handleApplyEdit = async (editPrompt: string) => {
    if (!editingAd) return;

    setError(null);

    try {
      const parts = editingAd.imageUrl.split(',');
      const meta = parts[0].split(';')[0].split(':')[1];
      const base64Data = parts[1];

      if (!meta || !base64Data) {
        throw new Error("Invalid image URL format for editing.");
      }

      const result = await editAdImage(base64Data, meta, editPrompt);
      
      setGeneratedAds(prevAds => prevAds.map(ad => {
        if (ad.id === editingAd.id) {
          const oldImageAsVariation: AdVariation = {
            id: `${ad.id}-var-edit-${Date.now()}`,
            imageUrl: ad.imageUrl,
            text: 'Previous version before edit'
          };
          return {
            ...ad,
            imageUrl: result.imageUrl,
            text: result.text,
            variations: [oldImageAsVariation, ...(ad.variations || [])],
          };
        }
        return ad;
      }));
      
      handleCloseEditModal();
    } catch (err) {
      console.error("Failed to apply edit:", err);
      throw err;
    }
  };


  const resetState = () => {
    setProductImageBase64(null);
    setProductImageMimeType(null);
    setGeneratedAds([]);
    setError(null);
    setIsLoading(false);
    setActiveAdFormatId(null);
    setSlogan('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {!productImageBase64 ? (
            <ImageUploader onImageUpload={handleImageUpload} />
          ) : (
            <div>
              <div className="mb-8 p-6 bg-gray-800 border border-gray-700 rounded-2xl shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  <div className="md:col-span-1 flex justify-center">
                    <img src={`data:${productImageMimeType};base64,${productImageBase64}`} alt="Uploaded Product" className="w-48 h-48 object-contain rounded-lg bg-white p-1 shadow-md" />
                  </div>
                  <div className="md:col-span-2 text-center md:text-left">
                    <h2 className="text-2xl font-bold text-indigo-400 mb-2">Your Product is Ready!</h2>
                    <p className="text-gray-400 mb-6">Add an optional slogan, then select an ad format below to see the magic happen.</p>
                    
                    <div className="mb-6">
                      <label htmlFor="slogan-input" className="block text-lg font-semibold text-gray-300 mb-3">
                        Add a Slogan (Optional)
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto md:mx-0">
                        <input
                          id="slogan-input"
                          type="text"
                          value={slogan}
                          onChange={(e) => setSlogan(e.target.value)}
                          placeholder="e.g., The Future of Freshness"
                          className="flex-grow px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition"
                          aria-label="Slogan input"
                        />
                        <button
                          onClick={handleGenerateSlogan}
                          disabled={isGeneratingSlogan}
                          className="inline-flex items-center justify-center px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md transition-colors duration-300 text-white font-semibold disabled:opacity-50 disabled:cursor-wait"
                        >
                          {isGeneratingSlogan ? (
                            <>
                              <Loader small />
                              <span className="ml-2">Generating...</span>
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                              <span>Generate with AI</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={resetState}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-300 text-white font-semibold"
                    >
                      Upload a Different Image
                    </button>
                  </div>
                </div>
              </div>
              
              {error && (
                <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative mb-6" role="alert">
                  <strong className="font-bold">Error: </strong>
                  <span className="block sm:inline">{error}</span>
                </div>
              )}

              <AdFormatSelector
                categories={AD_FORMAT_CATEGORIES}
                onSelect={handleAdFormatSelect}
                isLoading={isLoading}
                activeId={activeAdFormatId}
              />
            </div>
          )}

          {isLoading && !generatedAds.length && (
            <div className="text-center p-12">
              <Loader />
              <p className="mt-4 text-lg text-indigo-300 animate-pulse">Generating your ad... this can take a moment.</p>
            </div>
          )}

          {generatedAds.length > 0 && (
            <GeneratedAdGallery 
              ads={generatedAds} 
              onGenerateVariations={handleGenerateVariations}
              generatingVariationsForAdId={generatingVariationsForAdId}
              onOpenEditModal={handleOpenEditModal}
            />
          )}
        </div>
      </main>
      <Footer />
      {editingAd && (
        <EditImageModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onApplyEdit={handleApplyEdit}
          imageUrl={editingAd.imageUrl}
        />
      )}
    </div>
  );
}