export type T_SELECT_OPTION = {
  label: string;
  value: number;
};

export function Select({
  value,
  onChange,
  options,
}: {
  value: number;
  onChange: (value: number) => void;
  options: T_SELECT_OPTION[];
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(parseInt(event.target.value, 10))}
    >
      {options.map(({ label, value }: T_SELECT_OPTION) => (
        <option value={value} key={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
