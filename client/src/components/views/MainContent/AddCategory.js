import React, { useEffect, useState } from "react";
import categoriesFetch from "../../../utils/fetchCategories";
import { Chip } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default function AddCategory() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);

  const loadCategories = () => {
    categoriesFetch.get((res) => {
      setCategories(res);
    });
  };

  useEffect(loadCategories, []);

  const handleDelete = (id) => {
    console.log(id);
    categoriesFetch.remove(id, (res) => {
      alert(res.message);
      loadCategories();
    });
  };

  const handleInput = (e) => {
    setCategory(e.target.value);
  };

  const handleSave = (category) => {
    categoriesFetch.add(category, (res) => {
      alert(res.message);
      loadCategories();
    });
  };

  return (
    <div>
      <h1>Categories:</h1>
      {categories.map((cat) => (
        <Chip
          onDelete={() => {
            handleDelete(cat._id);
          }}
          label={cat.category}
        ></Chip>
      ))}
      <h1>Add new category: {category}</h1>
      <TextField
        onChange={handleInput}
        value={category}
        width="200px"
        id="standard-basic"
        label="Category"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleSave(category)}
      >
        Save
      </Button>
    </div>
  );
}
