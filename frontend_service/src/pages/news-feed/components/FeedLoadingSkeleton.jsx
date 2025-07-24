import React from 'react';

const FeedLoadingSkeleton = ({ count = 3 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-background border border-border rounded-lg shadow-elevation-1 p-4 animate-pulse">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-surface-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-surface-200 rounded w-32 mb-2"></div>
              <div className="h-3 bg-surface-200 rounded w-20"></div>
            </div>
            <div className="w-6 h-6 bg-surface-200 rounded"></div>
          </div>

          {/* Content */}
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-surface-200 rounded w-full"></div>
            <div className="h-4 bg-surface-200 rounded w-3/4"></div>
            <div className="h-4 bg-surface-200 rounded w-1/2"></div>
          </div>

          {/* Media placeholder */}
          {index % 2 === 0 && (
            <div className="h-48 bg-surface-200 rounded-lg mb-4"></div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-surface-200 rounded"></div>
                <div className="h-4 bg-surface-200 rounded w-8"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-surface-200 rounded"></div>
                <div className="h-4 bg-surface-200 rounded w-8"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-surface-200 rounded"></div>
                <div className="h-4 bg-surface-200 rounded w-8"></div>
              </div>
            </div>
            <div className="w-5 h-5 bg-surface-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedLoadingSkeleton;