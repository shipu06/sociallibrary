const storage = {};

const ITEM = {
  REMOVEDID: "removed-ids",
  SETTINGS: "settings",
};

storage.get = (name, defaultValue) =>
  JSON.parse(localStorage.getItem(name)) || defaultValue;

storage.set = (name, data) => localStorage.setItem(name, JSON.stringify(data));

storage.remove = (name) => localStorage.removeItem(name);

export default storage;
