import { useState, useEffect, ChangeEvent, useRef } from 'react';
import axios from 'axios';
import { styles } from '../../assets/styles';
import { ClearIcon } from '../icons/clear-icon.tsx';
import { useHandleInputChange } from '../../hooks/callbacks/use-handle-input-change.tsx';
import { getBackendUrl } from '../../environment/determine-endpoint-type.tsx';
import { useCore } from '../../hooks/use-core.tsx';

type Suggestion = {
  description: string;
  place_id: string;
};

export const GoogleMapsSearchbar = () => {
  const { setError } = useCore();
  const [userInput, setUserInput] = useState<string>('');
  const [hasSelected, setHasSelected] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false); // New state for input focus
  const blurTimeoutReference = useRef<number | null>(null);

  const {
    searchbar,
    label,
    fieldContainer,
    inputContainer,
    dropdownItem,
    clearIcon
  } = styles;

  const autocompleteEndpoint = getBackendUrl() + '/qr/autocomplete';

  const handleInputChange = useHandleInputChange();

  useEffect(() => {
    if (!userInput || hasSelected) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await axios.post(autocompleteEndpoint, {
          location: userInput
        });
        setSuggestions(response.data.res);
      } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
      }
    };

    const delayDebounceFunction = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(delayDebounceFunction);
  }, [userInput, hasSelected, autocompleteEndpoint]);

  const clearInput = () => {
    setUserInput('');
    setSuggestions([]);
    setError('');
  };

  const handleFocus = () => {
    if (blurTimeoutReference.current) {
      clearTimeout(blurTimeoutReference.current); // Clear timeout on focus
      // eslint-disable-next-line unicorn/no-null
      blurTimeoutReference.current = null;
    }
    setIsFocused(true);
  };

  const handleBlur = () => {
    blurTimeoutReference.current = window.setTimeout(() => {
      setIsFocused(false);
    }, 200); // Delay the blur handling to allow for click event processing
  };

  const handleSelect = (description: string, placeId: string) => {
    if (blurTimeoutReference.current) {
      clearTimeout(blurTimeoutReference.current); // Clear timeout on selection
      // eslint-disable-next-line unicorn/no-null
      blurTimeoutReference.current = null;
    }
    setUserInput(description);
    setHasSelected(true);
    handleInputChange(placeId, 'placeId');
    handleInputChange(description, 'description');
    setSuggestions([]);
    console.log('Selected:', description, placeId);
  };

  return (
    <div style={fieldContainer}>
      <label
        style={label}
        htmlFor="google-maps-search"
      >
        Location Search
      </label>
      <div style={inputContainer}>
        <input
          type="text"
          id="google-maps-search"
          style={searchbar}
          value={userInput}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setUserInput(event.target.value);
            setHasSelected(false); // Reset selection flag when input changes
          }}
          onFocus={handleFocus} // Handle input focus
          onBlur={handleBlur} // Handle input blur
          placeholder="Search for a location"
        />
        {userInput && (
          <ClearIcon
            style={clearIcon}
            onClick={clearInput}
          />
        )}
      </div>
      <div>
        {isFocused &&
          !hasSelected && // Show suggestions only when input is focused and no selection is made
          suggestions.map(suggestion => (
            <div
              role="button"
              tabIndex={0}
              key={suggestion.place_id}
              onClick={() =>
                handleSelect(suggestion.description, suggestion.place_id)
              }
              onKeyDown={event =>
                event.key === 'Enter' &&
                handleSelect(suggestion.description, suggestion.place_id)
              }
              style={dropdownItem}
            >
              {suggestion.description}
            </div>
          ))}
      </div>
    </div>
  );
};
