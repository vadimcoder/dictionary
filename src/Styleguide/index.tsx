import "./style.css";

export function Styleguide() {
  const colors = [
    "blue",
    "blue-2",
    "pink",
    "pink-darker",
    "form-control",
    "form-control-disabled",
    "red",
    "red-softer",
    "green",
    "green-softer",
  ];

  return (
    <div className={"Styleguide__colors"}>
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
  );
}
