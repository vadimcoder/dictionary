import "./style.css";

export function InputNumber({
  value,
  setValue,
  className,
}: {
  value: number;
  setValue: (value: number) => void;
  className: string;
}) {
  return (
    <input
      value={value}
      onChange={({ target: { value } }) => {
        const parsed = parseInt(value);

        if (Number.isNaN(parsed)) {
          setValue(0);
        } else {
          setValue(parseInt(value));
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
