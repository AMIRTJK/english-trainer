import { highlightSound } from '@/shared/lib/ipa';

interface Props {
  ipa: string;
  /** Bare IPA symbol of the sound to highlight, e.g. `æ`. */
  soundIpa?: string;
}

/**
 * A transcription with its key sound picked out, e.g. /ˈ<mark>æ</mark>pl/.
 * Colour is not the only carrier: the sound is also underlined (AGENTS.md §6).
 */
export function IpaText({ ipa, soundIpa }: Props): JSX.Element {
  const parts = soundIpa ? highlightSound(ipa, soundIpa) : null;
  if (!parts) return <span className="ipa">{ipa}</span>;
  return (
    <span className="ipa">
      {parts.before}
      <mark className="ipa-key">{parts.match}</mark>
      {parts.after}
    </span>
  );
}
