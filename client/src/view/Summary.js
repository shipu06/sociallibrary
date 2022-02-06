import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSaved } from "../store/actions/savedActions";
import { setDeleted } from "../store/actions/deletedActions";

import storage from "../utils/storage";

export default function Flats() {
  const dispatch = useDispatch();

  // Removed & Saved listings
  const deleted = useSelector((state) => state.deleted);
  const saved = useSelector((state) => state.saved);

  useEffect(() => {
    console.log("changed");
  }, [saved, deleted]);

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
            dispatch(setSaved([]));
          }}
        >
          Clear
        </button>
      </div>
      <hr />

      {saved.map((listing, idx) => {
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
        <h1>Deleted</h1>
        <button
          onClick={() => {
            dispatch(setDeleted([]));
          }}
        >
          Clear
        </button>
      </div>
      <hr />
      {deleted.map((url, idx) => {
        return <p key={url}>{idx + 1 + ". " + url}</p>;
      })}
      <hr />
    </div>
  );
}
