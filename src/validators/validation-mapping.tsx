import { Tabs } from '../ts/enums/tabs-enum';
import { isValidPhoneNumber } from './is-valid-phone.tsx';
import { QRCodeGeneratorState } from '../ts/interfaces/qr-code-generator-state.tsx';
import { isValidUrl } from './is-valid-url.tsx';
import { isTextWithinQRSizeLimit } from './is-within-qr-size-limit.tsx';
import { isValidAmount } from './is-amount-valid.tsx';

type TabFieldMapping = {
  errorMessage: string;
  fields: string[];
  validation?: (state: QRCodeGeneratorState) => boolean;
  validationError?: string;
};

export const requiredFieldsMapping: Record<Tabs, TabFieldMapping> = {
  [Tabs.Crypto]: {
    errorMessage: 'Address is required',
    fields: ['address', 'cryptoType'],
    validation: (state: QRCodeGeneratorState) => isValidAmount(state.amount),
    validationError: 'Invalid amount'
  },
  [Tabs.Email]: {
    errorMessage: 'Email is required',
    fields: ['email']
  },
  [Tabs.Event]: {
    errorMessage: 'Event, Venue, Start Time and End Time are required',
    fields: ['event', 'venue', 'startTime', 'endTime']
  },
  [Tabs.GeoLocation]: {
    errorMessage: 'Latitude and Longitude are required',
    fields: ['latitude', 'longitude'],
    validationError: 'Invalid latitude or longitude'
  },
  [Tabs.MeCard]: {
    errorMessage: 'First Name, Last Name and Phone are required',
    fields: ['firstName', 'lastName', 'phone1']
  },
  [Tabs.Phone]: {
    errorMessage: 'Phone is required',
    fields: ['phone'],
    validation: (state: QRCodeGeneratorState) =>
      isValidPhoneNumber(state.phone),
    validationError: 'Invalid phone number'
  },
  [Tabs.Review]: {
    errorMessage: 'Please select a location from the dropdown',
    fields: ['placeId', 'description']
  },
  [Tabs.SMS]: {
    errorMessage: 'Phone number and SMS message are required',
    validation: (state: QRCodeGeneratorState) =>
      isValidPhoneNumber(state.phone),
    fields: ['phone', 'sms']
  },
  [Tabs.Text]: {
    errorMessage: 'Text is required',
    fields: ['text'],
    validation: (state: QRCodeGeneratorState) =>
      isTextWithinQRSizeLimit(state.text),
    validationError: 'Text exceeds QR size limit'
  },
  [Tabs.Url]: {
    errorMessage: 'URL is required',
    fields: ['url'],
    validation: (state: QRCodeGeneratorState) => isValidUrl(state.url),
    validationError: 'Invalid URL'
  },
  [Tabs.VCard]: {
    errorMessage: 'First Name, Last Name, Email and Phone are required',
    fields: ['firstName', 'lastName', 'email', 'phoneWork']
  },
  [Tabs.WiFi]: {
    errorMessage: 'SSID/Name & Encryption type are required',
    fields: ['ssid', 'encryption']
  },
  [Tabs.Zoom]: {
    errorMessage: 'Zoom Meeting ID and Password are required',
    fields: ['zoomId', 'zoomPass']
  }
};
