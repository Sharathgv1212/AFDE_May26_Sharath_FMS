/**
 * Static or interactive star rating (1-5).
 * Pass `onChange` to make it editable; otherwise it is read-only.
 */
export default function StarRating({ value = 0, onChange, size = 'md' }) {
  const editable = typeof onChange === 'function';
  return (
    <div className={`star-rating star-${size}`} role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          type="button"
          key={n}
          className={`star ${n <= value ? 'filled' : ''}`}
          onClick={() => editable && onChange(n)}
          disabled={!editable}
          aria-checked={n === value}
          role="radio"
          aria-label={`${n} star${n === 1 ? '' : 's'}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
