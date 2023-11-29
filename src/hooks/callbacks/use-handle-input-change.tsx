import { useCallback } from 'react';
import { QRCodeRequest } from '../../ts/interfaces/qr-code-request-interfaces';
import { useCore } from '../use-core';

export const useHandleInputChange = () => {
  const { dispatch, state } = useCore();

  return useCallback(
    (value: string, fieldName: keyof QRCodeRequest) => {
      if (state[fieldName] !== value) {
        dispatch({
          type: 'SET_FIELD',
          field: fieldName,
          value
        });
      }
    },
    [dispatch, state]
  );
};
