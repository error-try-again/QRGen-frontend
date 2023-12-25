import { useCore } from '../../hooks/use-core';
import { styles } from '../../assets/styles';
import { useHandleInputChange } from '../../hooks/callbacks/use-handle-input-change';
import { Divider } from '../extras/divider';
import { ChangeEvent } from 'react';
import { InputFields } from '../../renders/render-input-fields';
import { AdditionalOptions } from '../options/additional-options.tsx';
import { ErrorSection } from '../errors/error-section.tsx';
import { GenerateButtonsSection } from '../buttons/generate-buttons-section.tsx';

export const EmailTab = () => {
  const { state } = useCore();
  const { sectionTitle, section, fieldContainer, label, input } = styles;
  const handleInputChange = useHandleInputChange();
  return (
    <section style={section}>
      <h2 style={sectionTitle}>Email</h2>
      <Divider />
      {InputFields({ keys: ['email', 'subject', 'cc', 'bcc'] })}
      <div style={fieldContainer}>
        <label
          style={label}
          htmlFor="body"
        >
          Enter Email Body
        </label>
        <textarea
          id="body"
          style={{ ...input, height: '100px' }}
          value={state.body || ''}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
            handleInputChange(event, 'body');
          }}
          placeholder="Enter your email body here"
        />
      </div>
      <Divider />
      <AdditionalOptions />
      <ErrorSection />
      <GenerateButtonsSection />
    </section>
  );
};
