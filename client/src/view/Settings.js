import React, { useState, useEffect } from "react";
import storage from "../utils/storage";

export default function Flats() {
  const [otodomURL, setOtodomURL] = useState("");

  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialSettings = storage.get("settings", {
      otodomURL: initOtodomURL,
    });
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
    <div style={{ width: "80vw", margin: "5vh auto" }}>
      <h1>{"OtoDom   "}</h1>
      <input
        type="text"
        style={{ width: "100%" }}
        onChange={(e) => {
          setOtodomURL(e.target.value);
        }}
        value={otodomURL}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p style={{ color: isValid ? "green" : "red", fontWeight: 800 }}>
          {isValid ? "Valid link" : "Wrong link"}{" "}
        </p>
      )}{" "}
      <button onClick={updateSettings} style={{ margin: "10px 10px 10px 0" }}>
        Save
      </button>
    </div>
  );
}

const initOtodomURL =
  "https://www.otodom.pl/pl/oferty/wynajem/mieszkanie/krakow?roomsNumber=%5BONE%2CTWO%5D&priceMin=1400&priceMax=2100&areaMin=30&areaMax=50&distanceRadius=0&market=ALL&page=1&limit=72&by=DEFAULT&direction=DESC&locations%5B0%5D%5BregionId%5D=6&locations%5B0%5D%5BcityId%5D=38&locations%5B0%5D%5BsubregionId%5D=410";
