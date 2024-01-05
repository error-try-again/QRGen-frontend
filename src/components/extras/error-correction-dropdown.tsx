import { useCore } from '../../hooks/use-core.tsx';
import { styles } from '../../assets/styles.tsx';
import { useHandleInputChange } from '../../hooks/callbacks/use-handle-input-change.tsx';
import { DropdownField } from '../fields/dropdown-field.tsx';
import { ERROR_CORRECTION_LEVELS } from '../../constants/constants.tsx';

export function ErrorCorrectionDropdown() {
  const { state, setError } = useCore();
  const { fieldContainer } = styles;
  const handleInputChange = useHandleInputChange();
  return (
    <>
      <div style={fieldContainer}>
        <DropdownField
          keyName="precision"
          handleChange={handleInputChange}
          options={ERROR_CORRECTION_LEVELS}
          value={state.precision || ''}
          setError={setError}
        />
      </div>
    </>
  );
}
