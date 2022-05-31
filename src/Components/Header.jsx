import React from "react";

const Header = ({ rates, usd }) => {
  return (
    <div className="header">
      <h1>Currency Converter $</h1>
      <h3>EUR: {rates.UAH}</h3>
      <h3>USD: {usd.UAH}</h3>
    </div>
  );
};

export default Header;
