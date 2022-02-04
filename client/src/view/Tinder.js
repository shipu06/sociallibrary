import React, { useState, useEffect } from "react";
import storage from "../utils/storage";
import AliceCarousel from "react-alice-carousel";
import ImageLoader from "../components/Loaders/ImageLoader.js";
import CenteredText from "../components/Modals/CenteredText.js";

import "react-alice-carousel/lib/alice-carousel.css";
import "./Tinder.css";
import Gallery from "./Swiper";

const substractArray = (A, B) => {
  return A.filter((n) => !B.includes(n.link));
};

export default function Flats() {
  const [error, setError] = useState(false);
  const [listingList, setListingList] = useState([{}]);
  const [bLoading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentListing, setCurrentListing] = useState({});
  const [nextListing, setNextListing] = useState({});

  useEffect(() => {
    const removedIds = JSON.parse(localStorage.getItem("removed-id") || "[]");
    const savedIds = storage.get("saved-id", []).map((listing) => listing.link);
    const initialSettings = storage.get("settings", { otodomURL: "" });
    const link = initialSettings.otodomURL;

    const getListings = async () => {
      try {
        const jsonData = await fetch("api/flat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: link, limit: 60 }),
        });
        const data = await jsonData.json();
        if (!data.success) {
          throw new Error(data.message);
        }

        // Filter list from removed ids
        const filteredListingList = substractArray(data.data, [
          ...removedIds,
          ...savedIds,
        ]);

        setListingList(filteredListingList);
        setLoading(false);

        setCurrentListing(filteredListingList[currentIndex]);
        setNextListing(filteredListingList[currentIndex + 1]);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };
    getListings();
  }, []);

  const onRemove = () => {
    if (currentIndex + 2 <= listingList.length) {
      setCurrentListing(listingList[currentIndex + 1]);
    }
    if (currentIndex + 3 <= listingList.length) {
      setNextListing(listingList[currentIndex + 2]);
    }
    setCurrentIndex((state) => state + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  if (currentIndex >= listingList.length) {
    console.log("juz");
    return <CenteredText>That's all, try again later</CenteredText>;
  }

  return (
    <>
      <Listing
        key={currentListing.link}
        listing={currentListing}
        onRemove={onRemove}
      />
      <Listing
        key={nextListing.link}
        listing={nextListing}
        onRemove={onRemove}
        hidden
      />
    </>
  );
}

const Listing = ({ listing, onRemove, hidden } = { title: "N/A" }) => {
  const { title, link, price } = listing;

  const [imagesSRC, setImageSRC] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [removed, setRemoved] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const getData = async () => {
      fetch("api/flat/single", {
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

  const onRemoveListing = () => {
    let removedIds = storage.get("removed-id", []);
    if (!removedIds.includes(link) && !removed) {
      removedIds.push(link);
    } else {
      removedIds = removedIds.filter((id) => id !== link);
    }
    storage.set("removed-id", removedIds);
    setRemoved((state) => !state);
    onRemove();
  };

  const onSaveListing = () => {
    let savedListings = storage.get("saved-id", []);

    if (!savedListings.some((listing) => listing.link === link) && !saved) {
      savedListings.push(listing);
    } else {
      savedListings = savedListings.filter((listing) => listing.link !== link);
    }
    storage.set("saved-id", savedListings);
    setSaved((state) => !state);
    onRemove();
  };

  if (error) {
    return <CenteredText alert>Error :(</CenteredText>;
  }
  console.log(imagesSRC);
  return (
    <div
      className={`listing ${removed ? "listing--removed" : ""}`}
      style={{ display: hidden ? "none" : "flex" }}
    >
      <div
        className="listing__info listing__info--title "
        style={{ backgroundColor: "transparent" }}
      >
        <div className="listing__title">{title}</div>
        <div className="listing__price">{price}</div>
      </div>
      {/* Gallery */}
      <div className="listing__gallery">
        {imagesSRC.length !== 0 ? (
          <AliceCarousel
            mouseTracking
            disableButtonsControls
            items={imagesSRC.map((src) => (
              <div className="item">
                <img
                  src={src}
                  onDragStart={handleDragStart}
                  role="presentation"
                />
              </div>
            ))}
          />
        ) : (
          <div className="listing__gallery-image-wrapper">
            <ImageLoader />
          </div>
        )}
      </div>

      {/* Menu & Info */}
      <div className="listing__info listing__info--actions">
        <div className="listing__save" onClick={onSaveListing}>
          Save
        </div>
        <div className="listing__remove" onClick={onRemoveListing}>
          Remove
        </div>
      </div>
    </div>
  );
};

const handleDragStart = (e) => e.preventDefault();
