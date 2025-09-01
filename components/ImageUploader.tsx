import React, { useCallback, useState } from 'react';
import Loader from './Loader';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  onGenerateFromText: (prompt: string) => void;
  isGenerating: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, onGenerateFromText, isGenerating }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  const [prompt, setPrompt] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  }, [onImageUpload]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleGenerateClick = () => {
    if (prompt.trim()) {
      onGenerateFromText(prompt);
    }
  };

  return (
    <div className="text-center p-8 bg-gray-800 border border-gray-700 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-indigo-400 mb-2">Welcome to AI Ad Studio</h2>
      <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
        Start by uploading a product image, or describe one for the AI to create. For best results, use a clear image or a detailed description.
      </p>
      
      <div className="max-w-xl mx-auto">
        <div className="flex border-b border-gray-700 mb-6">
            <button onClick={() => setActiveTab('upload')} className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'upload' ? 'border-b-2 border-indigo-500 text-indigo-400' : 'text-gray-400 hover:text-white'}`}>
                Upload Image
            </button>
            <button onClick={() => setActiveTab('text')} className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'text' ? 'border-b-2 border-indigo-500 text-indigo-400' : 'text-gray-400 hover:text-white'}`}>
                Create with AI
            </button>
        </div>
        
        {isGenerating ? (
            <div className="py-20">
                <Loader />
                <p className="mt-4 text-indigo-300 animate-pulse">Generating your product image...</p>
            </div>
        ) : (
            <>
                {activeTab === 'upload' && (
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        className={`relative group border-2 border-dashed rounded-lg p-10 transition-colors duration-300 ${isDragging ? 'border-indigo-500 bg-gray-700/50' : 'border-gray-600 hover:border-indigo-500'}`}
                    >
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <svg className="w-16 h-16 text-gray-500 group-hover:text-indigo-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-gray-400">
                                <span className="font-semibold text-indigo-400">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB</p>
                        </div>
                        <input 
                            type="file" 
                            accept="image/png, image/jpeg, image/webp" 
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                        />
                    </div>
                )}
                {activeTab === 'text' && (
                    <div className="space-y-4">
                        <textarea
                            rows={3}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g., A stylish, wireless headphone in matte black with chrome accents."
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                        <button
                            onClick={handleGenerateClick}
                            disabled={!prompt.trim()}
                            className="w-full inline-flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                            <span>Generate Image</span>
                        </button>
                    </div>
                )}
            </>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
