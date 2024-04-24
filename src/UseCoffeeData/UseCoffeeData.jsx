import { useEffect } from 'react';
import { useState } from 'react';

const UseCoffeeData = () => {
  const [isloading, setIsLoading] = useState(false);
  const [coffeeData, setCoffeeData] = useState([]);
  const [toggle, setToggle] = useState(false);

  const reFetch = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:5000/coffee')
      .then(res => res.json())
      .then(data => setCoffeeData(data));
    setIsLoading(false);
  }, [toggle]);

  return { isloading, coffeeData, reFetch };
};

export default UseCoffeeData;
