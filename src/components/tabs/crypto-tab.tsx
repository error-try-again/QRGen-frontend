import { styles } from '../../assets/styles';
import { useHandleInputChange } from '../../hooks/callbacks/use-handle-input-change';
import { useCore } from '../../hooks/use-core';
import { Divider } from '../extras/divider';
import { CRYPTO_TYPES } from '../../constants/constants';
import { InputField } from '../fields/input-field';
import { isFieldRequired } from '../../helpers/is-field-required';
import { Tabs } from '../../ts/enums/tabs-enum'; // import { handleCryptoSelect } from '../../helpers/handle-crypto-select';
import { DropdownField } from '../fields/dropdown-field.tsx';

export const CryptoTab = () => {
  const { sectionTitle, section } = styles;
  const { state, setError, selectedCrypto } = useCore();

  const handleInputChange = useHandleInputChange();

  return (
    <section style={section}>
      <h2 style={sectionTitle}>Crypto</h2>
      <Divider />
      <div>
        <DropdownField
          keyName="cryptoType"
          handleChange={handleInputChange}
          options={CRYPTO_TYPES}
          value={state.cryptoType || ''}
          setError={setError}
        />
      </div>
      <Divider />
      {selectedCrypto && (
        <>
          <InputField
            isRequired={isFieldRequired(Tabs.Crypto, 'address')}
            keyName="address"
            value={state.address}
            handleChange={handleInputChange}
            setError={setError}
          />
          <InputField
            keyName="amount"
            value={state.amount}
            handleChange={handleInputChange}
            setError={setError}
          />
        </>
      )}
    </section>
  );
};
