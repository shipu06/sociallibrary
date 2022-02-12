import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Navigate, Link } from "react-router-dom";

import { addDeleted } from "../../store/actions/deletedActions";
import { addSaved } from "../../store/actions/savedActions";

import { SemipolarLoading } from "react-loadingg";
import ImageGallery from "react-image-gallery";
import CenteredText from "../../components/Modals/CenteredText.js";
import { motion } from "framer-motion";
import "./index.css";

const substractArray = (A, B) => {
  return A?.filter((n) => !B?.includes(n.link));
};

export default function GroupScanner() {
  const { name } = useParams();
  const loading = useSelector((state) => state.listings.loading);
  const listings = useSelector((state) => state.listings.groups[name]);
  const saved = useSelector((state) => state.saved);
  const deleted = useSelector((state) => state.deleted);

  const [currentListing, setCurrentListing] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  // All & Removed & Saved
  const filtered = substractArray(listings, [
    ...deleted,
    ...saved.map((i) => i.link),
  ]);

  useEffect(() => {
    if (filtered?.length >= 1) {
      setCurrentListing(filtered[0]);
    }
  }, [saved, deleted, name, listings]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          opacity: { type: "spring", stiffness: 100 },
          default: { duration: 2 },
        }}
      >
        <SemipolarLoading size="small" color="#6366F1" speed={1.2} />
        <h1 className="text-xl absolute left-1/2 bottom-1/2 translate-y-40 -translate-x-1/2 font-light -z-10">
          Loading data...
        </h1>
      </motion.div>
    );
  }

  if (typeof filtered === undefined) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          opacity: { type: "spring", stiffness: 100 },
          default: { duration: 2 },
        }}
      >
        <SemipolarLoading size="small" color="#6366F1" speed={1.2} />
        <h1 className="text-xl absolute left-1/2 bottom-1/2 translate-y-40 -translate-x-1/2 font-light -z-10">
          Loading ???...
        </h1>
      </motion.div>
    );
  }

  if (filtered?.length === 0 && currentIndex !== 0) {
    return (
      <CenteredText>
        That's all for <span className="inline font-bold">{name}</span>, try
        again later
      </CenteredText>
    );
  }

  if (filtered?.length === 0) {
    return (
      <CenteredText>
        <span className="inline-block px-5 text-center">
          No results for <b>{name}</b>
        </span>
        <span className="inline-block py-5 text-center font-extralight text-base">
          Try again later
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-36 w-36 text-gray-400 my-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={0.4}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>

        <Link to="/summary">
          <span className="inline-block py-3 px-6 font-bold text-white text-sm rounded shadow shadow-blue-300 text-center bg-blue-500">
            Check summary
          </span>
        </Link>
      </CenteredText>
    );
  }

  const onRemove = () => {
    if (currentIndex + 2 <= filtered.length) {
      setCurrentListing(filtered[currentIndex + 1]);
      setCurrentIndex((state) => state + 1);
    }
  };

  return filtered
    ?.slice(0, 2)
    .map((listing) => (
      <Listing
        key={listing.link}
        listing={listing}
        onRemove={onRemove}
        hidden={listing.link !== currentListing.link}
      />
    ));
}

const Listing = ({ listing, hidden, onRemove } = { title: "N/A" }) => {
  const dispatch = useDispatch();

  const title = (listing.title ??= "N/A");
  const link = (listing.link ??= [
    "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg",
  ]);
  const price = (listing.price ??= "N/A");

  const [imagesSRC, setImageSRC] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("mounted " + title, { listing });
    const getData = async () => {
      fetch("/api/flat/single", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ URL: link }),
      })
        .then((res) => res.json())
        .then((res) => {
          const urls = res.urls;
          if (Array.isArray(urls)) {
            setImageSRC(res.urls);
            console.log("set data " + title);
          } else {
            console.log(urls + "is not an array");
          }
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
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

  if (error) {
    return (
      <CenteredText>
        <div className="block text-center text-3xl">Error!</div>
        <div className="block text-center text-sm">:(</div>
      </CenteredText>
    );
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={!hidden ? "open" : "closed"}
        variants={{
          open: { opacity: 1 },
          closed: { opacity: 0 },
        }}
        transition={{
          opacity: { type: "spring", stiffness: 100 },
          default: { duration: 1 },
        }}
        exit={{ opacity: 0 }}
      >
        <SemipolarLoading size="small" color="#6366F1" speed={1.2} />
        <h1 className="text-xl absolute left-1/2 bottom-1/2 translate-y-40 -translate-x-1/2 font-light -z-10">
          Loading listing...
        </h1>
      </motion.div>
    );
  }

  const items = imagesSRC.map((src) => ({
    original: src,
    thumbnail: src,
    description: " Buddy, Dog given to the king of England",
    renderItem: () => (
      <div className="item ">
        <img src={src} alt="listing" />
      </div>
    ),
    renderThumbInner: () => (
      <div className="thumbnail">
        <img src={src} alt="thumbnail" />
      </div>
    ),
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={!hidden ? "open" : "closed"}
      variants={{
        open: { opacity: 1, visibility: "visible" },
        closed: { opacity: 0, visibility: "hidden" },
      }}
      transition={{
        type: "spring",
        duration: 1,
      }}
      className={
        "absolute top-16 bottom-0 left-0 right-0 lg:left-24 lg:right-24"
      }
    >
      {/* Gallery */}
      <div className="pt-6">
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
          className="p-4 bg-green-400 rounded-full shadow cursor-pointer select-none"
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
          <div className="text-xl font-semibold bg-white justify-between items-center shadow-slate-200 shadow rounded-lg px-4 py-2 select-none">
            {price}
          </div>
        </div>

        {/* Next */}
        <div
          className="p-4 bg-red-400 rounded-full shadow cursor-pointer select-none"
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
    </motion.div>
  );
};
