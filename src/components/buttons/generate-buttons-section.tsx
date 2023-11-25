import { styles } from '../../assets/styles';
import { Tabs } from '../../ts/enums/tabs-enum';
import { ValidateInput } from '../../validators/validate-input';
import {
  dispatchInitialTabState,
  resetBatchAndLoadingState
} from '../../helpers/reset-loading-state';
import { HandleBatchResponse } from '../../services/batching/handle-batch-response.tsx';
import { HandleSingleResponse } from '../../services/handle-single-response.tsx';
import { UpdateBatchJob } from '../../services/batching/update-batch-job';
import { useCore } from '../../hooks/use-core';
import { setInitialTabState } from '../../helpers/check-tab-type';
import { useEffect } from 'react';

function setGenericErrorMessage(
  setError: (value: ((previousState: string) => string) | string) => void
) {
  const errorMessage =
    'Failed to generate the QR code. Please try again later.';
  setError(errorMessage);
}

function dispatchLoading(
  dispatch: (value: { type: 'SET_LOADING'; value: boolean }) => void
) {
  dispatch({ type: 'SET_LOADING', value: true });
}

function dispatchClearQRCodeUrl(
  dispatch: (value: { type: 'SET_QRCODE_URL'; value: string | null }) => void
) {
  dispatch({ type: 'SET_QRCODE_URL', value: '' });
}

export const GenerateButtonsSection = () => {
  const { generateButton, qrButtonsContainer } = styles;

  const {
    dispatch,
    state,
    setError,
    activeTab,
    qrBatchCount,
    setQrBatchCount,
    batchData,
    setBatchData
  } = useCore();

  useEffect(() => {
    const initialState = setInitialTabState(activeTab);

    dispatchInitialTabState({ dispatch, initialState });
  }, [activeTab, dispatch]);

  const handleQRGeneration = async (isBatchAction: boolean) => {
    const validateInput = ValidateInput({
      activeTab,
      state,
      setError,
      setBatchData,
      setQrBatchCount,
      dispatch
    });

    if (!validateInput()) {
      resetBatchAndLoadingState({ dispatch, setBatchData, setQrBatchCount });
      return;
    }

    if (!Tabs[activeTab]) {
      resetBatchAndLoadingState({ dispatch, setBatchData, setQrBatchCount });
      return;
    }

    if (isBatchAction) {
      UpdateBatchJob({
        state,
        setBatchData,
        setQrBatchCount,
        activeTab
      })();
      return;
    }

    dispatchLoading(dispatch);

    if (qrBatchCount === 1) {
      const errorMessage = 'Please add at least 2 QR codes to the batch.';
      setError(errorMessage);
      return;
    }

    const requestData =
      qrBatchCount > 1
        ? { qrCodes: batchData }
        : { customData: { ...state }, type: Tabs[activeTab] };

    try {
      qrBatchCount > 1
        ? await HandleBatchResponse({
            setError,
            setBatchData,
            setQrBatchCount,
            dispatch
          })(requestData)
        : await HandleSingleResponse({
            dispatch,
            setError,
            setBatchData,
            setQrBatchCount
          })(requestData);
    } catch {
      setGenericErrorMessage(setError);
      dispatchClearQRCodeUrl(dispatch);
      resetBatchAndLoadingState({ setBatchData, setQrBatchCount, dispatch });
    }
  };

  return (
    <div style={qrButtonsContainer}>
      <button
        onClick={() => handleQRGeneration(true)}
        style={generateButton}
        aria-label="Add To Bulk"
        aria-busy={state.isLoading}
      >
        Add To Bulk
      </button>
      <button
        onClick={() => handleQRGeneration(false)}
        style={generateButton}
        aria-label="Generate QR Code"
        aria-busy={state.isLoading}
      >
        {qrBatchCount >= 1
          ? `Generate Zip (${qrBatchCount})`
          : 'Generate QR Code'}
      </button>
    </div>
  );
};