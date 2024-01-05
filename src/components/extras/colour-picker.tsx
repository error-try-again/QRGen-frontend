import React, { ChangeEvent, useState } from 'react';
import { useHandleColourChange } from '../../hooks/callbacks/use-handle-input-change.tsx';
import { styles } from '../../assets/styles.tsx';

export const ColorPicker: React.FC = () => {
  const [backgroundColour, setBackgroundColour] = useState<string>('#000000');
  const [foregroundColour, setForegroundColour] = useState<string>('#ffffff');
  const { colourPickerInput, label } = styles;
  const handleInputChange = useHandleColourChange();
  return (
    <>
      <label
        style={label}
        htmlFor="dark-color"
      >
        Note: it is essential to use a high contrast between the background and
        foreground colours to ensure the QR code can be scanned by a mobile
        device or reader.
      </label>
      <div>
        <label
          style={label}
          htmlFor="dark-color"
        >
          Foreground
        </label>
        <input
          style={colourPickerInput}
          type="color"
          id="dark-color"
          name="dark"
          value={backgroundColour}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setBackgroundColour(event.target.value);
            handleInputChange(event.target.value, 'dark');
          }}
        />
      </div>
      <div>
        <label
          style={label}
          htmlFor="dark-color"
        >
          Background
        </label>
        <input
          style={colourPickerInput}
          type="color"
          id="light-color"
          name="light"
          value={foregroundColour}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setForegroundColour(event.target.value);
            handleInputChange(event.target.value, 'light');
          }}
        />
      </div>
    </>
  );
};
