import "../Styles/Switch.css";

function Switch({ isChecked, handleCheckboxChange }) {
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span className="slider glass-effect"></span>
    </label>
  );
}

export default Switch;
