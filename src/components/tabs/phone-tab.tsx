import { styles } from '../../assets/styles';
import { Divider } from '../extras/divider';
import { InputFields } from '../../renders/render-input-fields';
import { AdditionalOptions } from '../options/additional-options.tsx';

export const PhoneTab = () => {
  const { section, sectionTitle } = styles;
  return (
    <section style={section}>
      <h2 style={sectionTitle}>Phone</h2>
      <Divider />
      {InputFields({ keys: ['phone'] })}
      <Divider />
      <AdditionalOptions />
    </section>
  );
};
