import React, { useState, useEffect } from "react";

import Listing from "../components/Listing";
import CenteredText from "../components/Modals/CenteredText.js";
import SiteLoader from "../components/Loaders/SiteLoader";

const substractArray = (A, B) => {
  return A.filter((n) => !B.includes(n.link));
};

export default function Flats() {
  const [listingList, setListingList] = useState([{}]);
  const [bLoading, setLoading] = useState(true);
  const [bError, setError] = useState(false);

  useEffect(() => {
    const removedIds = JSON.parse(localStorage.getItem("removed-id") || "[]");

    const getListings = async () => {
      try {
        const data = await fetch("/api/flat");
        const listingList = await data.json();

        // Filter list from removed ids
        const filteredListingList = substractArray(listingList, removedIds);

        setListingList(filteredListingList);
        setLoading(false);
        console.log(listingList);
      } catch (err) {
        setError(err);
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
  if (bError) {
    return <CenteredText alert>Error :(</CenteredText>;
  }

  if (listingList.length === 0) {
    return <CenteredText>No results, try again later</CenteredText>;
  }

  return (
    <>
      {listingList.map((listing) => (
        <Listing key={listing.link} listing={listing} />
      ))}
    </>
  );
}
