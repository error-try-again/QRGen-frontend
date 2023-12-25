import { styles } from '../../assets/styles';
import { Divider } from '../extras/divider';
import { RenderMeCard } from '../../renders/render-me-card';
import { AdditionalOptions } from '../options/additional-options.tsx';
import { ErrorSection } from '../errors/error-section.tsx';
import { GenerateButtonsSection } from '../buttons/generate-buttons-section.tsx';

export const MeCardTab = () => {
  const { sectionTitle, section } = styles;
  return (
    <section style={section}>
      <h2 style={sectionTitle}>MeCard</h2>
      <Divider />
      <RenderMeCard />
      <Divider />
      <AdditionalOptions />
      <ErrorSection />
      <GenerateButtonsSection />
    </section>
  );
};
