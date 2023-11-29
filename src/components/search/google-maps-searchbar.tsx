import { useState, useEffect, ChangeEvent } from 'react';
import type { AxiosError, AxiosResponse } from 'axios';
import { styles } from '../../assets/styles';
import { useHandleInputChange } from '../../hooks/callbacks/use-handle-input-change.tsx';
import axios from 'axios';

type Suggestion = {
  description: string;
  place_id: string;
};

export const GoogleMapsSearchbar = () => {
  const [input, setInput] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedDescription, setSelectedDescription] = useState<string>('');

  const handleInputChange = useHandleInputChange();

  const { input: inputStyle, label, fieldContainer, dropdownItem } = styles; // Assuming you have a dropdownItem style
  const autocompleteEndpoint = '/qr/autocomplete';

  useEffect(() => {
    let delayDebounceFunction: NodeJS.Timeout;

    if (input) {
      delayDebounceFunction = setTimeout(() => {
        axios
          .post(autocompleteEndpoint, { location: input })
          .then((response: AxiosResponse) => {
            setSuggestions(response.data.res);
            setSelectedDescription('');
          })
          .catch((error: AxiosError) =>
            console.error('Error fetching autocomplete suggestions:', error)
          );
      }, 300);
    } else {
      setSuggestions([]);
    }

    return () => {
      if (delayDebounceFunction) {
        clearTimeout(delayDebounceFunction);
      }
    };
  }, [input]);

  const handleSelect = (description: string) => {
    // Create a fake event object for handleInputChange
    const fakeEvent = {
      target: { value: description }
    } as ChangeEvent<HTMLInputElement>;
    handleInputChange(fakeEvent, 'placeId');
    setInput(description); // Update the input field with the selected description
    setSelectedDescription(description); // Update the selected description
    setSuggestions([]); // Clear suggestions once a selection is made
  };

  return (
    <div style={fieldContainer}>
      <label
        style={label}
        htmlFor="google-maps-search"
      >
        Location Search
      </label>
      <input
        type="text"
        id="google-maps-search"
        style={inputStyle}
        value={selectedDescription || input}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setInput(event.target.value)
        }
        placeholder="Search for a location"
      />
      <div>
        {suggestions.map(suggestion => (
          <div
            role="button"
            tabIndex={0}
            key={suggestion.place_id}
            onClick={() => handleSelect(suggestion.description)}
            onKeyDown={event =>
              event.key === 'Enter' && handleSelect(suggestion.description)
            }
            style={dropdownItem} // Apply styles for dropdown items
          >
            {suggestion.description}
          </div>
        ))}
      </div>
    </div>
  );
};
