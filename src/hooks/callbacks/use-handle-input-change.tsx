import { ChangeEvent, useCallback } from 'react';
import { QRCodeRequest } from '../../ts/interfaces/qr-code-request-interfaces';
import { useCore } from '../use-core';

export const useHandleInputChange = () => {
  const { dispatch, state } = useCore();
  return useCallback(
    (
      valueOrEvent:
        | string
        | ChangeEvent<HTMLInputElement>
        | ChangeEvent<HTMLTextAreaElement>,
      fieldName: keyof QRCodeRequest
    ) => {
      const value =
        typeof valueOrEvent === 'string'
          ? valueOrEvent
          : valueOrEvent.target.value;

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
