import { QRCodeGeneratorState } from '../ts/interfaces/qr-code-generator-state';
import { QRCodeGeneratorAction } from '../ts/types/reducer-types';
import { initialState } from '../constants/constants';

export const qrCodeReducer = (
  state: QRCodeGeneratorState,
  action: QRCodeGeneratorAction
): QRCodeGeneratorState => {
  switch (action.type) {
    case 'SET_FIELD': {
      return { ...state, [action.field]: action.value };
    }
    case 'SET_LOADING': {
      return { ...state, isLoading: action.value };
    }
    case 'SET_QRCODE_URL': {
      return { ...state, qrCodeURL: action.value, isLoading: false };
    }
    case 'RESET_STATE': {
      // reset the state to the initial state, pass the qrCodeURL and placeId values to the new state
      // This is so that the QR code URL and place ID are not cleared when the state is reset
      return {
        ...initialState,
        qrCodeURL: state.qrCodeURL,
        placeId: state.placeId,
        description: state.description
      };
    }
    default: {
      return state;
    }
  }
};
