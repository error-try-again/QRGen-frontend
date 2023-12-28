import { ReactNode } from 'react';

interface AccordionProperties {
  children: ReactNode;
}

export const Accordion = ({ children }: AccordionProperties) => {
  return <div className="accordion">{children}</div>;
};
