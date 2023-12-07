import { Accordion } from '../accordion/accordion.tsx';
import { AccordionItem } from '../accordion/accordion-item.tsx';
import { ErrorCorrectionDropdown } from '../extras/error-correction-dropdown.tsx';
import { Divider } from '../extras/divider.tsx';
import { ColorPicker } from '../extras/colour-picker.tsx';

export const AdditionalOptions = () => (
  <Accordion>
    <AccordionItem title="Additional Options">
      <ErrorCorrectionDropdown />
      <Divider />
      <ColorPicker />
      <Divider />
    </AccordionItem>
  </Accordion>
);
