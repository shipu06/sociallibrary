import React, { useState, useEffect } from "react";
import storage from "../utils/storage";

export default function Flats() {
  const [otodomURL, setOtodomURL] = useState("");
  const [removedIDs, setRemovedIDs] = useState([{}]);
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const IDs = storage.get("removed-id", []);
    const initialSettings = storage.get("settings", { otodomURL: "" });
    setRemovedIDs(IDs);
    setOtodomURL(initialSettings.otodomURL);
    isLinkValid(initialSettings.otodomURL).then((res) => {
      setIsValid(res);
      setLoading(false);
    });
  }, []);

  const isLinkValid = async (link) => {
    try {
      const jsonData = await fetch("api/flat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: link, limit: 5 }),
      });
      const data = await jsonData.json();
      if (!data.success) {
        throw new Error(data.message);
      }

      return data.data.length > 0;
    } catch (err) {
      return false;
    }
  };

  const updateSettings = () => {
    setLoading(true);

    storage.set("settings", {
      otodomURL,
    });

    isLinkValid(otodomURL).then((res) => {
      setIsValid(res);
      setLoading(false);
    });
  };

  return (
    <div style={{ width: "50vw", margin: "5vh auto" }}>
      <hr />
      <h1>Data urls</h1>
      <hr />
      <span>OtoDom: </span>
      <input
        type="text"
        style={{ width: "100%" }}
        onChange={(e) => {
          setOtodomURL(e.target.value);
        }}
        value={otodomURL}
      />
      <button onClick={updateSettings}>Save</button>

      {loading ? (
        "Loading..."
      ) : (
        <span style={{ color: isValid ? "green" : "red", fontWeight: 800 }}>
          {isValid ? "Valid link" : "Wrong link"}{" "}
        </span>
      )}

      <hr />
      <h1>Removed flats</h1>
      <button
        onClick={() => {
          storage.remove("removed-id");
          setRemovedIDs([]);
        }}
      >
        Clear removed
      </button>
      <hr />
      {removedIDs.map((url, idx) => {
        return <p>{idx + ". " + url}</p>;
      })}
      <hr />
    </div>
  );
}
