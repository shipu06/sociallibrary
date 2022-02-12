import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SemipolarLoading } from "react-loadingg";

// Store

export default function Form({
  name = "",
  url = "",
  title,
  onSave = ({ groupName, link }) => {
    console.log(groupName, link, "onSave");
  },
  onCancel = () => {
    console.log("onCancel");
  },
}) {
  const [groupName, setGroupName] = useState(name);
  const [link, setLink] = useState(url);

  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [haveToValidate, setHaveToValidate] = useState(true);

  const isLinkValid = async (link) => {
    setLoading(true);
    try {
      const jsonData = await fetch("api/flat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: link, limit: 5 }),
      });
      const data = await jsonData.json();
      setLoading(false);
      setHaveToValidate(false);
      if (!data.success) {
        throw new Error(data.message);
      }
      return data.data.length > 0;
    } catch (err) {
      return false;
    }
  };

  const isSaveEnabled = isValid && link.length !== 0 && groupName.length !== 0;

  return (
    <div class="px-6 py-6 bg-white rounded-sm shadow font mb-6">
      {/* title */}
      <span class="text-gray-600 text-lg font-bold mb-4 block">{title}</span>
      {/* name */}
      <input
        class="block w-full text-slate-600 font-medium bg-slate-100 pr-3 py-2 pl-3 mt-1 text-sm rounded shadow"
        placeholder="Group name"
        onChange={(e) => {
          setGroupName(e.target.value);
        }}
        value={groupName}
      />
      {/* link */}
      <div class="relative text-gray-500 mt-4 flex">
        <input
          class="block w-full text-slate-600 font-medium bg-slate-100 pr-3 py-2 pl-3 text-sm rounded-l shadow"
          placeholder="Paste url..."
          onChange={(e) => {
            setIsValid(false);
            setHaveToValidate(true);
            setLink(e.target.value);
          }}
          value={link}
        />
        <button
          onClick={() => {
            setLoading(true);
            isLinkValid(link).then((res) => {
              setIsValid(res);
            });
          }}
          class={`px-5 text-xs font-medium text-white  ${
            haveToValidate
              ? "bg-gray-500"
              : isValid
              ? "bg-green-500"
              : "bg-red-500"
          } transition-colors duration-150 rounded-r-md shadow whitespace-nowrap active:outline-none`}
        >
          {loading
            ? "Loading..."
            : haveToValidate
            ? "Check"
            : isValid
            ? "Valid link"
            : "Wrong link"}
        </button>
      </div>
      {/* save button */}
      <div className="text-center mt-6">
        <button
          disabled={!isSaveEnabled}
          className={`px-4 py-2 mt-2 text-base w-1/2 mx-auto font-medium text-white transition-colors duration-150 bg-gray-500 disabled:opacity-20 border border-transparent rounded-sm focus:outline-none focus:shadow-outline-purple`}
          onClick={() => {
            onSave(groupName, link);
          }}
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 border-indogo-500 mt-2 text-base w-1/2 mx-auto font-medium text-gray-500 transition-colors duration-150 border border-transparent rounded-sm focus:outline-none focus:shadow-outline-purple"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
