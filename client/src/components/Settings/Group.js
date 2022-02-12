import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOtodomUrl } from "../../store/actions/settingsActions";
import Form from "./Form";

// Store

export default function Group({ onRemove, onEdit }) {
  const settings = useSelector((state) => state.settings);
  const otodomURL = settings.otodomUrl;

  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    isLinkValid(otodomURL).then((res) => {
      setIsValid(res);
      setLoading(false);
    });
  }, [otodomURL]);

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
  if (editMode)
    return (
      <Form
        title={"Edit group"}
        name={"Otodom.pl"}
        url={settings.otodomUrl}
        onSave={(...args)=>{
            console.log(args)
            onEdit(...args);
            setEditMode(false);
        }}
        onCancel={()=>{
            setEditMode(false);
        }}
      />
    );

  return (
    <div class="px-6 pt-6 pb-8 mb-6 bg-white rounded-md shadow-md font">
      {/* Title + menu */}
      <div className="flex">
        <span class="text-gray-600 text-lg font-bold">Otodom.pl</span>
        {/* Delete */}
        <button
          class="px-2 text-red-600 ml-1 text-xs font-bold uppercase rounded outline-none focus:outline-none ease-linear transition-all duration-150"
          type="button"
          //   onClick={}
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            ></path>
          </svg>
        </button>
        {/* Edit */}
        <button
          class="px-2 ml-auto  text-glate-500 text-xs font-bold uppercase rounded outline-none focus:outline-none ease-linear transition-all duration-150"
          type="button"
          onClick={() => {
            setEditMode(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
      </div>

      {/* Verify link */}
      <label class="block text-sm">
        {loading ? (
          <p className="py-2">Loading...</p>
        ) : (
          <p className={`${isValid ? "text-green-500" : "text-red-500"} py-2`}>
            {isValid ? "Valid link" : "Wrong link"}
          </p>
        )}
      </label>
      {/* Link */}
      <a
        href={otodomURL}
        target="_blank"
        class="block w-full px-2 py-3 mt-1 text-xs text-slate-500 bg-slate-100 rounded-md overflow-hidden whitespace-nowrap shadow-md"
      >
        {otodomURL}
      </a>
    </div>
  );
}
