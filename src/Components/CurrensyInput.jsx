import React from "react";
import PropTypes from "prop-types";
const CurrensyInput = ({
  value,
  currency,
  currencies,
  onAmountChange,
  onCurrencyChange,
  classN,
}) => {

  return (
    <div className="input__group">
      <input
        className={classN}
        type="number"
        value={value}
        onChange={(e) => onAmountChange(e.target.value)}
      />
      <select
        className={classN}
        value={currency}
        onChange={(e) => onCurrencyChange(e.target.value)}
      >
        {currencies.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

CurrensyInput.propTypes = {
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.array,
  onAmountChange: PropTypes.func,
  onCurrencyChange: PropTypes.func,
};

export default CurrensyInput;
