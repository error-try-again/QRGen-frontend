import { resetBatchAndLoadingState } from '../helpers/reset-loading-state';
import { HandleResponseParameters } from '../ts/interfaces/component-interfaces';

function dispatchQRCodeUrl(
  dispatch: (value: { type: 'SET_QRCODE_URL'; value: string | null }) => void,
  qrCodeURL: string
) {
  dispatch({ type: 'SET_QRCODE_URL', value: qrCodeURL });
}

export const HandleSingleResponse =
  ({
    dispatch,
    setError,
    setBatchData,
    setQrBatchCount
  }: HandleResponseParameters) =>
  async (response: Response) => {
    // Retrieve the QR code URL from the response
    const { qrCodeURL } = await response.json();

    // Clear the QR code URL before dispatching the new one
    dispatchQRCodeUrl(dispatch, '');

    // Dispatch the new QR code URL to the state
    dispatchQRCodeUrl(dispatch, qrCodeURL);

    // Clear any error messages
    setError('');

    // Reset the batch and loading states
    resetBatchAndLoadingState({ dispatch, setBatchData, setQrBatchCount });
  };
