import 'animate.css';
import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
}

export const FadeIn = ({ children }: FadeInProps) => {
  return (
    <div className="animate__animated animate__fadeIn" style={{ width: '100%' }}>
      {children}
    </div>
  );
};
