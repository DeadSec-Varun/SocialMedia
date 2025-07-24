import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import imageUrls from '../../../image.json';


const PostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.is_liked || false);
  const [likeCount, setLikeCount] = useState(post.like || 0);
  const [isCommented, setIsCommented] = useState(post.is_commented || false);
  const [commentCount, setCommentCount] = useState(post.comment || 0);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked || false);
  const [avatar] = useState(
    localStorage.getItem('user_id') == post.user_id ?
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face" :
    imageUrls[Math.floor(Math.random() * imageUrls.length)]
  );
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleComment = () => {
    setIsCommented(!isCommented);
    setCommentCount(prev => isCommented ? prev - 1 : prev + 1);
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - postTime) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return `${Math.floor(diffInMinutes / 1440)}d`;
  };

  return (
    <article className="bg-background border border-border rounded-lg shadow-elevation-1 mb-4">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src={avatar}
              alt={post.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {true && ( //post.user.isOnline
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-background"></div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-text-primary text-sm truncate">
                {localStorage.getItem('user_id') == post.user_id ? "You" : post.name}
              </h3>
              {true && (  //post.user.isVerified
                <Icon name="BadgeCheck" size={16} className="text-primary flex-shrink-0" />
              )}
            </div>
            <div className="flex items-center space-x-2 text-xs text-text-muted">
              <span>{formatTimeAgo(post.created_on)}</span>
              { true && (  //post.location
                <>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={12} />
                    <span className="truncate max-w-[100px]">New Delhi, India</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          iconName="MoreHorizontal"
          onClick={() => console.log('Post options clicked')}
          aria-label="Post options"
        />
      </div>

      {/* Post Content */}
      {post.content && (
        <div className="px-4 pb-3">
          <p className="text-text-primary text-sm leading-relaxed">
            {post.content}
          </p>
          {post.hashtags && post.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {post.hashtags.map((hashtag, index) => (
                <span
                  key={index}
                  className="text-primary text-sm font-medium cursor-pointer hover:underline"
                >
                  #{hashtag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Post Media */}
      {post.media && post.media.length > 0 && (
        <div className="relative">
          {post.media.length === 1 ? (
            <div className="relative">
              <Image
                src={post.media[0].url}
                alt={post.media[0].alt || 'Post image'}
                className="w-full max-h-96 object-cover"
              />
              {post.media[0].type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Icon name="Play" size={24} color="white" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-1">
              {post.media.slice(0, 4).map((media, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={media.url}
                    alt={media.alt || `Post image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {index === 3 && post.media.length > 4 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        +{post.media.length - 4}
                      </span>
                    </div>
                  )}
                  {media.type === 'video' && (
                    <div className="absolute top-2 right-2">
                      <Icon name="Play" size={16} color="white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Post Actions */}
      <div className="px-4 py-3 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 transition-smooth ${isLiked ? 'text-error' : 'text-text-secondary hover:text-error'
                }`}
              aria-label={isLiked ? 'Unlike post' : 'Like post'}
            >
              <Icon
                name='Heart'
                size={20}
                fill={isLiked ? 'currentColor' : 'none'}
              />
              <span className="text-sm font-medium">{likeCount}</span>
            </button>

            <button
              onClick={handleComment}
              className={`flex items-center space-x-2 ${isCommented ? 'text-primary' : 'text-text-secondary hover:text-primary transition-smooth'
              }`}
              aria-label="View comments"
            >
              <Icon name="MessageCircle" 
                    size={20} 
                    fill={isCommented ? '#1877f2':'none'}/>
              <span className="text-sm font-medium">{commentCount}</span>
            </button>

            <button
              onClick={() => console.log('Share post')}
              className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-smooth"
              aria-label="Share post"
            >
              <Icon name="Share" size={20} />
              <span className="text-sm font-medium">{post.share || 0}</span>
            </button>
          </div>

          <button
            onClick={handleBookmark}
            className={`transition-smooth ${isBookmarked ? 'text-warning' : 'text-text-secondary hover:text-warning'
              }`}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark post'}
          >
            <Icon
              name="Bookmark"
              size={20}
              fill={isBookmarked ? 'currentColor' : 'none'}
            />
          </button>
        </div>
      </div>
    </article>
  );
};

export default PostCard;