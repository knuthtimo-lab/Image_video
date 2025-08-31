
import React from 'react';

const Loader: React.FC<{ small?: boolean }> = ({ small = false }) => {
  const sizeClasses = small ? 'h-5 w-5' : 'h-12 w-12';
  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses} animate-spin rounded-full border-4 border-solid border-indigo-500 border-t-transparent`}
      ></div>
    </div>
  );
};

export default Loader;
