import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import './select.css';

export interface SelectOption {
  value: string;
  label: string;
  /** Короткая приглушённая пометка справа, например «no content yet». */
  hint?: string;
}

interface SelectProps {
  id?: string;
  value: string;
  options: readonly SelectOption[];
  onChange: (value: string) => void;
}

// Нативный <select> нельзя одинаково оформить во всех браузерах (список рисует ОС),
// поэтому это кнопка + listbox по паттерну WAI-ARIA «select-only combobox».
export function Select({ id, value, options, onChange }: SelectProps): JSX.Element {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selectedIndex = Math.max(0, options.findIndex((o) => o.value === value));
  const [active, setActive] = useState(selectedIndex);
  const selected = options[selectedIndex];

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event: PointerEvent): void => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  const openList = (): void => {
    setActive(selectedIndex);
    setOpen(true);
  };

  const choose = (index: number): void => {
    const option = options[index];
    if (option && option.value !== value) onChange(option.value);
    setOpen(false);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
    if (event.key === 'Tab') {
      setOpen(false);
      return;
    }
    if (!open) {
      if (!['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) return;
      event.preventDefault();
      openList();
      return;
    }
    const last = options.length - 1;
    const keys: Record<string, () => void> = {
      ArrowDown: () => setActive((i) => Math.min(last, i + 1)),
      ArrowUp: () => setActive((i) => Math.max(0, i - 1)),
      Home: () => setActive(0),
      End: () => setActive(last),
      Enter: () => choose(active),
      ' ': () => choose(active),
      Escape: () => setOpen(false),
    };
    const handler = keys[event.key];
    if (!handler) return;
    event.preventDefault();
    handler();
  };

  return (
    <div ref={rootRef} className={`select-root${open ? ' is-open' : ''}`}>
      <button
        id={id}
        type="button"
        className="select-trigger"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
      >
        <span className="select-value">
          {selected?.label}
          {selected?.hint ? <span className="select-hint">{selected.hint}</span> : null}
        </span>
        <svg className="select-chevron" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open ? (
        <ul id={listId} role="listbox" className="select-list" tabIndex={-1}>
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={index === selectedIndex}
              className={`select-option${index === active ? ' is-active' : ''}`}
              onPointerEnter={() => setActive(index)}
              // mousedown, чтобы фокус не уходил с кнопки до выбора.
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => choose(index)}
            >
              <span>{option.label}</span>
              {option.hint ? <span className="select-hint">{option.hint}</span> : null}
              <svg className="select-check" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12l5 5 9-10" />
              </svg>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
