import { useEffect, useRef, useState } from 'react';

function useCount({ icon, color, title, value }) {
  const [unit, setUnit] = useState(0);
  const [count, setCount] = useState(0);
  const valueRef = useRef(0);
  const timerRef = useRef(null);
  const delay = 1;

  //1 , 10 ,100 ,
  function unitCount(number) {
    console.log(value / (number * 10));
    if (value / (number * 10) >= 1) {
      unitCount(number * 10);
    } else {
      valueRef.current += Math.floor(value / number) * number;
      setUnit(number);
    }
  }

  useEffect(() => {
    unitCount(1);
  }, []);

  useEffect(() => {
    if (unit !== 0) {
      timerRef.current = setInterval(() => {
        setCount(valueRef.current);
        if (valueRef.current === value) {
          clearInterval(timerRef.current);
        }
        valueRef.current += 1;
      }, delay * 10);
      return () => {
        clearInterval(timerRef.current);
      };
    }
  }, [unit]);

  return unitCount;
}

export default useCount;
