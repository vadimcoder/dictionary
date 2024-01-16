import "./style.css";

const colors = [
  "blue",
  "blue-2",
  "pink",
  "form-control",
  "form-control-disabled",
  "red",
  "red-softer",
  "green",
  "green-softer",
];

export function Styleguide() {
  return (
    <div className={"Styleguide"}>
      <div className={"StyleguideColors"}>
        {colors.map((color) => (
          <div key={color}>
            <div
              className={"ColorBox"}
              style={{ backgroundColor: `var(--color-${color})` }}
            ></div>
            {color}
          </div>
        ))}
      </div>
    </div>
  );
}
