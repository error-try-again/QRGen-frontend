import { styles } from '../../assets/styles';
import { Divider } from '../extras/divider';
import { RenderMeCard } from '../../renders/render-me-card';
import { AdditionalOptions } from '../options/additional-options.tsx';

export const MeCardTab = () => {
  const { sectionTitle, section } = styles;
  return (
    <section style={section}>
      <h2 style={sectionTitle}>MeCard</h2>
      <Divider />
      <RenderMeCard />
      <Divider />
      <AdditionalOptions />
    </section>
  );
};
