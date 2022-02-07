import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOtodomUrl } from "../store/actions/settingsActions";

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
    <div class="xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-6 max-w-7xl sm:px-6 lg:px-8">
      <h4 class="mb-6 text-xl font-bold text-gray-700 dark:text-gray-600 text-center">
        Settings
      </h4>

      <div class="px-6 py-6 bg-white rounded-md shadow-md font">
        <span class="text-gray-600 text-lg font-bold">Otodom.pl</span>
        <label class="block text-sm">
          {loading ? (
            <p className="py-2">Loading...</p>
          ) : (
            <p
              className={`${isValid ? "text-green-500" : "text-red-500"} py-2`}
            >
              {isValid ? "Valid link" : "Wrong link"}
            </p>
          )}
          <div class="relative text-gray-500 ">
            <input
              class="block w-full pr-20 py-2 pl-3 mt-1 text-sm text-black border-gray-200 border-2"
              placeholder="Paste url from Otodom.pl..."
              onChange={(e) => {
                setOtodomURL(e.target.value);
              }}
              value={otodomURL}
            />
            <button
              onClick={updateSettings}
              class="absolute inset-y-0 right-0 px-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-indigo-500 border border-transparent rounded-r-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
              Save
            </button>
          </div>
        </label>
      </div>
    </div>
  );
}
