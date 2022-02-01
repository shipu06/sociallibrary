import React, { useState, useEffect } from "react";
import storage from "../../utils/storage";

import CenteredText from "../Modals/CenteredText.js";
import ImageLoader from "../Loaders/ImageLoader.js";
import "./index.css";

const Listing = ({ listing, idx } = { title: "N/A" }) => {
  const { title, link, price } = listing;

  const [imagesSRC, setImageSRC] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [removed, setRemoved] = useState(false);

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

    const nextListing = !removed
      ? document.getElementById(idx + 1)
      : document.getElementById(idx);

    if (nextListing) {
      nextListing.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  if (error) {
    return <CenteredText alert>Error :(</CenteredText>;
  }

  console.log(idx);
  return (
    <div className={`listing ${removed ? "listing--removed" : ""}`} id={idx}>
      {/* Menu & Info */}
      <div className="listing__info">
        <div className="listing__title">{title}</div>
        <div className="listing__price">{price}</div>
        <div className="listing__save">Save </div>
        <div className="listing__remove" onClick={onRemoveListing}>
          Remove
        </div>
      </div>

      {/* Gallery */}
      <a href={link} target="_blank">
        <div className="listing__gallery">
          {imagesSRC.map((src, idx) => (
            <div className="listing__gallery-image-wrapper">
              {src !== "" ? (
                <img
                  className="listing__gallery-image"
                  key={src + idx}
                  src={src}
                />
              ) : (
                <ImageLoader className="listing__gallery-image" />
              )}
            </div>
          ))}
        </div>
      </a>
    </div>
  );
};

export default Listing;
