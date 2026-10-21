import { en, type MessageKey } from "#shared/locales/en";
/** English is the only shipped locale; never show a language switch without translated content. */
export function useCopy() {
  return (key: MessageKey): string => en[key];
}
