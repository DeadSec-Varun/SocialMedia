import React from "react";

const StoryLoadingSkeleton = ({ count = 8 }) => {
    return (
        <div className="flex flex-row space-x-4">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="flex-shrink-0 flex flex-col items-center space-y-2 animate-pulse">
                    <div className="w-16 h-16 rounded-full bg-border" />
                    <div className="h-3 w-12 bg-border rounded" />
                </div>
            ))}
        </div>
    )
}

export default StoryLoadingSkeleton;