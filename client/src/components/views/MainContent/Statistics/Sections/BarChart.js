import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";

const defaultPoints = [{ y: 1, label: "loading..." }];

export default function PieChart({ getCallback }) {
  const [dataPoints, setDataPoints] = useState(defaultPoints);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getCallback((res) => {
      if (!Object.keys(res).length) return;
      setIsLoaded(true);
      setDataPoints(res);
    });
  }, []);
  return (
    <div className="statistics__chart">
      {isLoaded ? (
        <div>
          {dataPoints.map((point) => (
            <h2>
              {point.quantity} {point.category}
            </h2>
          ))}
        </div>
      ) : (
        <Spinner />
      )}

      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
}
