import React, { useEffect, useState } from 'react';

const Money = () => {
  const [earnMoney, setEarnMoney] = useState(0);
  let startTime = '0930';
  let endTime = '1830';
  let duringTime = Math.abs(parseInt(startTime) - parseInt(endTime));
  let money = 25000000;
  let duringTimeSecond = duringTime * 1000;
  let earnMoneySecond = money / duringTimeSecond;

  useEffect(() => {
    setInterval(() => {
      setEarnMoney((prev) => parseInt(prev + earnMoneySecond));
    }, 1000);
    return () => {};
  }, []);

  return (
    <div>
      <div>make your own money </div>₩<h1>{earnMoney}</h1>원
    </div>
  );
};

export default Money;
