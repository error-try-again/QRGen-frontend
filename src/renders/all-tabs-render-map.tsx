import React from 'react';
import { Tabs } from '../ts/enums/tabs-enum';
import { useCore } from '../hooks/use-core';
import { CryptoTab } from '../components/tabs/crypto-tab';
import { EmailTab } from '../components/tabs/email-tab';
import { EventTab } from '../components/tabs/event-tab';
import { GeoLocationTab } from '../components/tabs/geo-location-tab';
import { MeCardTab } from '../components/tabs/me-card-tab';
import { PhoneTab } from '../components/tabs/phone-tab';
import { SmsTab } from '../components/tabs/sms-tab';
import { TextTab } from '../components/tabs/text-tab';
import { UrlTab } from '../components/tabs/url-tab';
import { VCardTab } from '../components/tabs/v-card-tab';
import { WiFiTab } from '../components/tabs/wifi-tab';
import { ZoomTab } from '../components/tabs/zoom-tab';
import { GoogleReviewTab } from '../components/tabs/google-review-tab.tsx';
import {
  googleGettingStartedUrl,
  googleSdkEnabled,
  qrgenDocumentsUrl
} from '../config.tsx';

export const TabRenderMap: React.FC = () => {
  const { activeTab } = useCore();

  const tabRenderers = {
    [Tabs.Crypto]: () => <CryptoTab />,
    [Tabs.Email]: () => <EmailTab />,
    [Tabs.Event]: () => <EventTab />,
    [Tabs.GeoLocation]: () => <GeoLocationTab />,
    [Tabs.MeCard]: () => <MeCardTab />,
    [Tabs.Phone]: () => <PhoneTab />,
    [Tabs.Review]: () => (
      <GoogleReviewTab
        googleGettingStartedUrl={googleGettingStartedUrl}
        qrgenDocumentsUrl={qrgenDocumentsUrl}
        googleSdkEnabled={googleSdkEnabled}
      />
    ),
    [Tabs.SMS]: () => <SmsTab />,
    [Tabs.Text]: () => <TextTab />,
    [Tabs.Url]: () => <UrlTab />,
    [Tabs.VCard]: () => <VCardTab />,
    [Tabs.WiFi]: () => <WiFiTab />,
    [Tabs.Zoom]: () => <ZoomTab />
  };

  return tabRenderers[activeTab]();
};
