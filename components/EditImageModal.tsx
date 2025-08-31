import React, { useState } from 'react';
import Loader from './Loader';

interface EditImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyEdit: (prompt: string) => Promise<void>;
  imageUrl: string;
}

const EditImageModal: React.FC<EditImageModalProps> = ({ isOpen, onClose, onApplyEdit, imageUrl }) => {
  const [editPrompt, setEditPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!editPrompt.trim()) {
      setError('Please enter an editing instruction.');
      return;
    }
    setIsEditing(true);
    setError(null);
    try {
      await onApplyEdit(editPrompt);
      // Parent will close the modal on success
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in-fast" role="dialog" aria-modal="true" aria-labelledby="edit-modal-title">
      <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl border border-gray-700 transform transition-all" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 id="edit-modal-title" className="text-xl font-bold text-indigo-400">Edit Your Ad</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close edit modal">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex justify-center">
            <img src={imageUrl} alt="Ad to be edited" className="max-h-72 w-auto object-contain rounded-md bg-black" />
          </div>
          <div>
            <label htmlFor="edit-prompt" className="block text-sm font-medium text-gray-300 mb-2">How would you like to change this image?</label>
            <textarea
              id="edit-prompt"
              rows={3}
              value={editPrompt}
              onChange={(e) => setEditPrompt(e.target.value)}
              placeholder="e.g., 'Change the background to a sunny beach' or 'Add a happy dog next to the product'"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition"
              disabled={isEditing}
            />
          </div>
          {error && (
            <div className="bg-red-900/50 text-red-300 text-sm px-3 py-2 rounded-md" role="alert">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>
        <div className="p-6 bg-gray-800/50 border-t border-gray-700 flex justify-end items-center gap-4 rounded-b-xl">
          <button onClick={onClose} disabled={isEditing} className="px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isEditing}
            className="inline-flex items-center justify-center px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors text-white font-semibold disabled:opacity-50 disabled:cursor-wait"
          >
            {isEditing ? (
              <>
                <Loader small />
                <span className="ml-2">Applying Edit...</span>
              </>
            ) : (
              'Apply Edit'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditImageModal;