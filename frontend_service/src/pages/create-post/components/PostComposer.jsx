import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PostComposer = ({ 
  content, 
  onContentChange, 
  onMediaUpload, 
  mediaFiles = [],
  onRemoveMedia,
  characterLimit = 2000 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleTextareaChange = (e) => {
    const value = e.target.value;
    if (value.length <= characterLimit) {
      onContentChange(value);
    }
  };

  const handleMediaClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    onMediaUpload(files);
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  React.useEffect(() => {
    adjustTextareaHeight();
  }, [content]);

  const remainingChars = characterLimit - content.length;
  const isNearLimit = remainingChars < 100;

  return (
    <div className="bg-background border border-border rounded-xl p-4 lg:p-6">
      {/* User Info */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-surface-200 rounded-full flex items-center justify-center">
          <Icon name="User" size={20} color="var(--color-text-secondary)" />
        </div>
        <div>
          <h3 className="font-medium text-text-primary">You</h3>
          <p className="text-sm text-text-secondary">Sharing publicly</p>
        </div>
      </div>

      {/* Text Composer */}
      <div className="relative mb-4">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleTextareaChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="What's on your mind ?"
          className={`
            w-full min-h-[120px] p-4 bg-surface border border-border rounded-lg
            text-text-primary placeholder:text-text-muted resize-none
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            transition-smooth text-lg leading-relaxed
            ${isFocused ? 'bg-background' : 'bg-surface'}
          `}
          style={{ maxHeight: '300px', overflowY: 'auto' }}
        />
        
        {/* Character Counter */}
        {content.length > 0 && (
          <div className={`
            absolute bottom-2 right-2 text-xs font-medium px-2 py-1 rounded-full
            ${isNearLimit ? 'text-error bg-error-50' : 'text-text-muted bg-surface-100'}
          `}>
            {remainingChars}
          </div>
        )}
      </div>

      {/* Media Preview */}
      {mediaFiles.length > 0 && (
        <div className="mb-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {mediaFiles.map((file, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-surface-100 rounded-lg overflow-hidden">
                  {file.type?.startsWith('image/') ? (
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : file.type?.startsWith('video/') ? (
                    <video
                      src={URL.createObjectURL(file)}
                      className="w-full h-full object-cover"
                     
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon name="File" size={32} color="var(--color-text-muted)" />
                    </div>
                  )}
                </div>
                
                {/* Remove Button */}
                <button
                  onClick={() => onRemoveMedia(index)}
                  className="absolute top-2 right-2 w-6 h-6 bg-error text-error-foreground 
                           rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100
                           transition-smooth hover:scale-110"
                  aria-label="Remove media"
                >
                  <Icon name="X" size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Media Upload Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Image"
            onClick={handleMediaClick}
            className="text-text-secondary hover:text-primary"
          >
            Photo/Video
          </Button>
          
          {/* <Button
            variant="ghost"
            size="sm"
            iconName="MapPin"
            className="text-text-secondary hover:text-primary"
          >
            Location
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="Smile"
            className="text-text-secondary hover:text-primary"
          >
            Feeling
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="BarChart3"
            className="text-text-secondary hover:text-primary hidden lg:flex"
          >
            Poll
          </Button> */}
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default PostComposer;