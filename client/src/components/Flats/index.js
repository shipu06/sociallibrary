import React, { useState, useEffect } from "react";
import ContentLoader from "react-content-loader";

export default function Flats() {
  const [listingList, setListingList] = useState([{}]);
  const [bLoading, setLoading] = useState(true);
  const [bError, setError] = useState(false);

  useEffect(() => {
    const getListings = async () => {
      try {
        const data = await fetch("/api/flat");
        const listingList = await data.json();
        setListingList(listingList);
        setLoading(false);
        console.log(listingList);
      } catch (err) {
        setError(err);
      }
    };
    getListings();
  }, []);

  if (bLoading) {
    return <SiteLoader />;
  }
  if (bError) {
    return <CenteredText alert>Error :(</CenteredText>;
  }

  return (
    <div>
      {listingList.map((listing) => (
        <FlatListing key={listing.link} listing={listing} />
      ))}
    </div>
  );
}

const FlatListing = ({ listing } = { title: "N/A" }) => {
  const { title, link, mainImage, price, area, rooms } = listing;
  const [imagesSRC, setImageSRC] = useState(new Array(5).fill(""));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      fetch("api/flat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ URL: link }),
      })
        .then((res) => res.json())
        .then((res) => {
          const urls = res.urls;
          console.log(res.urls);
          if (Array.isArray(urls)) {
            setImageSRC(res.urls);
            setLoading(false);
          } else {
            console.log(urls + "is not an array");
          }
        })
        .catch((err) => {
          setError(err);
        });
    };
    getData();
  }, []);

  if (error) {
    return <CenteredText alert>Error :(</CenteredText>;
  }

  return (
    <>
      <a href={link} target="_blank">
        <h4>{title}</h4>

        {loading ? (
          <>
            <img
              key={mainImage + "main-image"}
              src={mainImage}
              width={400}
              height={300}
            />
            <ImageLoader />
            <ImageLoader />
            <ImageLoader />
            <ImageLoader />
            <ImageLoader />
            <ImageLoader />
            <ImageLoader />
          </>
        ) : (
          imagesSRC.map((src, idx) => (
            <img key={src + idx} src={src} width={400} height={300} />
          ))
        )}

        {error && <h1>Something went wrong...</h1>}
      </a>
      <hr />
    </>
  );
};

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
const ImageLoader = () => {
  return (
    <ContentLoader
      viewBox="0 0 400 300"
      width={400}
      height={300}
      backgroundColor="#f3f8fb"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="4" ry="4" width="400" height="300" />
    </ContentLoader>
  );
};

const SiteLoader = () => {
  return (
    <>
      <ContentLoader
        viewBox="0 0 400 50"
        width={400}
        height={50}
        backgroundColor="#f3f3f3"
        foregroundColor="white"
      >
        <rect x="0" y="15" rx="4" ry="4" width="400" height="20" />
      </ContentLoader>
      <br />
      <ImageLoader />
      <ImageLoader />
      <ImageLoader />
      <ImageLoader />
      <ImageLoader />
      <ImageLoader />
      <ImageLoader />
      <ImageLoader />
    </>
  );
};
