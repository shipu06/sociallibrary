import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOtodomUrl } from "../store/actions/settingsActions";
import { getListings } from "../store/actions/listingsActions";

// Store

export default function Flats() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const [otodomURL, setOtodomURL] = useState(settings.otodomUrl);
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isLinkValid(otodomURL).then((res) => {
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
    isLinkValid(otodomURL).then((res) => {
      setIsValid(res);
      setLoading(false);
      res && dispatch(setOtodomUrl(otodomURL));
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
