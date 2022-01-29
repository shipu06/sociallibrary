import React, { useState, useEffect } from "react";

export default function Flats() {
  const [listingList, setListingList] = useState([{}]);
  const [bLoading, setLoading] = useState(true);
  const [bError, setError] = useState(false);

  useEffect(async () => {
    try {
      const data = await fetch("/api/flat");
      const listingList = await data.json();
      setListingList(listingList);
      console.log(listingList);
      setLoading(false);
    } catch (err) {
      setError(true);
    }
  }, []);

  if (bLoading) {
    return <CenteredText>Loading...</CenteredText>;
  }
  if (bError) {
    return <CenteredText alert>Error :(</CenteredText>;
  }

  return (
    <div>
      {listingList.map((listing) => (
        <FlatListing listing={listing} />
      ))}
    </div>
  );
}

const CenteredText = ({ alert, children }) => {
  return (
    <h1
      style={{
        position: "absolute",
        top: "40vh",
        left: "50vw",
        fontWeight: 400,
        transform: "translate(-50%,-50%)",
        color: alert ? "red" : "#222",
      }}
    >
      {children}
    </h1>
  );
};

const FlatListing = ({ listing } = { title: "N/A" }) => {
  const { title, link, image, price, area, rooms } = listing;
  return (
    <>
      <a href={link}>
        <h4>{title}</h4>
        <img src={image} width={400} height={300} target="_blank" />
      </a>
      <hr />
    </>
  );
};
