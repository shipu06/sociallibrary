import React, { useState, useEffect } from "react";
import storage from "../utils/storage";

import Listing from "../components/Listing";
import CenteredText from "../components/Modals/CenteredText.js";

const substractArray = (A, B) => {
  return A.filter((n) => !B.includes(n.link));
};

export default function Flats() {
  const [listingList, setListingList] = useState([{}]);
  const [bLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const removedIds = JSON.parse(localStorage.getItem("removed-id") || "[]");
    const initialSettings = storage.get("settings", { otodomURL: "" });
    const link = initialSettings.otodomURL;

    const getListings = async () => {
      try {
        const jsonData = await fetch("api/flat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: link, limit: 10 }),
        });
        const data = await jsonData.json();
        if (!data.success) {
          throw new Error(data.message);
        }

        // Filter list from removed ids
        const filteredListingList = substractArray(data.data, removedIds);

        setListingList(filteredListingList);
        setLoading(false);
        console.log(listingList);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };
    getListings();
  }, []);
  if (bLoading) {
    return (
      <>
        <CenteredText>Loading...</CenteredText>
      </>
    );
  }

  if (error) {
    return (
      <CenteredText>
        <div style={{ fontWeight: "700", fontSize: "36px" }}>Error!</div>
        <div style={{ fontWeight: "300", fontSize: "12px" }}>{error}</div>
      </CenteredText>
    );
  }

  if (listingList.length === 0) {
    return <CenteredText>No results, try again later</CenteredText>;
  }

  return (
    <>
      <h1>To dziala tak se, za duzo danych na raz i wolno laduje, ograniczylem do 10 wynikow narazie</h1>
      {listingList.map((listing, idx) => (
        <Listing key={listing.link} listing={listing} idx={idx} />
      ))}
    </>
  );
}
