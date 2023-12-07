import { styles } from '../../assets/styles';
import { Divider } from '../extras/divider';
import { InputFields } from '../../renders/render-input-fields';
import { AdditionalOptions } from '../options/additional-options.tsx';

export const ZoomTab = () => {
  const { sectionTitle, section } = styles;
  return (
    <section style={section}>
      <h2 style={sectionTitle}>Zoom</h2>
      <Divider />
      {InputFields({ keys: ['zoomId', 'zoomPass'] })}
      <Divider />
      <AdditionalOptions />
    </section>
  );
};
