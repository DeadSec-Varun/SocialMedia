import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PostPreview = ({ content, mediaFiles = [], scheduledDate, audience }) => {
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(new Date(date));
  };

  const getAudienceIcon = (audienceType) => {
    switch (audienceType) {
      case 'public': return 'Globe';
      case 'friends': return 'Users';
      case 'friends_except': return 'UserMinus';
      case 'specific_friends': return 'UserCheck';
      case 'only_me': return 'Lock';
      default: return 'Globe';
    }
  };

  const getAudienceLabel = (audienceType) => {
    switch (audienceType) {
      case 'public': return 'Public';
      case 'friends': return 'Friends';
      case 'friends_except': return 'Friends except...';
      case 'specific_friends': return 'Specific friends';
      case 'only_me': return 'Only me';
      default: return 'Public';
    }
  };

  if (!content.trim() && mediaFiles.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-xl p-8 text-center">
        <Icon name="Eye" size={48} className="text-text-muted mx-auto mb-4" />
        <h3 className="text-lg font-medium text-text-primary mb-2">
          Preview Your Post
        </h3>
        <p className="text-text-secondary">
          Start typing or add media to see how your post will look.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-background border border-border rounded-xl overflow-hidden">
      {/* Preview Header */}
      <div className="px-4 py-3 bg-surface border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Eye" size={16} className="text-text-muted" />
          <span className="text-sm font-medium text-text-secondary">
            Post Preview
          </span>
          {scheduledDate && (
            <div className="flex items-center space-x-1 ml-auto">
              <Icon name="Clock" size={14} className="text-warning" />
              <span className="text-xs text-warning font-medium">
                Scheduled
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4">
        {/* User Info */}
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-surface-200 rounded-full flex items-center justify-center">
            <Icon name="User" size={20} color="var(--color-text-secondary)" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h4 className="font-medium text-text-primary">John Doe</h4>
              <Icon name="CheckCircle" size={16} className="text-primary" />
            </div>
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <span>
                {scheduledDate ? formatDate(scheduledDate) : 'Just now'}
              </span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Icon 
                  name={getAudienceIcon(audience)} 
                  size={12} 
                  className="text-text-muted"
                />
                <span>{getAudienceLabel(audience)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Post Text */}
        {content.trim() && (
          <div className="mb-4">
            <p className="text-text-primary whitespace-pre-wrap leading-relaxed">
              {content}
            </p>
          </div>
        )}

        {/* Media Preview */}
        {mediaFiles.length > 0 && (
          <div className="mb-4">
            {mediaFiles.length === 1 ? (
              <div className="rounded-lg overflow-hidden bg-surface-100">
                {mediaFiles[0].type?.startsWith('image/') ? (
                  <Image
                    src={URL.createObjectURL(mediaFiles[0])}
                    alt="Post media"
                    className="w-full max-h-96 object-cover"
                  />
                ) : mediaFiles[0].type?.startsWith('video/') ? (
                  <video
                    src={URL.createObjectURL(mediaFiles[0])}
                    className="w-full max-h-96 object-cover"
                    controls
                  />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center">
                    <Icon name="File" size={48} color="var(--color-text-muted)" />
                  </div>
                )}
              </div>
            ) : (
              <div className={`
                grid gap-2 rounded-lg overflow-hidden
                ${mediaFiles.length === 2 ? 'grid-cols-2' : 'grid-cols-2 grid-rows-2'}
              `}>
                {mediaFiles.slice(0, 4).map((file, index) => (
                  <div key={index} className="relative aspect-square bg-surface-100">
                    {file.type?.startsWith('image/') ? (
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`Media ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : file.type?.startsWith('video/') ? (
                      <video
                        src={URL.createObjectURL(file)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Icon name="File" size={24} color="var(--color-text-muted)" />
                      </div>
                    )}
                    
                    {index === 3 && mediaFiles.length > 4 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          +{mediaFiles.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Post Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-smooth">
              <Icon name="Heart" size={20} />
              <span className="text-sm font-medium">Like</span>
            </button>
            <button className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-smooth">
              <Icon name="MessageCircle" size={20} />
              <span className="text-sm font-medium">Comment</span>
            </button>
            <button className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-smooth">
              <Icon name="Share" size={20} />
              <span className="text-sm font-medium">Share</span>
            </button>
          </div>
          <button className="text-text-secondary hover:text-primary transition-smooth">
            <Icon name="Bookmark" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostPreview;