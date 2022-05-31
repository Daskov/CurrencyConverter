import React, { useEffect, useState } from "react";
import CurrensyInput from "./CurrensyInput";
import axios from "axios";
import Header from "./Header";

const Main = () => {
  const [firstAmount, setFirstAmount] = useState(1);
  const [secondAmount, setSecondAmount] = useState(1);
  const [firstCurrency, setFirstCurrency] = useState("UAH");
  const [secondCurrency, setSecondCurrency] = useState("EUR");
  const [ratesValue, setRatesValue] = useState([]);
  const [usdValue, setUsdValue] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.apilayer.com/fixer/latest?apikey=2IOtot3uLIpMqbCOBjShDkJ3R1tQgBOk"
      )
      .then(({ data }) => {
        setRatesValue(data.rates);
      });

    axios
      .get(
        "https://api.apilayer.com/fixer/latest?apikey=2IOtot3uLIpMqbCOBjShDkJ3R1tQgBOk&base=USD"
      )
      .then((res) => {
        setUsdValue(res.data.rates);
      });

    if (!!ratesValue) {
      handleFirstAmountChange(1);
    }
  }, []);

  const formatFirstAmount = (number) => {
    const sum =
      (Number(number).toFixed(3) * ratesValue[secondCurrency]) /
      ratesValue[firstCurrency];
    return sum.toFixed(3);
  };
  const formatSecondAmount = (number) => {
    const sum =
      (Number(number).toFixed(3) * ratesValue[firstCurrency]) /
      ratesValue[secondCurrency];
    return sum.toFixed(3);
  };

  const handleFirstAmountChange = (firstAmount) => {
    setSecondAmount(formatFirstAmount(firstAmount));
    setFirstAmount(firstAmount);
  };

  const handleFirstCurrencyChange = (firstCurrency) => {
    setSecondAmount(formatFirstAmount(firstAmount));
    setFirstCurrency(firstCurrency);
  };

  const handleSecondAmountChange = (secondAmount) => {
    setFirstAmount(formatSecondAmount(secondAmount));
    setSecondAmount(secondAmount);
  };

  const handleSecondCurrencyChange = (secondCurrency) => {
    setFirstAmount(setFirstAmount(formatSecondAmount(secondAmount)));
    setSecondCurrency(secondCurrency);
  };

  return (
    <>
      <Header rates={ratesValue} usd={usdValue} />
      <div className="container">
        <div className="group">
          <CurrensyInput
            classN={"blue-inp"}
            onAmountChange={handleFirstAmountChange}
            onCurrencyChange={handleFirstCurrencyChange}
            value={String(firstAmount)}
            currency={firstCurrency}
            currencies={Object.keys(ratesValue)}
          />
          <CurrensyInput
            classN={"green-inp"}
            onAmountChange={handleSecondAmountChange}
            onCurrencyChange={handleSecondCurrencyChange}
            value={String(secondAmount)}
            currency={secondCurrency}
            currencies={Object.keys(ratesValue)}
          />
        </div>
      </div>
    </>
  );
};

export default Main;
