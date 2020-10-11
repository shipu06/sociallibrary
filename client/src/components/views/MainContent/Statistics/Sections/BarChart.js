import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import CanvasJSReact from "utils/canvasjs.react.js";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const defaultPoints = [
  { y: 1, label: "loading..." },

];

export default function PieChart({ getCallback }) {
  const [dataPoints, setDataPoints] = useState(defaultPoints);
  const [isLoaded, setIsLoaded] = useState(false);

  const changeDataToPoints = (data) => {
    const points = data
      .map(({ quantity, category }) => {
        return { y: quantity, label: category };
      })
      .filter((point) => point.y);

    console.log(points);
    return points;
  };

  useEffect(() => {
    getCallback((res) => {
      if (!Object.keys(res).length) return;
      setIsLoaded(true);
      setDataPoints(changeDataToPoints(res));
    });
  }, []);
  return (
    <div className="statistics__chart">
      {isLoaded ? (
        <CanvasJSChart
          options={{
            backgroundColor: "transparent",
            title: {
              text: "Basic Column Chart in React",
            },
            data: [
              {
                type: "column",
                dataPoints,
              },
            ],
          }}
          /* onRef = {ref => this.chart = ref} */
        />
      ) : (
        <Spinner />
      )}

      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
}
