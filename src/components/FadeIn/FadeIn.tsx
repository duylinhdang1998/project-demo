import { ReactNode } from 'react';
import './styles.css';

interface FadeInProps {
  children: ReactNode;
}

// FIXME: Optimize css bằng cách copy code dùng ra 1 file css
export const FadeIn = ({ children }: FadeInProps) => {
  return (
    <div className="animate__animated animate__fadeIn" style={{ width: '100%' }}>
      {children}
    </div>
  );
};
