import React from 'react';

const NotificationBadge = ({ 
  count = 0, 
  showZero = false, 
  maxCount = 99, 
  size = 'md',
  className = '',
  variant = 'primary'
}) => {
  // Don't render if count is 0 and showZero is false
  if (count === 0 && !showZero) {
    return null;
  }

  // Format count display
  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();

  // Size variants
  const sizeClasses = {
    sm: 'min-w-[16px] h-4 text-xs px-1',
    md: 'min-w-[20px] h-5 text-xs px-1.5',
    lg: 'min-w-[24px] h-6 text-sm px-2'
  };

  // Color variants
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent text-accent-foreground',
    success: 'bg-success text-success-foreground',
    warning: 'bg-warning text-warning-foreground',
    error: 'bg-error text-error-foreground'
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center
        rounded-full font-medium font-data
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
        animate-fade-in
        shadow-elevation-2
      `}
      role="status"
      aria-label={`${count} ${count === 1 ? 'notification' : 'notifications'}`}
    >
      {displayCount}
    </span>
  );
};

export default NotificationBadge;