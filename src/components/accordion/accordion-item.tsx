import { ReactNode, useState } from 'react';
import { styles } from '../../assets/styles.tsx';
import { useCore } from '../../hooks/use-core.tsx';

interface AccordionItemProperties {
  title: string;
  children: ReactNode;
}

export const AccordionItem = ({ title, children }: AccordionItemProperties) => {
  const [isOpen, setIsOpen] = useState(false);
  const { accordion, accordionTitle, accordionTitleOpen } = styles;
  const { setError } = useCore();
  return (
    <div className="accordion-item">
      <button
        style={accordion}
        className="accordion-title"
        onClick={() => {
          setError('');
          setIsOpen(!isOpen);
        }}
      >
        <span style={isOpen ? accordionTitleOpen : accordionTitle}>
          {title} {isOpen ? '🔺' : '🔻'}
        </span>
      </button>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};
