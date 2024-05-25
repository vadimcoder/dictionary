import "./style.css";

export function Checkbox({
  label,
  value,
  onChange,
}: {
  label?: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <form>
      <label className={"Checkbox"}>
        <input
          type={"checkbox"}
          checked={value}
          onChange={({ target: { checked } }) => {
            onChange(checked);
          }}
        />
        {label}
      </label>
    </form>
  );
}
