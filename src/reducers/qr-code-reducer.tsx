import { QRCodeGeneratorState } from '../ts/interfaces/qr-code-generator-state';
import { QRCodeGeneratorAction } from '../ts/types/reducer-types';
import { initialState } from '../constants/constants';

export const qrCodeReducer = (
  state: QRCodeGeneratorState,
  action: QRCodeGeneratorAction
): QRCodeGeneratorState => {
  switch (action.type) {
    case 'UPDATE_COLORS': {
      return {
        ...state,
        colors: {
          ...state.colors,
          ...action.value
        }
      };
    }
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
      const retainedFields = {
        // Define fields to retain on reset
        colors: state.colors,
        qrCodeURL: state.qrCodeURL,
        placeId: state.placeId,
        description: state.description,
        precision: state.precision,
        cryptoType: state.cryptoType
      };
      return { ...initialState, ...retainedFields };
    }
    default: {
      return state;
    }
  }
};
