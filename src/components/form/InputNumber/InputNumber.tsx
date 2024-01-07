import "./style.css";

export function InputNumber({
  value,
  onChange,
  className,
}: {
  value: number;
  onChange: (value: number) => void;
  className: string;
}) {
  return (
    <input
      value={value}
      onChange={({ target: { value } }) => {
        const parsed = parseInt(value, 10);

        if (Number.isNaN(parsed)) {
          onChange(0);
        } else {
          onChange(parseInt(value));
        }
      }}
      type="number"
      min="0"
      inputMode="numeric"
      pattern="[0-9]*"
      className={className}
    />
  );
}
