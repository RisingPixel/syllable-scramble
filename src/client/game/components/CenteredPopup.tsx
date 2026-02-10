import { useEffect, useRef } from 'react';

import { ReactNode } from "react";

interface CenteredPopupProps {
  children: ReactNode;
  duration?: number;
  type?: 'success' | 'error' | 'combo';
  onComplete?: () => void;
}

const CenteredPopup = ({ 
  children, 
  duration = 1500,
  type = 'success',
  onComplete 
}: CenteredPopupProps) => {
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onCompleteRef.current?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  // Inline mobile detection
  const isMobile = window.innerWidth < 768;
  const getPositionStyle = () => {
    if (isMobile) {
      // Mobile: Position above keyboard area
      return {
        position: 'fixed' as const,
        bottom: type === 'combo' ? 'auto' : 'calc(50vh + 100px)',
        top: type === 'combo' ? '80px' : 'auto',
        left: '50%',
        transform: 'translateX(-50%)',
      };
    }
    
    // Desktop: Center positioning
    return {
      position: 'fixed' as const,
      top: type === 'combo' ? '4rem' : '20%',
      left: '50%',
      transform: 'translateX(-50%)',
    };
  };

  return (
    <div
      className="z-50 pointer-events-none"
      style={{ 
        ...getPositionStyle(),
        animation: 'fade-in 0.2s ease-out, fade-out 0.3s ease-out 1.2s forwards'
      }}
    >
      {children}
    </div>
  );
};

export default CenteredPopup;
