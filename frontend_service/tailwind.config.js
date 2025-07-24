/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#1877F2', // blue-600
        'primary-50': '#EBF4FF', // blue-50
        'primary-100': '#DBEAFE', // blue-100
        'primary-500': '#3B82F6', // blue-500
        'primary-600': '#1877F2', // blue-600
        'primary-700': '#1D4ED8', // blue-700
        'primary-foreground': '#FFFFFF', // white

        // Secondary Colors
        'secondary': '#42B883', // green-500
        'secondary-50': '#ECFDF5', // green-50
        'secondary-100': '#D1FAE5', // green-100
        'secondary-500': '#42B883', // green-500
        'secondary-600': '#059669', // green-600
        'secondary-foreground': '#FFFFFF', // white

        // Accent Colors
        'accent': '#E1306C', // pink-600
        'accent-50': '#FDF2F8', // pink-50
        'accent-100': '#FCE7F3', // pink-100
        'accent-500': '#EC4899', // pink-500
        'accent-600': '#E1306C', // pink-600
        'accent-foreground': '#FFFFFF', // white

        // Background Colors
        'background': '#FFFFFF', // white
        'surface': '#F8F9FA', // gray-50
        'surface-100': '#F3F4F6', // gray-100
        'surface-200': '#E5E7EB', // gray-200

        // Text Colors
        'text-primary': '#1C1E21', // gray-900
        'text-secondary': '#65676B', // gray-600
        'text-muted': '#9CA3AF', // gray-400

        // Status Colors
        'success': '#00D74A', // green-400
        'success-50': '#F0FDF4', // green-50
        'success-100': '#DCFCE7', // green-100
        'success-foreground': '#FFFFFF', // white

        'warning': '#FF8C00', // orange-500
        'warning-50': '#FFF7ED', // orange-50
        'warning-100': '#FFEDD5', // orange-100
        'warning-foreground': '#FFFFFF', // white

        'error': '#E41E3F', // red-600
        'error-50': '#FEF2F2', // red-50
        'error-100': '#FEE2E2', // red-100
        'error-foreground': '#FFFFFF', // white

        // Border Colors
        'border': '#E5E7EB', // gray-200
        'border-light': '#F3F4F6', // gray-100
      },
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'caption': ['Inter', 'system-ui', 'sans-serif'],
        'data': ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'DEFAULT': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        'full': '9999px',
        'social-card': '8px',
        'social-button': '4px',
      },
      boxShadow: {
        'elevation-1': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'elevation-2': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'elevation-3': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'floating': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '300ms',
      },
      spacing: {
        '18': '4.5rem',
        '76': '19rem',
        '88': '22rem',
      },
      zIndex: {
        '90': '90',
        '100': '100',
        '110': '110',
      },
      animation: {
        'fade-in': 'fadeIn 150ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}