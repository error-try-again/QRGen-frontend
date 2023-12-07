import { styles } from '../../assets/styles';
import { Divider } from '../extras/divider';
import { InputFields } from '../../renders/render-input-fields';
import { AdditionalOptions } from '../options/additional-options.tsx';

export const TextTab = () => {
  const { sectionTitle, section } = styles;
  return (
    <section style={section}>
      <h2 style={sectionTitle}>Text</h2>
      <Divider />
      {InputFields({ keys: ['text'] })}
      <Divider />
      <AdditionalOptions />
    </section>
  );
};
