import React from 'react';
import { Button } from './ui/button';

interface FloatingActionButtonProps {
  icon: React.ElementType;
  onClick: () => void;
  label?: string;
  className?: string;
}

export function FloatingActionButton({ 
  icon: Icon, 
  onClick, 
  label, 
  className = '' 
}: FloatingActionButtonProps) {
  return (
    <div className="fixed bottom-24 right-6 z-50">
      <Button
        onClick={onClick}
        className={`
          h-14 w-14 rounded-full shadow-lg 
          bg-gradient-to-r from-[#6366F1] to-[#3B82F6] 
          hover:from-[#5B5BD6] hover:to-[#2563EB]
          text-white border-0
          transition-all duration-200 ease-in-out
          hover:scale-105 hover:shadow-xl
          ${className}
        `}
        title={label}
      >
        <Icon className="w-6 h-6" />
      </Button>
      {label && (
        <div className="absolute -top-12 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
          {label}
        </div>
      )}
    </div>
  );
}