import { styles } from '../../assets/styles.tsx';
import { Divider } from '../extras/divider.tsx';
import { GoogleMapsSearchbar } from '../search/google-maps-searchbar.tsx';

import { AdditionalOptions } from '../options/additional-options.tsx';

export const GoogleReviewTab = () => {
  const { sectionTitle, section } = styles;
  return (
    <section style={section}>
      <h2 style={sectionTitle}> Google Review </h2>
      <Divider />
      <GoogleMapsSearchbar />
      <Divider />
      <AdditionalOptions />
    </section>
  );
};
