
import React, { useState, useCallback } from 'react';
import { AdFormat, GeneratedAd, AdVariation } from './types';
import { AD_FORMAT_CATEGORIES } from './constants';
import { generateAdImage, generateSlogan, editAdImage, generateImageFromText } from './services/geminiService';
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
  const [isGeneratingProductImage, setIsGeneratingProductImage] = useState<boolean>(false);

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
  
  const handleGenerateFromText = useCallback(async (prompt: string) => {
    setIsGeneratingProductImage(true);
    setError(null);
    try {
      const { base64Image, mimeType } = await generateImageFromText(prompt);
      setProductImageBase64(base64Image);
      setProductImageMimeType(mimeType);
      setGeneratedAds([]);
      setSlogan('');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate image from text.");
    } finally {
      setIsGeneratingProductImage(false);
    }
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

    const existingAdsCount = generatedAds.filter(ad => ad.formatId === format.id).length;
    let finalPrompt = format.prompt;

    if (existingAdsCount > 0) {
      const variationPrompts = [
        ", with a different color scheme and a complementary background.",
        ", from a slightly different camera angle and with more dramatic lighting.",
        ", in a minimalist style with a focus on clean lines and negative space.",
        ", with a vibrant, playful and energetic feel.",
        ", but set in a different season, for example, autumn instead of summer.",
      ];
      const variationSuffix = variationPrompts[(existingAdsCount - 1) % variationPrompts.length];
      finalPrompt = `${format.prompt}${variationSuffix}`;
    }

    try {
      const result = await generateAdImage(productImageBase64, productImageMimeType, finalPrompt, slogan);
      const newAd: GeneratedAd = {
        id: `${format.id}-${Date.now()}`,
        formatId: format.id,
        imageUrl: result.imageUrl,
        text: result.text,
        originalPrompt: format.prompt,
        formatName: `${format.name}${existingAdsCount > 0 ? ` (Variation ${existingAdsCount})` : ''}`,
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
  }, [productImageBase64, productImageMimeType, isLoading, slogan, generatedAds]);

  const handleGenerateVariations = useCallback(async (adId: string) => {
    const adToVary = generatedAds.find(ad => ad.id === adId);
    if (!adToVary || !productImageBase64 || !productImageMimeType || generatingVariationsForAdId) return;

    setGeneratingVariationsForAdId(adId);
    setError(null);

    try {
        const allVariationPrompts = [
            // Style Variations
            `${adToVary.originalPrompt}, but reimagined in a bold, Andy Warhol-inspired pop art style, with repeating patterns and vibrant, saturated colors.`,
            `${adToVary.originalPrompt}, but visualized as a beautiful watercolor painting, with soft edges, gentle color washes, and an artistic, handcrafted feel.`,
            `${adToVary.originalPrompt}, but with an Art Deco aesthetic, featuring glamorous geometric patterns, gold accents, and a sense of Roaring Twenties luxury.`,
            `${adToVary.originalPrompt}, but in a gritty, high-contrast 'film noir' style, using dramatic shadows and a black-and-white color palette.`,
            `${adToVary.originalPrompt}, but with a whimsical, illustrative style, as if it's a page from a charming children's storybook.`,
            `${adToVary.originalPrompt}, but in a retro-futuristic style with neon accents, chrome details, and a synthwave vibe.`,

            // Lighting & Mood Variations
            `${adToVary.originalPrompt}, but captured during the 'golden hour' just before sunset, with warm, soft light and long, dramatic shadows.`,
            `${adToVary.originalPrompt}, but with a moody, cinematic atmosphere using high-contrast, dramatic lighting to create a sense of mystery.`,
            `${adToVary.originalPrompt}, but using minimalist studio lighting with a single light source, creating sharp, clean shadows on a seamless background.`,
            
            // Composition & Framing Variations
            `${adToVary.originalPrompt}, but as an extreme close-up shot that highlights the product's intricate details, textures, and craftsmanship.`,
            `${adToVary.originalPrompt}, but using a Dutch angle camera tilt to create a dynamic, edgy, and unconventional composition.`,
            `${adToVary.originalPrompt}, but with the product framed by natural elements, like leaves or flowers, creating a sense of depth and organic beauty.`,
            `${adToVary.originalPrompt}, but photographed with a shallow depth of field, making the product razor-sharp while the background is beautifully blurred into an abstract wash of color.`,

            // Background & Environment Variations
            `${adToVary.originalPrompt}, but with the background changed to a surreal, dream-like landscape where the laws of physics are bent, similar to a Salvador Dalí painting.`,
            `${adToVary.originalPrompt}, but placed against a rugged, industrial background of weathered concrete and rusted metal, creating a powerful contrast.`,
            `${adToVary.originalPrompt}, but set within a minimalist zen garden, with raked sand, smooth stones, and a feeling of tranquility.`,
            
            // Color Palette Variations
            `${adToVary.originalPrompt}, but with a completely different color palette, focusing on cool, calming tones like blues, greens, and purples.`,
            `${adToVary.originalPrompt}, but using a striking monochromatic color scheme, with various shades and tints of a single bold color.`,
        ];
        
        // Shuffle the array and pick the first 2 to generate
        const shuffledPrompts = allVariationPrompts.sort(() => 0.5 - Math.random());
        const variationPrompts = shuffledPrompts.slice(0, 2);

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
            <div>
              <ImageUploader 
                onImageUpload={handleImageUpload}
                onGenerateFromText={handleGenerateFromText}
                isGenerating={isGeneratingProductImage}
              />
              {error && (
                <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative mt-6" role="alert">
                  <strong className="font-bold">Error: </strong>
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
            </div>
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
