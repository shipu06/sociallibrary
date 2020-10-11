import React from "react";
import "./statisticsPage.css";

import BarChart from "./Sections/BarChart";
import PieChart from "./Sections/PieChart";
import BooksDisplay from "./Sections/BooksDisplay";

import statisticsAPI from "utils/statisticsAPI";

export default function StatisticsPage() {
  return (
    <div className="statistics">
      <h1 className="statistics__header">Statistics</h1>

      <BarChart getCallback={statisticsAPI.getNumbers} />
      <PieChart getCallback={statisticsAPI.getQuantityOfCategories} />
      <BooksDisplay
        getCallback={statisticsAPI.getBestBooks}
        header={"Top rated books"}
      />
      <BooksDisplay
        getCallback={statisticsAPI.getLastBooks}
        header={"Recently added books"}
      />
      <BooksDisplay
        getCallback={statisticsAPI.getMostPopular}
        header={"Most popular books"}
      />
      {/* <TopComments />
      <LastAddedBooks />
      <MostPopularBooks /> */}
    </div>
  );
}
