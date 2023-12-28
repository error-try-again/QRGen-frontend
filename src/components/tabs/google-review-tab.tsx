import React from 'react';
import { styles } from '../../assets/styles.tsx';
import { Divider } from '../extras/divider.tsx';
import { GoogleMapsSearchbar } from '../search/google-maps-searchbar.tsx';
import { AdditionalOptions } from '../options/additional-options.tsx';
import { ErrorSection } from '../errors/error-section.tsx';
import { GenerateButtonsSection } from '../buttons/generate-buttons-section.tsx';

interface GoogleReviewTabProperties {
  googleGettingStartedUrl: string | undefined;
  qrgenDocumentsUrl: string | undefined;
  googleSdkEnabled: boolean;
}

const GoogleMapsSection: React.FC = () => (
  <>
    <GoogleMapsSearchbar />
    <Divider />
    <AdditionalOptions />
    <ErrorSection />
    <GenerateButtonsSection />
  </>
);

const DisabledSection: React.FC<GoogleReviewTabProperties> = ({
  googleGettingStartedUrl,
  qrgenDocumentsUrl
}) => (
  <>
    <p>Google Maps Search SDK is currently disabled.</p>
    <p>
      If you would like to enable google places search for reviews, you can get
      a free API key from Google
      <a
        href={googleGettingStartedUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {' '}
        here
      </a>
      .
    </p>
    <p>
      For more information on how to enable the Google Maps Search SDK for
      QRGen, please visit the docs
      <a
        href={qrgenDocumentsUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {' '}
        here
      </a>
      .
    </p>
  </>
);

export const GoogleReviewTab: React.FC<GoogleReviewTabProperties> = ({
  googleGettingStartedUrl,
  qrgenDocumentsUrl,
  googleSdkEnabled
}) => {
  const { sectionTitle, section } = styles;
  return (
    <section style={section}>
      <h2 style={sectionTitle}>Google Review</h2>
      <Divider />
      {googleSdkEnabled ? (
        <GoogleMapsSection />
      ) : (
        <DisabledSection
          googleGettingStartedUrl={googleGettingStartedUrl}
          qrgenDocumentsUrl={qrgenDocumentsUrl}
          googleSdkEnabled={googleSdkEnabled}
        />
      )}
    </section>
  );
};
