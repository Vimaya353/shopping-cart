import PropTypes from "prop-types";
import styles from "./QuantityInput.module.css";

function QuantityInput({ value, onChange, onIncrement, onDecrement, label }) {
  return (
    <div className={styles.group}>
      <button
        type="button"
        className={styles.button}
        onClick={onDecrement}
        aria-label={`Decrease quantity of ${label}`}
      >
        -
      </button>

      <input
        type="number"
        min="1"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={`Quantity of ${label}`}
      />

      <button
        type="button"
        className={styles.button}
        onClick={onIncrement}
        aria-label={`Increase quantity of ${label}`}
      >
        +
      </button>
    </div>
  );
}

QuantityInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onChange: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default QuantityInput;