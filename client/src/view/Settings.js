import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setGroup,
  deleteGroup,
  editGroup,
} from "../store/actions/settingsActions";

import Group from "../components/Settings/Group";
import Form from "../components/Settings/Form";

export default function Settings() {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.settings.groups);

  const [isAddForm, setIsAddForm] = useState(false);

  const onEdit = (name, newGroup) => {
    dispatch(editGroup(name, newGroup));
  };

  const addGroup = (group) => {
    dispatch(setGroup(group.groupName, group.link));
  };

  const onRemove = (name) => {
    dispatch(deleteGroup(name));
  };

  return (
    <div className="xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-6 max-w-7xl sm:px-6 lg:px-8">
      {/* Settings title */}
      <h4 className="mb-6 text-xl font-bold text-gray-700 dark:text-gray-600 text-center">
        Settings
      </h4>

      {/* Groups */}
      {Object.entries(groups).map(([name, url]) => (
        <Group
          onEdit={(newName, newUrl) =>
            onEdit(name, { name: newName, url: newUrl })
          }
          onRemove={() => onRemove(name)}
          name={name}
          url={url}
          key={url + name}
        />
      ))}

      {/* Add */}
      {isAddForm ? (
        <Form
          title={"Add a new group"}
          onSave={(group) => {
            setIsAddForm(false);
            addGroup(group);
          }}
          onCancel={() => {
            setIsAddForm(false);
          }}
        />
      ) : (
        <AddPlaceHolder
          onClick={() => {
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
        className="h-36 w-36"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={onClick}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.3"
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  );
};
