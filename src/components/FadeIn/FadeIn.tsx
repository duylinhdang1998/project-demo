import { ReactNode } from 'react';
import 'animate.css';

interface FadeInProps {
  children: ReactNode;
}

export const FadeIn = ({ children }: FadeInProps) => {
  return <div className="animate__animated animate__fadeIn">{children}</div>;
};
