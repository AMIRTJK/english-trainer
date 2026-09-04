interface Props {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
  /** Shown between the arrows, e.g. "41–80 of 553 words". */
  summary?: string;
}

/** Previous / next paging for the word list. */
export function Pager({ page, pageCount, onChange, summary }: Props): JSX.Element | null {
  if (pageCount <= 1) return null;

  return (
    <nav className="pager" aria-label="Word list pages">
      <button
        type="button" className="btn btn-sm"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
      >
        ← Prev
      </button>
      <span className="small dim mono-num">
        {summary ? `${summary} · ` : ''}page {page} of {pageCount}
      </span>
      <button
        type="button" className="btn btn-sm"
        onClick={() => onChange(page + 1)}
        disabled={page >= pageCount}
      >
        Next →
      </button>
    </nav>
  );
}
