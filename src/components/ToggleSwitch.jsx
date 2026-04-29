import { useContext } from "react";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import "../blocks/ToggleSwitch.css";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext,
  );

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        onChange={handleToggleSwitchChange}
        checked={currentTemperatureUnit === "C"}
      />

      <span className="toggle-switch__slider" />

      <span className="toggle-switch__labels">
        <span
          className={
            currentTemperatureUnit === "F"
              ? "toggle-switch__label active"
              : "toggle-switch__label"
          }
        >
          F
        </span>
        <span
          className={
            currentTemperatureUnit === "C"
              ? "toggle-switch__label active"
              : "toggle-switch__label"
          }
        >
          C
        </span>
      </span>
    </label>
  );
}

export default ToggleSwitch;
