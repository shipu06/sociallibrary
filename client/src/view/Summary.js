import React, { useState, useEffect } from "react";
import storage from "../utils/storage";

export default function Flats() {
  const [savedIDs, setSavedIDs] = useState([{}]);
  const [removedIDs, setRemovedIDs] = useState([{}]);

  useEffect(() => {
    const removed = storage.get("removed-id", []);
    setRemovedIDs(removed);

    const saved = storage.get("saved-id", []);
    setSavedIDs(saved);
  }, []);

  return (
    <div style={{ width: "90vw", margin: "20px auto" }}>
      <hr />
      <br />
      {/* Saved */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1>Saved</h1>
        <button
          style={{
            marginLeft: "15px",
          }}
          onClick={() => {
            storage.remove("saved-id");
            setSavedIDs([]);
          }}
        >
          Clear
        </button>
      </div>
      <hr />

      {savedIDs.map((listing, idx) => {
        return (
          <div key={listing.link}>
            <h1>{idx + 1 + ". " + listing.title}</h1>
            <h3>{listing.price + "  -   " + listing.area}</h3>
            <a href={listing.link} target="_blank">
              {listing.link}
            </a>
          </div>
        );
      })}
      <br />
      <hr />

      {/* Removed */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Removed</h1>
        <button
          onClick={() => {
            storage.remove("removed-id");
            setRemovedIDs([]);
          }}
        >
          Clear
        </button>
      </div>
      <hr />
      {removedIDs.map((url, idx) => {
        return <p key={url}>{idx + 1 + ". " + url}</p>;
      })}
      <hr />
    </div>
  );
}
