import { styles } from '../assets/styles';
import {
  DESKTOP_MEDIA_QUERY_THRESHOLD,
  V_CARD_VERSION_LIST
} from '../constants/constants';
import { VCardFields } from '../constants/fields';
import { useCore } from '../hooks/use-core';
import { RenderFieldsInColumns } from './render-fields-as-cols';
import { useHandleInputChange } from '../hooks/callbacks/use-handle-input-change';
import { DropdownField } from '../components/fields/dropdown-field.tsx';

export function RenderVCard() {
  const { state, setError } = useCore();
  const { label, fieldContainer } = styles;

  const handleInputChange = useHandleInputChange();

  return (
    <>
      <div style={fieldContainer}>
        <p style={label}>vCard Version</p>
        <DropdownField
          keyName="version"
          handleChange={handleInputChange}
          options={V_CARD_VERSION_LIST}
          value={state.version || ''}
          setError={setError}
        />
      </div>
      <>
        {window.innerWidth >= DESKTOP_MEDIA_QUERY_THRESHOLD ? (
          <RenderFieldsInColumns
            handleInputChange={handleInputChange}
            fields={VCardFields}
            columns={2}
          />
        ) : (
          <RenderFieldsInColumns
            handleInputChange={handleInputChange}
            fields={VCardFields}
            columns={1}
          />
        )}
      </>
    </>
  );
}
