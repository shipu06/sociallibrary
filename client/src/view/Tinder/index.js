import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addDeleted } from "../../store/actions/deletedActions";
import { addSaved } from "../../store/actions/savedActions";

import ContentLoader from "react-content-loader";
import CenteredText from "../../components/Modals/CenteredText.js";
import ImageGallery from "react-image-gallery";

import "./index.css";

const substractArray = (A, B) => {
  return A.filter((n) => !B.includes(n.link));
};

export default function Flats() {
  const [listingList, setListingList] = useState([{}]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentListing, setCurrentListing] = useState({});
  const [nextListing, setNextListing] = useState({});
  // All & Removed & Saved
  const loading = useSelector((state) => state.listings.loading);
  const listings = useSelector((state) => state.listings.data);
  const deleted = useSelector((state) => state.deleted);
  const saved = useSelector((state) => state.saved);
  console.log(loading, listings);

  useEffect(() => {
    const filteredListingList = substractArray(listings, [
      ...deleted,
      ...saved.map((i) => i.link),
    ]);
    setListingList(filteredListingList);

    if (filteredListingList.length >= 1) {
      setCurrentListing(filteredListingList[0]);
    }
    if (filteredListingList.length >= 2) {
      setNextListing(filteredListingList[1]);
    }
  }, [listings]);

  const onRemove = () => {
    if (currentIndex + 2 <= listingList.length) {
      setCurrentListing(listingList[currentIndex + 1]);
    }
    if (currentIndex + 3 <= listingList.length) {
      setNextListing(listingList[currentIndex + 2]);
    } else {
      setNextListing({});
    }
    setCurrentIndex((state) => state + 1);
  };

  if (loading) {
    return <CenteredText>Loading...</CenteredText>;
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
  const dispatch = useDispatch();

  const { title, link, price } = listing;
  const [imagesSRC, setImageSRC] = useState([]);
  const [error, setError] = useState(false);

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
          // console.log(res.urls);
          if (Array.isArray(urls)) {
            setImageSRC(res.urls);
          } else {
            // console.log(urls + "is not an array");
          }
        })
        .catch((err) => {
          setError(err);
        });
    };
    getData();
  }, []);

  const onRemoveListing = () => {
    dispatch(addDeleted(link));
    onRemove();
  };

  const onSaveListing = () => {
    dispatch(addSaved(listing));
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
      {/* Gallery */}
      <div className="pt-3">
        <ImageGallery
          showIndex
          showPlayButton={false}
          useBrowserFullscreen={false}
          thumbnailPosition={"top"}
          items={items}
        />
      </div>

      {/* Listing info */}
      <a href={link} rel="noreferrer" target="_blank">
        <div className="flex py-4 text-xs text-gray justify-between items-center flex-col">
          <div className="text-center">{title}</div>
        </div>
      </a>
      {/* Panel strip */}
      <div className="fixed bottom-0 pb-6 left-0 right-0 flex items-center justify-between gap-3 sm:justify-center px-6">
        {/* Save */}
        <div
          className="p-4 bg-green-400 rounded-full shadow-xl cursor-pointer"
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
        {/* Listing info */}
        <div className="flex text-xs text-gray justify-between items-center flex-col">
          <div className="text-xl font-semibold bg-white justify-between items-center shadow-slate-200 shadow-xl rounded-lg px-4 py-2">
            {price}
          </div>
        </div>

        {/* Next */}
        <div
          className="p-4 bg-red-400 rounded-full shadow-xl cursor-pointer"
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
