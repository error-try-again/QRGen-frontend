import { MeCardFields } from '../constants/fields';
import { useHandleInputChange } from '../hooks/callbacks/use-handle-input-change';
import { ResponsiveRenderer } from './responsive-renderer';

export const RenderMeCard = () => (
  <ResponsiveRenderer
    handleInputChange={useHandleInputChange()}
    fields={MeCardFields}
  />
);
