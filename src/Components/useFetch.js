import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState({
    Temperature: 0,
    humidity: 0,
  });
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((x) => x + 1);
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw Error("some error");
          }
          return response.json();
        })
        .then((actualData) => {
          setData(actualData);
        })
        .catch((err) => {
          //   console.log(err.message);
        });
    }, 1000);
    return () => clearInterval(interval);
  }, [data]);

  return { data, count };
};

export default useFetch;
