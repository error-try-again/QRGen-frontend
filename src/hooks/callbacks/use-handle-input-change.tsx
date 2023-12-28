import { ChangeEvent, useCallback } from 'react';
import { QRCodeRequest } from '../../ts/interfaces/qr-code-request-interfaces';
import { useCore } from '../use-core';

export const useHandleInputChange = () => {
  const { dispatch, state } = useCore();

  // return a memoized callback that only changes if the state or dispatch change
  return useCallback(evaluateEventType, [dispatch, state]);

  function evaluateEventType(
    valueOrEvent:
      | string
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<
          HTMLElement & {
            value: string;
          }
        >,
    fieldName: keyof QRCodeRequest
  ) {
    // if the valueOrEvent is a string, then we know that the event is coming from a dropdown
    // if it is not a string, then we know that the event is coming from an input field
    const value =
      typeof valueOrEvent === 'string'
        ? valueOrEvent
        : valueOrEvent.target.value;

    // if the value is different from the current state, then we know that the user has changed the value
    if (state[fieldName] !== value) {
      // dispatch the new value to the state
      dispatch({
        type: 'SET_FIELD',
        field: fieldName,
        value
      });
    }
  }
};

export const useHandleColourChange = () => {
  const { dispatch, state } = useCore();

  return useCallback(evaluateColourType, [dispatch, state]);

  function evaluateColourType(value: string, colorType: 'dark' | 'light') {
    if (state.colors && state.colors[colorType] !== value) {
      dispatch({
        type: 'UPDATE_COLORS',
        value: {
          ...state.colors,
          [colorType]: value
        }
      });
    }
  }
};
