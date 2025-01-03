// src/components/LoadingSpinner.tsx
export default function LoadingSpinner({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) {
    const sizeClasses = {
      small: 'h-4 w-4 border',
      medium: 'h-8 w-8 border-2',
      large: 'h-16 w-16 border-2'
    }
  
    return (
      <div className="flex justify-center items-center">
        <div 
          className={`animate-spin rounded-full border-blue-600 border-t-transparent ${sizeClasses[size]}`}
        />
      </div>
    )
  }