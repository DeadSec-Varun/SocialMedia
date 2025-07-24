import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DraftManager = ({ content, mediaFiles, onLoadDraft, onSaveDraft }) => {
  const [drafts, setDrafts] = useState([]);
  const [showDrafts, setShowDrafts] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState('saved');

  // Load drafts from localStorage on component mount
  useEffect(() => {
    const savedDrafts = localStorage.getItem('socialconnect_drafts');
    if (savedDrafts) {
      try {
        setDrafts(JSON.parse(savedDrafts));
      } catch (error) {
        console.error('Error loading drafts:', error);
      }
    }
  }, []);

  // Auto-save functionality
  useEffect(() => {
    if (content.trim() || mediaFiles.length > 0) {
      setAutoSaveStatus('saving');
      
      const autoSaveTimer = setTimeout(() => {
        const draftData = {
          id: 'auto-save',
          content,
          mediaCount: mediaFiles.length,
          timestamp: new Date().toISOString(),
          isAutoSave: true
        };
        
        const updatedDrafts = drafts.filter(draft => draft.id !== 'auto-save');
        updatedDrafts.unshift(draftData);
        
        setDrafts(updatedDrafts);
        localStorage.setItem('socialconnect_drafts', JSON.stringify(updatedDrafts));
        setAutoSaveStatus('saved');
      }, 2000);

      return () => clearTimeout(autoSaveTimer);
    }
  }, [content, mediaFiles, drafts]);

  const handleSaveDraft = () => {
    if (!content.trim() && mediaFiles.length === 0) return;

    const draftData = {
      id: Date.now().toString(),
      content,
      mediaCount: mediaFiles.length,
      timestamp: new Date().toISOString(),
      isAutoSave: false
    };

    const updatedDrafts = [draftData, ...drafts.filter(draft => !draft.isAutoSave)];
    setDrafts(updatedDrafts);
    localStorage.setItem('socialconnect_drafts', JSON.stringify(updatedDrafts));
    onSaveDraft(draftData);
  };

  const handleLoadDraft = (draft) => {
    onLoadDraft(draft);
    setShowDrafts(false);
  };

  const handleDeleteDraft = (draftId) => {
    const updatedDrafts = drafts.filter(draft => draft.id !== draftId);
    setDrafts(updatedDrafts);
    localStorage.setItem('socialconnect_drafts', JSON.stringify(updatedDrafts));
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const getAutoSaveIcon = () => {
    switch (autoSaveStatus) {
      case 'saving':
        return <Icon name="Loader2" size={14} className="text-text-muted animate-spin" />;
      case 'saved':
        return <Icon name="Check" size={14} className="text-success" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {/* Draft Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          {/* Auto-save Status */}
          <div className="flex items-center space-x-2">
            {getAutoSaveIcon()}
            <span className="text-xs text-text-muted">
              {autoSaveStatus === 'saving' ? 'Saving...' : 'Auto-saved'}
            </span>
          </div>

          {/* Manual Save */}
          <Button
            variant="ghost"
            size="sm"
            iconName="Save"
            onClick={handleSaveDraft}
            disabled={!content.trim() && mediaFiles.length === 0}
            className="text-text-secondary hover:text-primary"
          >
            Save Draft
          </Button>
        </div>

        {/* View Drafts */}
        {drafts.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            iconName="FileText"
            onClick={() => setShowDrafts(!showDrafts)}
            className="text-text-secondary hover:text-primary"
          >
            Drafts ({drafts.length})
          </Button>
        )}
      </div>

      {/* Drafts List */}
      {showDrafts && drafts.length > 0 && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setShowDrafts(false)}
          />
          
          {/* Drafts Panel */}
          <div className="absolute top-full right-0 mt-2 w-80 bg-background border border-border rounded-xl shadow-floating z-50 max-h-96 overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-text-primary">Your Drafts</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setShowDrafts(false)}
                  className="text-text-muted hover:text-text-primary"
                />
              </div>

              <div className="space-y-3">
                {drafts.map((draft) => (
                  <div
                    key={draft.id}
                    className="p-3 border border-border rounded-lg hover:bg-surface transition-smooth"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Icon 
                          name={draft.isAutoSave ? "RotateCcw" : "FileText"} 
                          size={16} 
                          className="text-text-muted"
                        />
                        <span className="text-sm font-medium text-text-primary">
                          {draft.isAutoSave ? 'Auto-saved' : 'Draft'}
                        </span>
                      </div>
                      <span className="text-xs text-text-muted">
                        {formatTimestamp(draft.timestamp)}
                      </span>
                    </div>

                    <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                      {draft.content || 'Draft with media files'}
                    </p>

                    {draft.mediaCount > 0 && (
                      <div className="flex items-center space-x-1 mb-3">
                        <Icon name="Image" size={14} className="text-text-muted" />
                        <span className="text-xs text-text-muted">
                          {draft.mediaCount} media file{draft.mediaCount > 1 ? 's' : ''}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLoadDraft(draft)}
                        className="text-primary hover:text-primary hover:bg-primary-50"
                      >
                        Load Draft
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Trash2"
                        onClick={() => handleDeleteDraft(draft.id)}
                        className="text-error hover:text-error hover:bg-error-50"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DraftManager;