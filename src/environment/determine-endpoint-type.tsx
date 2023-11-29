import { environment } from '../config.tsx';

export function getBackendUrl() {
  return environment ?? undefined;
}
