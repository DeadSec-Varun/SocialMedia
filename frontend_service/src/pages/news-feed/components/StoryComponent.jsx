import React, { useRef } from 'react'
import Image from '../../../components/AppImage';
import imageUrls from '../../../image.json';
import Icon from '../../../components/AppIcon';

const StoryComponent = ({story}) => {
    // Assign a random avatar only once per mount using ref
    const avatarRef = useRef(
        imageUrls[Math.floor(Math.random() * imageUrls.length)]
    );
    return (
        <div
            className="flex-shrink-0 flex flex-col items-center space-y-2 cursor-pointer group"
            onClick={() => console.log('Story clicked:', story.name)}
        >
            <div className="relative">
                {/* Story ring */}
                <div className={`
                    w-16 h-16 rounded-full p-0.5 transition-smooth
                    ${story.user_id != 1
                        ? 'bg-gradient-to-tr from-accent via-warning to-secondary'
                        : 'bg-transparent'
                    }
                  `}>
                    <div className="w-full h-full bg-background rounded-full p-0.5">
                        <div className="relative w-full h-full rounded-full overflow-hidden">
                            <Image
                                src={story.avatar ?? avatarRef.current}
                                alt={story.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {story.user_id == 1 && (
                            <div className="absolute bottom-0 right-0 w-5 h-5 z-10 bg-primary rounded-full border-2 border-background flex items-center justify-center">
                                <Icon name="Plus" size={12} color="white" strokeWidth={3} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Username */}
            <span className="text-xs text-text-secondary font-medium truncate max-w-[64px] group-hover:text-text-primary transition-smooth">
                {story.name}
            </span>
        </div>
    )
}

export default StoryComponent;