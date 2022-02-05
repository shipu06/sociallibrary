import React, { useState, useEffect } from "react";
import storage from "../../utils/storage";
import ContentLoader from "react-content-loader";
import CenteredText from "../../components/Modals/CenteredText.js";
import ImageGallery from "react-image-gallery";

import "./index.css";

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
        <div className="block text-center text-3xl">Error!</div>
        <div className="block text-center text-sm">{error}</div>
      </CenteredText>
    );
  }

  if (listingList.length === 0) {
    return <CenteredText>No results, try again later</CenteredText>;
  }

  if (currentIndex >= listingList.length) {
    return <CenteredText>That's all, try again later</CenteredText>;
  }

  return (
    <>
      <Listing
        key={currentListing.link}
        listing={currentListing}
        onRemove={onRemove}
      />
      <Listing key={nextListing.link} listing={nextListing} hidden />
    </>
  );
}

const Listing = ({ listing, hidden, onRemove } = { title: "N/A" }) => {
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

  if (hidden) {
    return <></>;
  }

  if (error) {
    return (
      <CenteredText>
        <div className="block text-center text-3xl">Error!</div>
        <div className="block text-center text-sm">:(</div>
      </CenteredText>
    );
  }

  if (imagesSRC.length === 0) {
    return (
      <div className={"absolute top-16 bottom-0 left-0 right-0 "}>
        <ContentLoader
          backgroundColor="rgb(241,245,249)"
          foregroundColor="white"
          height="100%"
          width="100%"
        >
          <rect x="0" y="0" height={"100%"} width={"100%"} />
        </ContentLoader>
      </div>
    );
  }

  const items = imagesSRC.map((src) => ({
    original: src,
    thumbnail: src,
    description: " Buddy, Dog given to the king of England",
    renderItem: () => (
      <div className="item ">
        <img src={src} />
      </div>
    ),
    renderThumbInner: () => (
      <div className="thumbnail">
        <img src={src} />
      </div>
    ),
  }));

  return (
    <div
      className={
        "absolute top-16 bottom-0 left-0 right-0 lg:left-24 lg:right-24"
      }
    >
      {/* Listing info */}
      <div className="flex py-6 text-sm text-gray px-6 justify-center items-center">
        <div className="mr-6">{title}</div>
        <div className="text-xl font-bold bg-slate-50 justify-between items-center shadow-md rounded-lg px-4 py-2">
          {price}
        </div>
      </div>

      {/* Gallery */}
      <div className="">
        <ImageGallery
          showIndex
          showPlayButton={false}
          useBrowserFullscreen={false}
          thumbnailPosition={"top"}
          items={items}
        />
      </div>

      {/* Actions */}
      <div className="fixed bottom-6 left-0 right-0 flex items-center justify-between gap-3 sm:justify-center px-6">
        <div
          className="p-6 bg-green-400 rounded-full shadow-xl cursor-pointer"
          onClick={onSaveListing}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div
          className="p-6 bg-red-400 rounded-full shadow-xl cursor-pointer"
          onClick={onRemoveListing}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
