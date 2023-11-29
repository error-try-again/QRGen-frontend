import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { styles } from '../../assets/styles';
import { useHandleInputChange } from '../../hooks/callbacks/use-handle-input-change.tsx';

type Suggestion = {
  description: string;
  place_id: string;
};

export const GoogleMapsSearchbar = () => {
  const [input, setInput] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const handleInputChange = useHandleInputChange();

  const { input: inputStyle, label, fieldContainer } = styles;
  const autocompleteEndpoint = '/qr/autocomplete';

  useEffect(() => {
    let delayDebounceFunction: NodeJS.Timeout;

    if (input) {
      delayDebounceFunction = setTimeout(() => {
        axios
          .post(autocompleteEndpoint, { location: input })
          .then(response => setSuggestions(response.data.res))
          .catch(error =>
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
    handleInputChange(description, 'location');
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
        value={input}
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
            style={{ cursor: 'pointer' }}
          >
            {suggestion.description}
          </div>
        ))}
      </div>
    </div>
  );
};
