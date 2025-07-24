import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextualHeader from '../../components/ui/ContextualHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import PostComposer from './components/PostComposer';
import AudienceSelector from './components/AudienceSelector';
import PostScheduler from './components/PostScheduler';
import PostPreview from './components/PostPreview';
import DraftManager from './components/DraftManager';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const CreatePost = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);

  //TODO in future updates
  const [selectedAudience, setSelectedAudience] = useState('public');
  const [scheduledDate, setScheduledDate] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Auto-focus on content when component mounts
  useEffect(() => {
    // Small delay to ensure component is fully mounted
    const timer = setTimeout(() => {
      const textarea = document.querySelector('textarea');
      if (textarea) {
        textarea.focus();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const handleMediaUpload = (files) => {
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/') || file.type.startsWith('video/');
      const isValidSize = file.size <= 50 * 1024 * 1024; // 50MB limit
      return isValidType && isValidSize;
    });

    setMediaFiles(prev => [...prev, ...validFiles].slice(0, 10)); // Max 10 files
  };

  const handleRemoveMedia = (index) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleAudienceChange = (audience) => {
    setSelectedAudience(audience);
  };

  const handleScheduleChange = (date) => {
    setScheduledDate(date);
  };

  const handleLoadDraft = (draft) => {
    setContent(draft.content || '');
    // Note: Media files can't be restored from localStorage due to security restrictions
    // In a real app, you'd store media references and reload them from a server
  };

  const handleSaveDraft = (draftData) => {
    // Draft saved notification could be shown here
    console.log('Draft saved:', draftData);
  };

  const handlePost = async () => {
    if (!content.trim() && mediaFiles.length === 0) {
      return;
    }

    setIsPosting(true);

    try {
      const postData = {
        content,
        // mediaFiles: mediaFiles.map(file => ({
        //   type: file.type,
        //   name: file.name,
        //   size: file.size
        // })), // TODO later
        // audience: selectedAudience,
        // scheduledDate,
      };

      await axios.post('http://localhost:4001/api/post', {content, user_id:localStorage.getItem('user_id')}, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      // Clear form
      setContent('');
      setMediaFiles([]);
      setScheduledDate(null);
      setSelectedAudience('public');

      // Navigate back to news feed
      navigate('/news-feed', {
        state: {
          message: scheduledDate ? 'Post scheduled successfully!' : 'Post shared successfully!',
          newPost: postData
        }
      });

    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post. Please try again.');
    } finally {
      setIsPosting(false);
    }
  };

  const canPost = (content.trim() || mediaFiles.length > 0) && !isPosting;

  return (
    <div className="min-h-screen bg-surface">
      <ToastContainer/>
      <ContextualHeader />

      <main className="lg:ml-60 pb-20 lg:pb-8">
        <div className="max-w-4xl mx-auto px-4 py-6 lg:px-6">
          {/* Mobile Header Actions */}
          <div className="lg:hidden flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={() => navigate('/news-feed')}
              className="text-text-secondary"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handlePost}
              disabled={!canPost}
              loading={isPosting}
              className="px-6"
            >
              {scheduledDate ? 'Schedule' : 'Post'}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Composer */}
            <div className="space-y-4">
              {/* Draft Manager */}
              <DraftManager
                content={content}
                mediaFiles={mediaFiles}
                onLoadDraft={handleLoadDraft}
                onSaveDraft={handleSaveDraft}
              />

              {/* Post Composer */}
              <PostComposer
                content={content}
                onContentChange={handleContentChange}
                onMediaUpload={handleMediaUpload}
                mediaFiles={mediaFiles}
                onRemoveMedia={handleRemoveMedia}
              />

              {/* Post Options */}
              <div className="bg-background border border-border rounded-xl p-4">
                <h3 className="font-medium text-text-primary mb-4">Post Settings</h3>

                <div className="space-y-4">
                  {/* Audience Selector */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Who can see this?
                    </label>
                    <AudienceSelector
                      selectedAudience={selectedAudience}
                      onAudienceChange={handleAudienceChange}
                    />
                  </div>

                  {/* Post Scheduler */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      When to publish?
                    </label>
                    <PostScheduler
                      scheduledDate={scheduledDate}
                      onScheduleChange={handleScheduleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Desktop Post Button */}
              <div className="hidden lg:flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/news-feed')}
                  className="text-text-secondary"
                >
                  Cancel
                </Button>

                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    iconName="Eye"
                    onClick={() => setShowPreview(!showPreview)}
                    className="lg:hidden"
                  >
                    Preview
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handlePost}
                    disabled={!canPost}
                    loading={isPosting}
                    className="px-8"
                  >
                    {isPosting ? 'Publishing...' : (scheduledDate ? 'Schedule Post' : 'Publish Post')}
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Preview (Desktop) */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <h3 className="font-medium text-text-primary mb-4 flex items-center space-x-2">
                  <Icon name="Eye" size={18} />
                  <span>Live Preview</span>
                </h3>
                <PostPreview
                  content={content}
                  mediaFiles={mediaFiles}
                  scheduledDate={scheduledDate}
                  audience={selectedAudience}
                />
              </div>
            </div>
          </div>

          {/* Mobile Preview Modal */}
          {showPreview && (
            <div className="lg:hidden fixed inset-0 z-50 bg-background">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-lg font-semibold text-text-primary">Preview</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setShowPreview(false)}
                />
              </div>
              <div className="p-4 overflow-y-auto" style={{ height: 'calc(100vh - 80px)' }}>
                <PostPreview
                  content={content}
                  mediaFiles={mediaFiles}
                  scheduledDate={scheduledDate}
                  audience={selectedAudience}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      <BottomTabNavigation />
    </div>
  );
};

export default CreatePost;