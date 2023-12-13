import "../Styles/Quadrant.css";

function Quadrant({ value, index, toggle }) {
  return (
    <div
      className={`containerQuadrant ' ${
        value === "X" ? "xMode" : value === "O" ? "oMode" : ""
      }`}
      key={index}
      onClick={() => {
        toggle(index);
      }}
    >
      {value}
    </div>
  );
}

export default Quadrant;
