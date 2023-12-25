import { styles } from '../../assets/styles';
import { Divider } from '../extras/divider';
import { RenderVCard } from '../../renders/render-v-card';
import { AdditionalOptions } from '../options/additional-options.tsx';
import { ErrorSection } from '../errors/error-section.tsx';
import { GenerateButtonsSection } from '../buttons/generate-buttons-section.tsx';

export const VCardTab = () => {
  const { section, sectionTitle } = styles;
  return (
    <section style={section}>
      <h2 style={sectionTitle}>VCard</h2>
      <Divider />
      <RenderVCard />
      <Divider />
      <AdditionalOptions />
      <ErrorSection />
      <GenerateButtonsSection />
    </section>
  );
};
