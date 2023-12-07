import { QRCodeRequest } from '../interfaces/qr-code-request-interfaces';

export type QRCodeGeneratorAction =
  | { field: keyof QRCodeRequest; type: 'SET_FIELD'; value: string }
  | { type: 'UPDATE_COLORS'; value: { dark: string; light: string } }
  | { type: 'SET_ERROR'; value: string }
  | { type: 'SET_LOADING'; value: boolean }
  | { type: 'SET_QRCODE_URL'; value: string | null }
  | { type: 'RESET_STATE' };
