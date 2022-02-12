import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOtodomUrl } from "../store/actions/settingsActions";

import Group from "../components/Settings/Group";
import Form from "../components/Settings/Form";

export default function Settings() {
  const dispatch = useDispatch();

  const [isAddForm, setIsAddForm] = useState(true);

  const onEdit = (name, link) => {
    dispatch(setOtodomUrl(link));
  };

  const addGroup = (name, link) => {
    // dispatch(setOtodomUrl(otodomURL));
  };

  return (
    <div class="xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-6 max-w-7xl sm:px-6 lg:px-8">
      {/* Settings title */}
      <h4 class="mb-6 text-xl font-bold text-gray-700 dark:text-gray-600 text-center">
        Settings
      </h4>

      {/* Groups */}
      <Group onEdit={onEdit} />

      {/* Add */}
      {isAddForm ? (
        <AddPlaceHolder
          onClick={() => {
            setIsAddForm(false);
          }}
        />
      ) : (
        <Form
          title={"Add a new group"}
          onSave={addGroup}
          onCancel={() => {
            setIsAddForm(true);
          }}
        />
      )}
    </div>
  );
}

const AddPlaceHolder = ({ onClick }) => {
  return (
    <div className="mx-auto flex justify-center items-center text-gray-300 pt-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-36 w-36"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={onClick}
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="0.3"
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  );
};
