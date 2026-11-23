import PropTypes from "prop-types";

function QuantityInput({value,onChange,onIncrement,onDecrement,label}) {
    return (
        <div>
            <button  type="button" onClick={onDecrement} aria-label={`Decrease quantity of ${label}`} > - </button>
            <input type="number" min="1" value={value} onChange={(e) => onChange (e.target.value)} aria-label={`Quantity of ${label}`} />
            <button type="button" onClick={onIncrement} aria-label={`Increase quantity of ${label}`}> + </button>
        </div>
    );
}

QuantityInput.PropTypes = {
    value: PropTypes.oneOfType([PropTypes.number,PropTypes.string]).isRequired,
    onChange: PropTypes.func.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
};

export default QuantityInput;